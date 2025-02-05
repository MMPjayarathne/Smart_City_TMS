@echo off
:: Check for admin rights and restart script as administrator if needed
NET SESSION >nul 2>&1
if %errorlevel% neq 0 (
    echo This script needs to be run as administrator.
    echo Restarting with administrator privileges...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

REM Set the base Kafka directory
set KAFKA_DIR=D:\Programs\kafka

REM Start ZooKeeper
echo Starting ZooKeeper...
cd /d "%KAFKA_DIR%\bin\windows"
start zookeeper-server-start.bat "%KAFKA_DIR%\config\zookeeper.properties"
timeout /t 20

REM Start Kafka
echo Starting Kafka...
cd /d "%KAFKA_DIR%\bin\windows"
start kafka-server-start.bat "%KAFKA_DIR%\config\server.properties"
timeout /t 5

REM Other relevant services (if any)
REM Example for Kafka Manager:
REM echo Starting Kafka Manager...
REM cd /d "C:\path\to\kafka-manager\bin\windows"
REM start kafka-manager.bat
REM timeout /t 5

echo All services started.
pause