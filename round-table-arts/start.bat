@echo off
echo Starting Round Table Arts website...
echo.
start "RTA Java API" cmd /k "cd /d %~dp0backend-java && run.bat"
timeout /t 2 /nobreak >nul
start "RTA Python Server" cmd /k "cd /d %~dp0backend-python && pip install -q -r requirements.txt && python app.py"
echo.
echo Java API:   http://localhost:8080
echo Website:    http://localhost:5000
echo.
echo Press any key to close this window (servers keep running).
pause >nul