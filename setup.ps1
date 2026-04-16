# PowerShell script to setup ACO project
Write-Host "Setting up ACO Project..." -ForegroundColor Green

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location -Path "aco-backend"
npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt bcryptjs class-validator class-transformer @nestjs/config @nestjs/typeorm typeorm sqlite3

# Install frontend dependencies  
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path "..\aco-frontend"
npm install

Write-Host "Setup completed!" -ForegroundColor Green
Write-Host "Backend: cd aco-backend & npm run start:dev" -ForegroundColor Cyan
Write-Host "Frontend: cd aco-frontend & npm run dev" -ForegroundColor Cyan
Write-Host "Seed DB: cd aco-backend & npm run seed" -ForegroundColor Cyan