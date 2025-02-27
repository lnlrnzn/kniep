@echo off
echo Setting up GitHub connection...

set /p repo_url="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "

"C:\Program Files\Git\bin\git.exe" remote add origin %repo_url%
"C:\Program Files\Git\bin\git.exe" branch -M main
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo Repository pushed to GitHub successfully!
echo.
echo Your project is now available at %repo_url%

pause 