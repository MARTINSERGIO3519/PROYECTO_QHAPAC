/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.TPCursoIntegrador.market.web.controller;

import javax.sql.DataSource;
import java.sql.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author danie
 */
@RestController
public class TestConnectionController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/test-db")
    public String testConnection() {
        try (Connection connection = dataSource.getConnection()) {
            // Muestra el nombre de la base de datos actual
            return "Conexión exitosa a la base de datos: " + connection.getCatalog();
        } catch (Exception e) {
            return "Error en la conexión: " + e.getMessage();
        }
    }
}
