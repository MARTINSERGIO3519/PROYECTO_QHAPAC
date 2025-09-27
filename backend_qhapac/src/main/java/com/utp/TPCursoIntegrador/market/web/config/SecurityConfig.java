package com.utp.TPCursoIntegrador.market.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // desactivar CSRF para pruebas con Postman o navegador
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/users/all").authenticated() // exige login
                        .anyRequest().permitAll() // lo demás es libre
                )
                .httpBasic(Customizer.withDefaults()); // activa Basic Auth

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("admin")
                .password("{noop}123456") // sin encriptar, solo para pruebas
                .roles("admin")
                .build();
        return new InMemoryUserDetailsManager(user);
    }
}

