@echo off
echo Pushing to GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main
if errorlevel 1 (
    echo Error pushing to GitHub. Make sure you have set up the remote correctly.
    echo You can run git-commit.bat again to set up the remote.
) else (
    echo Successfully pushed to GitHub!
)
pause 