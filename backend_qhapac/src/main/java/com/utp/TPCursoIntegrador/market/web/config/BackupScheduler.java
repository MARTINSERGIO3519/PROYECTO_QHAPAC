package com.utp.TPCursoIntegrador.market.web.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class BackupScheduler {

    private static final String BACKUP_PATH = "C:\\Users\\Sergio\\Downloads\\backups\\";

    private static final String USER = "root";
    private static final String PASSWORD = "root";
    private static final String DATABASE = "QhapacDatabase";

    @Scheduled(cron = "0 30 14 * * *")
    public void generarBackup() {
        try {
            // Fecha para el nombre del archivo
            String fecha = new SimpleDateFormat("yyyy-MM-dd_HH-mm").format(new Date());
            String filePath = BACKUP_PATH + "backup_" + fecha + ".sql";

            // Comando mysqldump
            String comando = String.format(
                    "mysqldump -u%s -p%s %s -r \"%s\"",
                    USER, PASSWORD, DATABASE, filePath
            );

            // Ejecutar comando
            Process proceso = Runtime.getRuntime().exec(comando);
            int resultado = proceso.waitFor();

            if (resultado == 0) {
                System.out.println("Backup generado correctamente: " + filePath);
            } else {
                System.err.println("Error al generar el backup.");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
