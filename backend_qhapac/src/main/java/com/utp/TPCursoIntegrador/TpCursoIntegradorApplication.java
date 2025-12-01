package com.utp.TPCursoIntegrador;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class TpCursoIntegradorApplication {
    public static void main(String[] args) {
        SpringApplication.run(TpCursoIntegradorApplication.class, args);
    }
}

