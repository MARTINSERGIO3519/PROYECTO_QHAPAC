package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/logros")
@CrossOrigin(origins = "http://localhost:3000")
public class LogroController {

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<Logro>> obtenerLogros(HttpServletRequest request) {
        // Obtener el token del header
        final String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);

            // Extraer información del usuario del token
            String userEmail = jwtService.extractUsername(jwt);
            Integer userId = jwtService.extractUserId(jwt);

            System.out.println("🔍 Obteniendo logros para usuario: " + userEmail + " (ID: " + userId + ")");
        }

        // Datos de ejemplo - en una aplicación real, esto vendría de la base de datos
        List<Logro> logros = Arrays.asList(
                new Logro(1, "Tú", "🏆 Primer Quiz", "Completaste tu primer quiz exitosamente", "2024-01-15"),
                new Logro(2, "Tú", "⭐ Nivel 5 Alcanzado", "Llegaste al nivel 5 en el periodo 1", "2024-01-20"),
                new Logro(3, "Tú", "📚 Estudiante Dedicado", "Completaste 10 quizzes en una semana", "2024-01-25"),
                new Logro(4, "Tú", "🎯 Precisión 90%", "Alcanzaste 90% de precisión en tus respuestas", "2024-02-01"),
                new Logro(5, "Tú", "🚀 Rápido y Eficiente", "Completaste un quiz en menos de 5 minutos", "2024-02-05")
        );

        return ResponseEntity.ok(logros);
    }

    // Clase interna para representar un logro
    public static class Logro {
        private int id;
        private String nombreUsuario;
        private String nombreLogro;
        private String descripcion;
        private String fechaObtenida;

        public Logro() {}

        public Logro(int id, String nombreUsuario, String nombreLogro, String descripcion, String fechaObtenida) {
            this.id = id;
            this.nombreUsuario = nombreUsuario;
            this.nombreLogro = nombreLogro;
            this.descripcion = descripcion;
            this.fechaObtenida = fechaObtenida;
        }

        // Getters y Setters
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }

        public String getNombreUsuario() { return nombreUsuario; }
        public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

        public String getNombreLogro() { return nombreLogro; }
        public void setNombreLogro(String nombreLogro) { this.nombreLogro = nombreLogro; }

        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

        public String getFechaObtenida() { return fechaObtenida; }
        public void setFechaObtenida(String fechaObtenida) { this.fechaObtenida = fechaObtenida; }
    }
}