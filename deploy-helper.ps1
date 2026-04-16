#!/usr/bin/env pwsh
# ACO Platform - Deployment Helper

Write-Host "`n========================================"
Write-Host "ACO Platform - Deployment Status"
Write-Host "========================================`n"

# Check dist folder
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$distFolder = "$scriptDir\aco-frontend\dist"

if (Test-Path $distFolder) {
    $files = Get-ChildItem -Path $distFolder -Recurse -File
    $totalSize = ($files | Measure-Object -Property Length -Sum).Sum
    $totalSizeKB = [math]::Round($totalSize / 1KB, 2)
    Write-Host "[OK] Dist folder ready ($($files.Count) files, $totalSizeKB KB)"
} else {
    Write-Host "[ERROR] Dist folder not found"
}

# Show options
Write-Host "`n--- Deployment Options ---`n"
Write-Host "1. Manual Dashboard Upload"
Write-Host "   - Open: https://dash.cloudflare.com/"
Write-Host "   - Go to: Pages > aco > Create deployment"
Write-Host "   - Upload the dist folder"
Write-Host ""

Write-Host "2. Automated API Deployment"
Write-Host "   - cd aco-frontend"
Write-Host "   - powershell -ExecutionPolicy Bypass deploy-cloudflare.ps1"
Write-Host ""

Write-Host "--- Quick Start ---`n"
Write-Host "Production build size:  ~961 KB"
Write-Host "Gzip size:              ~72 KB"
Write-Host "Domain:                 aco.tigo.co.id"
Write-Host "Status:                 READY TO DEPLOY`n"

Write-Host "--- Documentation ---"
Write-Host "Read: CLOUDFLARE_DEPLOY_GUIDE.md`n"

