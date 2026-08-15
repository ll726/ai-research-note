@echo off
rem === AI調査ノートを起動してブラウザで開く ===
chcp 65001 >nul
cd /d "%~dp0"

rem すでにサーバーが起動していればブラウザを開くだけ
netstat -an | findstr "LISTENING" | findstr ":5310" >nul
if %errorlevel%==0 (
  start "" http://localhost:5310
  exit /b
)

rem 4秒後にブラウザを開く(サーバー起動を待つ)
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:5310"

echo サイトを起動しています... この黒い窓を閉じるとサイトも止まります。
npm run dev
