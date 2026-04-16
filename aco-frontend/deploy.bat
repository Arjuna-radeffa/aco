@echo off
REM ACO Platform Deployment Script for Cloudflare Pages
REM This script builds and deploys the frontend to aco.tigo.co.id

setlocal enabledelayedexpansion

echo.
echo ========================================
echo ACO Platform Deployment Script
echo Domain: aco.tigo.co.id
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if in aco-frontend directory
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo Please run this script from the aco-frontend directory
    pause
    exit /b 1
)

echo [1/5] Checking Node.js version...
for /f "tokens=1" %%i in ('node --version') do set NODE_VERSION=%%i
echo Found: %NODE_VERSION%
echo.

echo [2/5] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

echo [3/5] Building production bundle...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo [OK] Production build successful
echo.

echo [4/5] Checking Wrangler CLI...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing Wrangler CLI globally...
    call npm install -g wrangler
)
echo.

echo [5/5] Authenticating with Cloudflare...
echo.
echo If this is your first time:
echo   - Browser will open to authenticate
echo   - Approve the API token access
echo   - You'll be redirected back to terminal
echo.
wrangler login

echo.
echo ========================================
echo Ready to Deploy!
echo ========================================
echo.
echo Choose deployment method:
echo.
echo Option A: Deploy using Wrangler CLI
echo   Command: wrangler pages deploy dist --project-name aco
echo.
echo Option B: Deploy via Cloudflare Dashboard
echo   1. Go to https://dash.cloudflare.com
echo   2. Navigate to Pages
echo   3. Select 'aco' project
echo   4. Upload the 'dist' folder contents
echo.
echo Option C: Git-based CI/CD (Recommended)
echo   1. Push code to GitHub
echo   2. Connect to Cloudflare Pages via GitHub
echo   3. Auto-deploy on push
echo.
pause
