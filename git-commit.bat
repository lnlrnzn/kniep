@echo off
echo Adding all files to git...
"C:\Program Files\Git\bin\git.exe" add .

echo Creating commit...
set /p commit_msg="Enter commit message: "
"C:\Program Files\Git\bin\git.exe" commit -m "%commit_msg%"

echo Checking git remote status...
"C:\Program Files\Git\bin\git.exe" remote -v
if errorlevel 1 (
    echo No remote found, let's set one up...
    set /p repo_url="Enter your GitHub repository URL: "
    "C:\Program Files\Git\bin\git.exe" remote add origin %repo_url%
    "C:\Program Files\Git\bin\git.exe" branch -M main
)

echo Your changes have been committed. Run git-push.bat to push them to GitHub.
pause 