@echo off
set SRC=src\main\java
set OUT=build
if not exist %OUT% mkdir %OUT%
javac -d %OUT% %SRC%\com\roundtablearts\api\ApiServer.java
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
java -cp %OUT% com.roundtablearts.api.ApiServer