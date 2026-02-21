@echo off
echo ==========================================
echo   Narayan e-Gurukul Backend Auto-Setup
echo ==========================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Please install it from https://nodejs.org/
    pause
    exit /b
)

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Checking MongoDB...
echo Attempting to start MongoDB service (requires Admin)...
net start MongoDB 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] Could not start MongoDB service. 
    echo Please make sure MongoDB is installed and running on port 27017.
)

echo.
echo [3/3] Starting Server...
echo The backend will be available at http://localhost:5000
echo.
npm start

pause
