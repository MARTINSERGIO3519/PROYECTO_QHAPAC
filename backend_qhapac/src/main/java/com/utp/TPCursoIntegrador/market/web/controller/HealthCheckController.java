package com.utp.TPCursoIntegrador.market.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/test-connection")
    public ResponseEntity<String> testConnection() {
        return ResponseEntity.ok("✅ Backend Qhapac funcionando correctamente - Conexión exitosa");
    }

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("🚀 Qhapac Backend está ejecutándose correctamente en puerto 8090");
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("🟢 Servicio saludable - Todos los sistemas operativos");
    }
}