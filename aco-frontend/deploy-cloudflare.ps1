#!/usr/bin/env pwsh

# ACO Platform - Cloudflare Pages Direct API Deployment Script
# Requires: CLOUDFLARE_API_TOKEN with proper permissions

param(
    [string]$ApiToken = $env:CLOUDFLARE_API_TOKEN,
    [string]$AccountId = "fa152694bcc0c864187cd5f524db2941",
    [string]$ProjectName = "aco",
    [string]$DistFolder = "dist",
    [string]$Branch = "main"
)

# Colors
$Green = "`e[32m"
$Red = "`e[31m"
$Yellow = "`e[33m"
$Reset = "`e[0m"

function Write-Success { Write-Host "$Green✓ $args$Reset" }
function Write-Error { Write-Host "$Red✗ $args$Reset" }
function Write-Warning { Write-Host "$Yellow⚠ $args$Reset" }

Write-Host "`n🚀 ACO Platform - Cloudflare Pages Deployment`n"
Write-Host "========================================`n"

# Validate token
if (-not $ApiToken) {
    Write-Error "CLOUDFLARE_API_TOKEN not set"
    Write-Host "`nSet dengan:"
    Write-Host '  $env:CLOUDFLARE_API_TOKEN="your-token-here"'
    exit 1
}

Write-Host "Configuration:"
Write-Host "  Project: $ProjectName"
Write-Host "  Account: $AccountId"
Write-Host "  Branch: $Branch"
Write-Host "  Dist Folder: $DistFolder`n"

# Verify dist folder
if (-not (Test-Path $DistFolder)) {
    Write-Error "Dist folder not found: $DistFolder"
    exit 1
}

Write-Success "Dist folder found"

# Get files to upload
$files = Get-ChildItem -Path $DistFolder -Recurse -File
Write-Success "Found $($files.Count) files to upload"

# Display files
Write-Host "`nFiles:`n"
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Item $DistFolder).FullName.Length + 1)
    $sizeKB = [math]::Round($file.Length / 1KB, 2)
    Write-Host "  - $relativePath ($sizeKB KB)"
}

$totalSize = ($files | Measure-Object -Property Length -Sum).Sum
$totalSizeKB = [math]::Round($totalSize / 1KB, 2)
Write-Host "`nTotal size: $totalSizeKB KB`n"

# Create multipart form data
Write-Host "Preparing upload payload..."
$boundary = [System.Guid]::NewGuid().ToString()
$body = [System.IO.MemoryStream]::new()
$writer = [System.IO.StreamWriter]::new($body)

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Item $DistFolder).FullName.Length + 1).Replace('\', '/')
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

Write-Success "Payload prepared ($(($body.Length / 1MB).ToString('F2')) MB)"

# Upload to Cloudflare
Write-Host "`nUploading to Cloudflare Pages..."
Write-Host "API Endpoint: /accounts/$AccountId/pages/projects/$ProjectName/deployments`n"

$headers = @{
    "Authorization" = "Bearer $ApiToken"
    "Content-Type" = "multipart/form-data; boundary=$boundary"
}

$uri = "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$ProjectName/deployments"

try {
    $response = Invoke-WebRequest `
        -Uri $uri `
        -Method Post `
        -Headers $headers `
        -Body $body `
        -ErrorAction Stop

    $result = $response.Content | ConvertFrom-Json
    
    if ($result.success) {
        Write-Success "Deployment created!"
        Write-Host "`nDeployment Details:"
        Write-Host "  ID: $($result.result.id)"
        Write-Host "  Status: $($result.result.status)"
        Write-Host "  URL: https://$($result.result.url)"
        Write-Host "  Created: $($result.result.created_on)"
        
        Write-Host "`n$Green========================================`n"
        Write-Host "🎉 Deployment successful!`n"
        Write-Host "Project: aco"
        Write-Host "URL: https://aco.tigo.co.id"
        Write-Host "Status: $($result.result.status)`n"
        Write-Host "========================================$Reset`n"
        
        exit 0
    }
    else {
        Write-Error "API Error: $($result.errors[0].message)"
        Write-Host "`nResponse: $($result | ConvertTo-Json -Depth 5)"
        exit 1
    }
}
catch {
    Write-Error "Upload failed: $($_.Exception.Message)"
    
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        Write-Host "`nResponse body:`n$body"
    }
    
    exit 1
}
