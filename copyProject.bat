@echo off
echo Copying project files to C:\Projects\kniepwebsite
mkdir C:\Projects\kniepwebsite 2>nul
xcopy /E /I /Y /EXCLUDE:excludes.txt . C:\Projects\kniepwebsite
echo Copy complete 