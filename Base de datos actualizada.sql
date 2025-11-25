-- ============================================
-- Creación de base de datos
-- ============================================
CREATE DATABASE IF NOT EXISTS QhapacDatabase 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;

USE QhapacDatabase;

-- ============================================
-- Tabla Permiso
-- ============================================
CREATE TABLE Permiso (
	id_Permiso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_Permiso VARCHAR(50) NOT NULL
);

-- ============================================
-- Tabla Rol
-- ============================================
CREATE TABLE Rol (
	id_Rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_Rol VARCHAR(40) NOT NULL
);

-- ============================================
-- Tabla Rol_Permiso
-- ============================================
CREATE TABLE Rol_Permiso (
	id_Rol INT NOT NULL,
	id_Permiso INT NOT NULL,
	PRIMARY KEY (id_Rol, id_Permiso),
	CONSTRAINT FK_Rol_RolPermiso FOREIGN KEY (id_Rol) REFERENCES Rol(id_Rol),
	CONSTRAINT FK_Permiso_RolPermiso FOREIGN KEY (id_Permiso) REFERENCES Permiso(id_Permiso)
);

-- ============================================
-- Tabla Estado_Usuario
-- ============================================
CREATE TABLE Estado_Usuario (
	id_Estado_Usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_Estado VARCHAR(40) NOT NULL
);

-- ============================================
-- Tabla Usuario
-- ============================================
CREATE TABLE Usuario (
	id_Usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Rol INT NOT NULL,
	nombre VARCHAR(40) NOT NULL,
	apellido VARCHAR(40) NOT NULL,
	experiencia_Total FLOAT NOT NULL,
	experiencia_Semanal FLOAT NOT NULL,
	horas_Semanales FLOAT NOT NULL,
	fecha_Registro DATETIME NOT NULL,
	id_Estado_Usuario INT NOT NULL,
	CONSTRAINT FK_Rol_Usuario FOREIGN KEY (id_Rol) REFERENCES Rol(id_Rol),
	CONSTRAINT FK_Estado_Usuario_Usuario FOREIGN KEY (id_Estado_Usuario) REFERENCES Estado_Usuario(id_Estado_Usuario)
);

-- ============================================
-- Tabla Accion
-- ============================================
CREATE TABLE Accion (
	id_Accion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	descripcion_Accion VARCHAR(20) NOT NULL
);

-- ============================================
-- Tabla Log_Table
-- ============================================
CREATE TABLE Log_Table (
	id_Log INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Usuario INT NOT NULL,
	id_Accion INT NOT NULL,
	fecha_Accion DATETIME NOT NULL,
	CONSTRAINT FK_Usuario_Log FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario),
	CONSTRAINT FK_Accion_Log FOREIGN KEY (id_Accion) REFERENCES Accion(id_Accion)
);

-- ============================================
-- Tabla Estado_Sesion
-- ============================================
CREATE TABLE Estado_Sesion (
	id_Estado INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_Estado VARCHAR(10) NOT NULL
);

-- ============================================
-- Tabla Sesion
-- ============================================
CREATE TABLE Sesion (
	id_Sesion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Usuario INT NOT NULL,
	fecha_Inicio DATETIME NOT NULL,
	fecha_Fin DATETIME NOT NULL,
	id_Estado INT NOT NULL,
	CONSTRAINT FK_Estado_Sesion FOREIGN KEY (id_Estado) REFERENCES Estado_Sesion(id_Estado),
	CONSTRAINT FK_Usuario_Sesion FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);

-- ============================================
-- Tabla Credenciales
-- ============================================
CREATE TABLE Credenciales (
	id_Credencial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Usuario INT NOT NULL UNIQUE,
	correo VARCHAR(255) NOT NULL UNIQUE,
	contrasenia VARCHAR(255),
	codigo_Temporal VARCHAR(255),
	fecha_Expira_Codigo DATETIME,
	CONSTRAINT FK_Usuario_Credenciales FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
);

-- ============================================
-- Tabla Periodo
-- ============================================
CREATE TABLE Periodo (
	id_Periodo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_Periodo VARCHAR(50) NOT NULL
);

-- ============================================
-- Tabla Estadistica_Periodo
-- ============================================
CREATE TABLE Estadistica_Periodo (
	id_Estadistica_Periodo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Periodo INT NOT NULL,
	nota_Promedio TINYINT NOT NULL,
	CONSTRAINT FK_Periodo_EstadisticaPeriodo FOREIGN KEY (id_Periodo) REFERENCES Periodo(id_Periodo)
);

-- ============================================
-- Tabla Nivel
-- ============================================
CREATE TABLE Nivel (
	id_Nivel INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_Nivel VARCHAR(50) NOT NULL,
	descripcion_Nivel VARCHAR(255),
	id_Periodo INT NOT NULL,
	CONSTRAINT FK_Periodo_Nivel FOREIGN KEY (id_Periodo) REFERENCES Periodo(id_Periodo)
);

-- ============================================
-- Tabla Estadistica_Nivel
-- ============================================
CREATE TABLE Estadistica_Nivel (
	id_Estadistica_Nivel INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Nivel INT NOT NULL,
	nota_Promedio TINYINT NOT NULL,
	fecha DATE NOT NULL,
	partidas_Jugadas INT NOT NULL,
	CONSTRAINT FK_Nivel_Nivel_Estadistica FOREIGN KEY (id_Nivel) REFERENCES Nivel(id_Nivel)
);

-- ============================================
-- Tabla Nota
-- ============================================
CREATE TABLE Nota (
	id_Usuario INT NOT NULL,
	id_Nivel INT NOT NULL,
	id_Periodo INT NOT NULL,
	nota TINYINT NOT NULL,
	aprobado BOOLEAN NOT NULL,
	preguntasAcertadas TINYINT NOT NULL,
	preguntasErradas TINYINT NOT NULL,
	es_quizz_final BOOLEAN NOT NULL,
	PRIMARY KEY (id_Usuario, id_Nivel, id_Periodo),
	CONSTRAINT FK_Usuario_Nota FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario),
	CONSTRAINT FK_Nivel_Nota FOREIGN KEY (id_Nivel) REFERENCES Nivel(id_Nivel),
	CONSTRAINT FK_Periodo_Nota FOREIGN KEY (id_Periodo) REFERENCES Periodo(id_Periodo)
);

-- ============================================
-- Tabla Tema
-- ============================================
CREATE TABLE Tema (
	id_Tema INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Nivel INT NOT NULL,
	nombre_Tema VARCHAR(50) NOT NULL,
	CONSTRAINT FK_Nivel_Tema FOREIGN KEY (id_Nivel) REFERENCES Nivel(id_Nivel)
);

-- ============================================
-- Tabla Pregunta
-- ============================================
CREATE TABLE Pregunta (
	id_Pregunta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Tema INT NOT NULL,
	descripcion_Pregunta VARCHAR(200) NOT NULL,
	CONSTRAINT FK_Pregunta_Tema FOREIGN KEY (id_Tema) REFERENCES Tema(id_Tema)
);

-- ============================================
-- Tabla Respuesta
-- ============================================
CREATE TABLE Respuesta (
	id_Respuesta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_Pregunta INT NOT NULL,
    texto_Respuesta VARCHAR(200) NOT NULL,
	es_Correcta BOOLEAN NOT NULL,
	CONSTRAINT FK_Pregunta_Respuesta FOREIGN KEY (id_Pregunta) REFERENCES Pregunta(id_Pregunta)
);

-- Insertar estados de usuario
INSERT INTO Estado_Usuario (id_Estado_Usuario, nombre_Estado) VALUES 
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'Bloqueado');

-- Insertar roles
INSERT INTO Rol (id_Rol, nombre_Rol) VALUES 
(1, 'Administrador'),
(2, 'Usuario');

-- Insertar permisos básicos (si los necesitas)
INSERT INTO Permiso (id_Permiso, nombre_Permiso) VALUES 
(1, 'CREAR_USUARIO'),
(2, 'EDITAR_USUARIO'),
(3, 'ELIMINAR_USUARIO');

-- Insertar periodos por separado y guardar sus IDs
INSERT INTO Periodo (nombre_Periodo) VALUES ('EL SUEÑO DE DON JOSE DE SAN MARTIN');
SET @id_periodo1 := LAST_INSERT_ID();

INSERT INTO Periodo (nombre_Periodo) VALUES ('La promesa de Simón Bolívar');
SET @id_periodo2 := LAST_INSERT_ID();

INSERT INTO Periodo (nombre_Periodo) VALUES ('El viaje de la bandera peruana');
SET @id_periodo3 := LAST_INSERT_ID();

INSERT INTO Periodo (nombre_Periodo) VALUES ('El Perú');
SET @id_periodo4 := LAST_INSERT_ID();

INSERT INTO Periodo (nombre_Periodo) VALUES ('El sueño de los libertadores');
SET @id_periodo5 := LAST_INSERT_ID();

-- Insertar niveles correspondientes a cada periodo
INSERT INTO Nivel (nombre_Nivel, descripcion_Nivel, id_Periodo)
VALUES 
('Nivel 1', 'Preguntas texto', @id_periodo1),
('Nivel 2', 'Preguntas video', @id_periodo1);

INSERT INTO Nivel (nombre_Nivel, descripcion_Nivel, id_Periodo)
VALUES 
('Nivel 3', 'Preguntas texto', @id_periodo2),
('Nivel 4', 'Preguntas video', @id_periodo2);

INSERT INTO Nivel (nombre_Nivel, descripcion_Nivel, id_Periodo)
VALUES 
('Nivel 5', 'Preguntas texto', @id_periodo3),
('Nivel 6', 'Preguntas video', @id_periodo3);

INSERT INTO Nivel (nombre_Nivel, descripcion_Nivel, id_Periodo)
VALUES 
('Nivel 7', 'Preguntas texto', @id_periodo4),
('Nivel 8', 'Preguntas video', @id_periodo4);

INSERT INTO Nivel (nombre_Nivel, descripcion_Nivel, id_Periodo)
VALUES 
('Nivel 9', 'Preguntas texto', @id_periodo5),
('Nivel 10', 'Preguntas video', @id_periodo5);

-- Insertar temas asociados a cada nivel
INSERT INTO Tema (id_Nivel, nombre_Tema)
VALUES 
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 1'), 'Perido 1 parte 1'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 2'), 'Perido 1 parte 2'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 3'), 'Perido 2 parte 1'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 4'), 'Perido 2 parte 2'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 5'), 'Perido 3 parte 1'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 6'), 'Perido 3 parte 2'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 7'), 'Perido 4 parte 1'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 8'), 'Perido 4 parte 2'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 9'), 'Perido 5 parte 1'),
((SELECT id_Nivel FROM Nivel WHERE nombre_Nivel='Nivel 10'), 'Perido 5 parte 2');

select*from Nivel;
