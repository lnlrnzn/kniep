@echo off
"C:\Program Files\Git\bin\git.exe" init
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit"
echo.
echo Git repository initialized successfully!
echo.
echo Now, create a repository on GitHub and run:
echo git remote add origin https://github.com/yourusername/your-repo.git
echo git push -u origin main
pause 