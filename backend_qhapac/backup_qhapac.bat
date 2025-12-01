@echo off
set FECHA=%date:~-4%-%date:~3,2%-%date:~0,2%
mysqldump -u root -pTU_PASSWORD qhapacdb > "C:\backups\backup_qhapac_%FECHA%.sql"
