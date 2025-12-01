package com.utp.TPCursoIntegrador.market.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // Endpoints públicos - TODOS LOS ENDPOINTS DE AUTENTICACIÓN Y USUARIOS
                        .requestMatchers(
                                "/api/auth/**",           // ✅ TODOS LOS ENDPOINTS DE AUTH
                                "/api/usuarios/registro", // ✅ REGISTRO DE USUARIOS
                                "/api/usuarios/health",   // ✅ HEALTH CHECK
                                "/password/**",           // ✅ RECUPERACIÓN CONTRASEÑA
                                "/test-connection/**",    // ✅ TEST CONNECTION
                                "/",                      // ✅ HOME
                                "/health",                // ✅ HEALTH
                                "/actuator/**"            // ✅ SPRING ACTUATOR
                        ).permitAll()
                        // Endpoints de admin requieren rol ADMIN
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        // Endpoints que requieren autenticación (agregar explícitamente)
                        .requestMatchers(
                                "/api/usuarios/**",       // ✅ ENDPOINTS DE USUARIOS AUTENTICADOS
                                "/logros",                // ✅ ENDPOINT DE LOGROS
                                "/logros/**"              // ✅ TODOS LOS ENDPOINTS DE LOGROS
                        ).authenticated()
                        // Todos los demás endpoints requieren autenticación
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://127.0.0.1:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "X-Requested-With",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));
        configuration.setExposedHeaders(Arrays.asList(
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"
        ));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}