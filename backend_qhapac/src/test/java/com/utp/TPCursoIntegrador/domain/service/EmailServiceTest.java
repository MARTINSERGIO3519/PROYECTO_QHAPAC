package com.utp.TPCursoIntegrador.domain.service;

import com.utp.TPCursoIntegrador.market.domain.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;  // Mock del JavaMailSender

    @InjectMocks
    private EmailService emailService;  // Inyectamos el mock en el servicio

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);  // Inicializa los mocks
    }

    @Test
    public void testEnviarCorreo() throws Exception {
        // Datos de prueba
        String destinatario = "test@dominio.com";
        String asunto = "Asunto de prueba";
        String cuerpo = "Cuerpo del correo de prueba";

        // Llamamos al método que queremos probar
        emailService.enviarCorreo(destinatario, asunto, cuerpo);

        // Verificamos que el método send() fue llamado correctamente
        verify(mailSender, times(1)).send(any(SimpleMailMessage.class));

        // Verificamos que el correo tiene la información correcta
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(destinatario);
        message.setSubject(asunto);
        message.setText(cuerpo);

        // Verificamos que el mensaje enviado tiene los valores correctos
        assertEquals(destinatario, message.getTo()[0]);
        assertEquals(asunto, message.getSubject());
        assertEquals(cuerpo, message.getText());
    }

    @Test
    public void testEnviarCorreoExcepcion() {
        // Simulamos una excepción cuando intentemos enviar el correo
        doThrow(new RuntimeException("Error al enviar correo")).when(mailSender).send(any(SimpleMailMessage.class));

        // Verificamos que se lance la excepción al intentar enviar el correo
        Exception exception = assertThrows(RuntimeException.class, () -> {
            emailService.enviarCorreo("test@dominio.com", "Asunto", "Cuerpo del correo");
        });

        // Verificamos el mensaje de la excepción
        assertEquals("Error al enviar correo", exception.getMessage());
    }
}