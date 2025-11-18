@echo off
REM MCP API Gateway - NPM Publishing Script
REM This script publishes mcp-gateway-universal to npm registry

echo ============================================
echo   MCP API Gateway - NPM Publishing
echo ============================================
echo.

REM Navigate to project directory
cd /d "C:\Users\claus\Projects\mcp-api-gateway-template"
if errorlevel 1 (
    echo ERROR: Could not navigate to project directory
    pause
    exit /b 1
)

echo Step 1: Clearing old npm credentials...
if exist "%USERPROFILE%\.npmrc" (
    del "%USERPROFILE%\.npmrc"
    echo Cleared ~/.npmrc
)
echo.

echo Step 2: Building package...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo Build successful!
echo.

echo Step 3: Logging into npm...
echo.
echo When prompted, enter:
echo   Username: clauskraft
echo   Password: vf56Zp^&^=TD9uzK^@
echo   Email: claus@clauskraft.dk
echo   One-time password: 29132658
echo.
echo (Note: The password contains special characters - copy carefully)
echo.
pause

call npm login
if errorlevel 1 (
    echo ERROR: npm login failed
    pause
    exit /b 1
)
echo.
echo Login successful!
echo.

echo Step 4: Publishing to npm...
call npm publish --access public
if errorlevel 1 (
    echo ERROR: npm publish failed
    pause
    exit /b 1
)
echo.
echo Publish successful!
echo.

echo Step 5: Verifying package...
call npm info mcp-gateway-universal
echo.

echo ============================================
echo   SUCCESS! Package published to npm
echo ============================================
echo.
echo Package: mcp-gateway-universal
echo Version: 1.0.0
echo URL: https://www.npmjs.com/package/mcp-gateway-universal
echo.
echo Installation commands:
echo   npm install mcp-gateway-universal
echo   npx mcp-gateway-universal
echo.
echo GitHub: https://github.com/Clauskraft/mcp-api-gateway-template
echo.
pause
