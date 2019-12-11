@echo off
echo.

start "" C:\wamp64\wampmanager.exe   
echo "Starting WAMP, please wait for 10 seconds."
Timeout /t 10 /nobreak
echo "WAMP is now running."
echo.
echo.
Timeout /t 1 /nobreak >nul
echo.
echo.
echo "Starting the server."

call "open.bat"

nodemon btc.js

