#!/usr/bin/env pwsh

# Load credentials dari .env
$envFile = "$PSScriptRoot\..\\.env"
$token = (Get-Content $envFile | Select-String "CLOUDFLARE_API_TOKEN=").ToString().Split('=')[1].Trim()
$accId = (Get-Content $envFile | Select-String "CLOUDFLARE_ACCOUNT_ID=").ToString().Split('=')[1].Trim()
$projectName = "aco"
$distFolder = "$PSScriptRoot\dist"

Write-Host "`n========================================`n" -ForegroundColor Cyan
Write-Host "Cloudflare Pages Deployment (Direct API)`n" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if (-not (Test-Path $distFolder)) {
    Write-Host "[ERROR] Dist folder not found" -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $distFolder -Recurse -File
Write-Host "[INFO] Found $($files.Count) files`n"

# Build manifest with file hashes
Write-Host "[INFO] Computing file hashes...`n"
$manifest = @{}

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Item $distFolder).FullName.Length + 1).Replace('\', '/')
    
    # Compute SHA256
    $sha256 = [System.Security.Cryptography.SHA256]::Create()
    $fileContent = [System.IO.File]::ReadAllBytes($file.FullName)
    $hash = -join ($sha256.ComputeHash($fileContent) | ForEach-Object { "{0:x2}" -f $_ })
    
    $manifest[$relativePath] = $hash
    Write-Host "  $relativePath"
}

# Create form body with LF line endings (critical for Cloudflare)
Write-Host "`n[INFO] Creating form data...`n"

$boundary = "----WebKitFormBoundary$(Get-Random)"
$body = New-Object System.IO.MemoryStream
$writer = New-Object System.IO.StreamWriter($body, [System.Text.Encoding]::UTF8)

# Write manifest field
$writer.Write("--$boundary`n")
$writer.Write("Content-Disposition: form-data; name=`"metadata`"`n`n")
$manifestJson = ConvertTo-Json @{"branch" = "main"} -Compress
$writer.Write($manifestJson)
$writer.Write("`n")
$writer.Flush()

# Write manifest
$writer.Write("--$boundary`n")
$writer.Write("Content-Disposition: form-data; name=`"manifest`"`n`n")
$writer.Write((ConvertTo-Json $manifest -Compress))
$writer.Write("`n")
$writer.Flush()

# Write files
$filesToUpload = @()
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Item $distFolder).FullName.Length + 1).Replace('\', '/')
    $fileContent = [System.IO.File]::ReadAllBytes($file.FullName)
    
    $writer.Write("--$boundary`n")
    $writer.Write("Content-Disposition: form-data; name=`"files`"; filename=`"$relativePath`"`n")
    $writer.Write("Content-Type: application/octet-stream`n`n")
    $writer.Flush()
    
    $body.Write($fileContent, 0, $fileContent.Length)
    
    $writer.Write("`n")
    $writer.Flush()
}

# Final boundary
$writer.Write("--$boundary--`n")
$writer.Flush()

$body.Seek(0, [System.IO.SeekOrigin]::Begin)
$bodyBytes = $body.ToArray()

Write-Host "[INFO] Uploading..."
Write-Host "[INFO] Account: $accId"
Write-Host "[INFO] Project: $projectName`n"

$headers = @{
    "Authorization" = "Bearer $token"
}

$uri = "https://api.cloudflare.com/client/v4/accounts/$accId/pages/projects/$projectName/deployments"

try {
    # Use Invoke-RestMethod with form data
    $response = Invoke-RestMethod -Uri $uri `
        -Method Post `
        -Headers $headers `
        -ContentType "multipart/form-data; boundary=$($boundary.Substring(2))" `
        -Body $bodyBytes `
        -ErrorAction Stop
    
    if ($response.success) {
        Write-Host "[SUCCESS] Deployment created!`n" -ForegroundColor Green
        
        $dep = $response.result
        Write-Host "Details:" -ForegroundColor Green
        Write-Host "  ID: $($dep.id)"
        Write-Host "  Status: $($dep.status)"
        Write-Host "  URL: $($dep.url)"
        Write-Host "  Environment: $($dep.environment)`n"
        
        # Save info
        $response.result | ConvertTo-Json | Out-File "deployment-info.json"
        
        Write-Host "========================================`n" -ForegroundColor Green
        Write-Host "DEPLOYMENT SUCCESSFUL!`n" -ForegroundColor Green
        Write-Host "Site URL: https://$($dep.url)`n" -ForegroundColor Green
        Write-Host "========================================`n" -ForegroundColor Green
        
        exit 0
    } else {
        Write-Host "[ERROR] API Error`n" -ForegroundColor Red
        Write-Host "Message: $($response.errors[0].message)`n"
        exit 1
    }
}
catch {
    Write-Host "[ERROR] $($_.Exception.Message)`n" -ForegroundColor Red
    
    # Try to parse error response
    if ($_.ErrorDetails) {
        Write-Host "Details: $($_.ErrorDetails)`n" -ForegroundColor Red
    }
    
    exit 1
}
