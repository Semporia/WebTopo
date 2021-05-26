@echo off
set /p w=请输入文件格式(即扩展名并以回车结束):
set /p str1=请输入要修改的文字(以回车结束):
set /p str2=请输入要改成的文字(若是删除则直接回车，以回车结束):
for /f "delims=" %%i in ('dir /b /a-d "*.%w%"' ) do (
set str3=%%i
setlocal EnableDelayedExpansion
set "str3=!str3:%str1%=%str2%!"
ren "%%i" "!str3!"
endlocal
)
pause