package com.utp.TPCursoIntegrador.market.web.controller;

import com.utp.TPCursoIntegrador.market.domain.dto.UserDTO;
import com.utp.TPCursoIntegrador.market.domain.service.UserService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    // Endpoint para obtener la lista de usuarios en formato JSON
    @GetMapping("/get-users")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> users = userService.getAll();  // Obtener todos los usuarios

        // Excluir contraseñas antes de enviar los datos
        users.forEach(user -> user.setContrasena(null)); // Establece la contraseña a null

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Endpoint para descargar el archivo Excel con la lista de usuarios
    @GetMapping("/download-users")
    public ResponseEntity<byte[]> downloadUsers() throws IOException {
        List<UserDTO> users = userService.getAll();  // Obtener todos los usuarios

        // Eliminar contraseñas antes de crear el Excel
        users.forEach(user -> user.setContrasena(null)); // Establece la contraseña a null

        // Crear un libro Excel (XSSFWorkbook)
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Usuarios");

        // Crear encabezados de la tabla
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("ID Usuario");
        header.createCell(1).setCellValue("Nombre");
        header.createCell(2).setCellValue("Correo");
        header.createCell(3).setCellValue("Rol");

        // Rellenar la tabla con los datos de usuarios
        int rowNum = 1;
        for (UserDTO user : users) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(user.getIdUsuario());
            row.createCell(1).setCellValue(user.getNombre());
            row.createCell(2).setCellValue(user.getCorreo());
            row.createCell(3).setCellValue(user.getRol());
        }

        // Convertir el libro a bytes
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        workbook.write(byteArrayOutputStream);
        workbook.close();

        // Establecer los encabezados de la respuesta para descargar el archivo
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=usuarios.xlsx");

        return new ResponseEntity<>(byteArrayOutputStream.toByteArray(), headers, HttpStatus.OK);
    }
}
