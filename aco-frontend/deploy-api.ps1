#!/usr/bin/env pwsh

# Load credentials dari .env
$token = Get-Content "$PSScriptRoot\..\\.env" | Select-String "CLOUDFLARE_API_TOKEN=" | ForEach-Object { $_.ToString().Split('=')[1].Trim() }
$accId = Get-Content "$PSScriptRoot\..\\.env" | Select-String "CLOUDFLARE_ACCOUNT_ID=" | ForEach-Object { $_.ToString().Split('=')[1].Trim() }
$projectName = "aco"
$distFolder = "$PSScriptRoot\dist"
$branch = "main"

Write-Host "`n========================================`n" -ForegroundColor Cyan
Write-Host "Cloudflare Pages Deployment Script`n" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Verify folder
if (-not (Test-Path $distFolder)) {
    Write-Host "[ERROR] Dist folder not found: $distFolder" -ForegroundColor Red
    exit 1
}

# Get files
$files = Get-ChildItem -Path $distFolder -Recurse -File
Write-Host "[INFO] Found $($files.Count) files to upload:`n"

$totalSize = 0
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Item $distFolder).FullName.Length + 1).Replace('\', '/')
    $sizeKB = [math]::Round($file.Length / 1KB, 2)
    Write-Host "  - $relativePath ($sizeKB KB)"
    $totalSize += $file.Length
}

$totalSizeKB = [math]::Round($totalSize / 1KB, 2)
Write-Host "`n[INFO] Total size: $totalSizeKB KB`n"

# Prepare multipart form data
Write-Host "[INFO] Preparing upload...`n"

$boundary = [System.Guid]::NewGuid().ToString()
$body = [System.IO.MemoryStream]::new()
$writer = [System.IO.StreamWriter]::new($body, [System.Text.Encoding]::UTF8)

# Create manifest
$manifest = @{}
$fileMetadata = @()

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Item $distFolder).FullName.Length + 1).Replace('\', '/')
    $fileContent = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Calculate SHA256 hash
    $sha256 = [System.Security.Cryptography.SHA256]::Create()
    $hashBytes = $sha256.ComputeHash($fileContent)
    $hashHex = -join ($hashBytes | ForEach-Object { "{0:x2}" -f $_ })
    
    # Add to manifest
    $manifest[$relativePath] = @{
        "file" = $relativePath
        "hash" = $hashHex
    }
    
    $fileMetadata += @{
        "path" = $relativePath
        "hash" = $hashHex
        "size" = $file.Length
    }
}

# Write manifest as form field
$writer.Write("--$boundary`r`n")
$writer.Write("Content-Disposition: form-data; name=`"manifest`"`r`n`r`n")
$manifestJson = $manifest | ConvertTo-Json -Compress
$writer.Write($manifestJson)
$writer.Write("`r`n")
$writer.Flush()

# Write files
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Item $distFolder).FullName.Length + 1).Replace('\', '/')
    $fileContent = [System.IO.File]::ReadAllBytes($file.FullName)
    
    # Write form boundary
    $writer.Write("--$boundary`r`n")
    $writer.Write("Content-Disposition: form-data; name=`"files`"; filename=`"$relativePath`"`r`n")
    $writer.Write("Content-Type: application/octet-stream`r`n`r`n")
    $writer.Flush()
    
    # Write file content
    $body.Write($fileContent, 0, $fileContent.Length)
    $writer.Write("`r`n")
    $writer.Flush()
}

# Write final boundary
$writer.Write("--$boundary--`r`n")
$writer.Flush()
$body.Seek(0, [System.IO.SeekOrigin]::Begin)

Write-Host "[INFO] Uploading to Cloudflare Pages API..."
Write-Host "[INFO] Account: $accId"
Write-Host "[INFO] Project: $projectName"
Write-Host "[INFO] Branch: $branch`n"

# Upload to Cloudflare
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "multipart/form-data; boundary=$boundary"
}

$uri = "https://api.cloudflare.com/client/v4/accounts/$accId/pages/projects/$projectName/deployments"

try {
    $response = Invoke-WebRequest `
        -Uri $uri `
        -Method Post `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing `
        -ErrorAction Stop

    $result = $response.Content | ConvertFrom-Json
    
    if ($result.success) {
        Write-Host "[SUCCESS] Deployment created!`n" -ForegroundColor Green
        
        $deployment = $result.result
        Write-Host "Deployment Details:" -ForegroundColor Green
        Write-Host "  ID: $($deployment.id)"
        Write-Host "  Status: $($deployment.status)"
        Write-Host "  URL: https://$($deployment.url)"
        Write-Host "  Branch: $($deployment.environment)"
        Write-Host "  Created: $($deployment.created_on)"
        Write-Host "  Source: $($deployment.source)`n"
        
        # Save deployment info
        $deployment | ConvertTo-Json -Depth 10 | Out-File -FilePath "deployment-info.json" -Encoding UTF8
        Write-Host "[INFO] Deployment info saved to: deployment-info.json`n"
        
        Write-Host "========================================`n" -ForegroundColor Green
        Write-Host "Site URL: https://$($deployment.url)`n" -ForegroundColor Green
        Write-Host "Status: $($deployment.status)`n" -ForegroundColor Green
        Write-Host "========================================`n" -ForegroundColor Green
        
        exit 0
    }
    else {
        Write-Host "[ERROR] API Error:`n" -ForegroundColor Red
        Write-Host "  Message: $($result.errors[0].message)"
        Write-Host "  Code: $($result.errors[0].code)`n"
        
        $result | ConvertTo-Json -Depth 10 | Out-Host
        exit 1
    }
}
catch {
    Write-Host "[ERROR] Upload failed:`n" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)`n"
    
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response body:`n$errorBody`n"
    }
    
    exit 1
}
