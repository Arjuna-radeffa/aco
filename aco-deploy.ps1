#!/usr/bin/env pwsh

# ACO Platform - Deployment Helper Script
# Membantu memilih dan menjalankan deployment ke Cloudflare

param(
    [ValidateSet("status", "deploy-dashboard", "deploy-api", "check")]
    [string]$Action = "status"
)

$Green = "`e[32m"
$Red = "`e[31m"
$Yellow = "`e[33m"
$Blue = "`e[36m"
$Reset = "`e[0m"

function Write-Success { Write-Host "$Green✓ $args$Reset" }
function Write-Error { Write-Host "$Red✗ $args$Reset" }
function Write-Warning { Write-Host "$Yellow⚠ $args$Reset" }
function Write-Info { Write-Host "$Blue ℹ $args$Reset" }

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir
$distFolder = Join-Path $scriptDir "dist"
$envFile = Join-Path $rootDir ".env"

function Show-Status {
    Write-Host "`n$Blue========================================`n"
    Write-Host "  ACO Platform - Deployment Status`n"
    Write-Host "========================================$Reset`n"
    
    # Check dist folder
    if (Test-Path $distFolder) {
        $files = Get-ChildItem -Path $distFolder -Recurse -File
        $totalSize = ($files | Measure-Object -Property Length -Sum).Sum
        $totalSizeKB = [math]::Round($totalSize / 1KB, 2)
        Write-Success "Dist folder ready ($($files.Count) files, $totalSizeKB KB)"
    }
    else {
        Write-Error "Dist folder not found - run: npm run build"
    }
    
    # Check .env
    if (Test-Path $envFile) {
        Write-Success ".env file found"
        $token = (Get-Content $envFile | Select-String "CLOUDFLARE_API_TOKEN" | ForEach-Object { $_.ToString().Split('=')[1] }).Trim()
        if ($token) {
            $tokenTrunc = $token.Substring(0, 10) + "..." + $token.Substring($token.Length - 5)
            Write-Info "API Token: $tokenTrunc"
        }
    }
    else {
        Write-Warning ".env file not found - create with credentials"
    }
    
    # Show deployment options
    Write-Host "`n$Blue--- Deployment Options ---$Reset`n"
    Write-Host "1. Manual Dashboard Upload"
    Write-Host "   ./aco-deploy.ps1 deploy-dashboard`n"
    
    Write-Host "2. API Token Deployment (Automated)"
    Write-Host "   ./aco-deploy.ps1 deploy-api`n"
    
    Write-Host "3. Check API Token Permissions"
    Write-Host "   ./aco-deploy.ps1 api-token-check`n"
    
    Write-Host "$Blue========================================$Reset`n"
}

function Show-Dashboard-Instructions {
    Write-Host "`n$Green🔧 Manual Dashboard Deployment$Reset`n"
    Write-Host "Follow these steps to deploy via Cloudflare Dashboard:`n"
    
    Write-Host "1. Go to: https://dash.cloudflare.com/"
    Write-Host "2. Login with your Cloudflare account"
    Write-Host "3. Click 'Pages' in sidebar"
    Write-Host "4. Click on 'aco' project (or create new)"
    Write-Host "5. Click 'Create a new deployment'"
    Write-Host "6. Select 'Upload assets'"
    Write-Host "7. Drag and drop: $distFolder"
    Write-Host "   OR select these files from dist folder:"
    Write-Host "      - index.html"
    Write-Host "      - assets/ (all files)"
    Write-Host "8. Wait for deployment to complete"
    Write-Host "9. Go to Custom domain section"
    Write-Host "10. Add: aco.tigo.co.id`n"
    
    Write-Host "$Green✓ Site will be live at: https://aco.tigo.co.id$Reset`n"
}

function Deploy-Via-API {
    Write-Host "`n$Green🚀 API Token Deployment$Reset`n"
    
    # Load API token
    if (-not (Test-Path $envFile)) {
        Write-Error ".env file not found"
        exit 1
    }
    
    $env:CLOUDFLARE_API_TOKEN = (Get-Content $envFile | Select-String "CLOUDFLARE_API_TOKEN=").ToString().Split('=')[1].Trim()
    $env:CLOUDFLARE_ACCOUNT_ID = (Get-Content $envFile | Select-String "CLOUDFLARE_ACCOUNT_ID=").ToString().Split('=')[1].Trim()
    
    if (-not $env:CLOUDFLARE_API_TOKEN) {
        Write-Error "CLOUDFLARE_API_TOKEN not found in .env"
        exit 1
    }
    
    Write-Info "Using API for deployment..."
    
    $psFile = Join-Path $scriptDir "deploy-cloudflare.ps1"
    if (Test-Path $psFile) {
        & $psFile
    }
    else {
        Write-Error "Deploy script not found: $psFile"
        exit 1
    }
}

function Check-API-Token {
    Write-Host "`n$Green🔐 API Token Permission Check$Reset`n"
    
    if (-not (Test-Path $envFile)) {
        Write-Error ".env file not found"
        exit 1
    }
    
    $token = (Get-Content $envFile | Select-String "CLOUDFLARE_API_TOKEN=").ToString().Split('=')[1].Trim()
    $accountId = (Get-Content $envFile | Select-String "CLOUDFLARE_ACCOUNT_ID=").ToString().Split('=')[1].Trim()
    
    if (-not $token -or -not $accountId) {
        Write-Error "API credentials not found in .env"
        exit 1
    }
    
    Write-Info "Checking token permissions..."
    
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    try {
        $response = Invoke-WebRequest `
            -Uri "https://api.cloudflare.com/client/v4/user/tokens/verify" `
            -Method Get `
            -Headers $headers `
            -ErrorAction Stop
        
        $result = $response.Content | ConvertFrom-Json
        
        if ($result.success) {
            Write-Success "Token is valid!`n"
            Write-Host "Token Details:"
            Write-Host "  Status: $($result.result.status)"
            Write-Host "  Name: $($result.result.name)"
            Write-Host "  Issued On: $($result.result.issued_on)"
            Write-Host "  Expires On: $($result.result.expires_on)"
            
            if ($result.result.policies) {
                Write-Host "`nPermissions:"
                foreach ($policy in $result.result.policies) {
                    Write-Host "  - $($policy.effect): $($policy.permission_groups | ForEach-Object { $_.name } | Join-String -Separator ', ')"
                }
            }
        }
        else {
            Write-Error "Invalid token"
            exit 1
        }
    }
    catch {
        Write-Error "Failed to verify token: $($_.Exception.Message)"
        exit 1
    }
}

# Execute action
switch ($Action) {
    "status" {
        Show-Status
    }
    "deploy-dashboard" {
        Show-Dashboard-Instructions
    }
    "deploy-api" {
        Deploy-Via-API
    }
    "check" {
        Check-API-Token
    }
    default {
        Show-Status
    }
}
