@echo off
echo Setting up Git configuration...

set /p email="Enter your email for Git: "
set /p username="Enter your name for Git: "

"C:\Program Files\Git\bin\git.exe" config --global user.email "%email%"
"C:\Program Files\Git\bin\git.exe" config --global user.name "%username%"

echo.
echo Git configuration completed!
echo.
echo Now running initial commit...
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit"

echo.
echo Repository initialized successfully!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub without README, .gitignore, or license
echo 2. Run the following commands to push your project to GitHub:
echo.
echo set /p repo_url="Enter your GitHub repository URL: "
echo "C:\Program Files\Git\bin\git.exe" remote add origin %%repo_url%%
echo "C:\Program Files\Git\bin\git.exe" branch -M main
echo "C:\Program Files\Git\bin\git.exe" push -u origin main
echo.
echo Or run git-push.bat after creating your GitHub repository

pause 