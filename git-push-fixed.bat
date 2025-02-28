@echo off
echo Setting up GitHub connection...

set GIT_PATH="C:\Program Files\Git\bin\git.exe"

echo Checking if remote origin exists...
%GIT_PATH% remote -v > nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Removing existing remote origin...
    %GIT_PATH% remote remove origin
)

set /p repo_url="Enter your GitHub repository URL (e.g., https://github.com/lnlrnzn/kniep.git): "

echo Adding remote origin...
%GIT_PATH% remote add origin %repo_url%

echo Renaming branch to main...
%GIT_PATH% branch -M main

echo Pushing to GitHub...
%GIT_PATH% push -u origin main

echo.
echo Repository pushed to GitHub successfully!
echo.
echo Your project is now available at %repo_url%

pause 