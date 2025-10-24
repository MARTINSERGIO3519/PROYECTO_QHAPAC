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
	es_Correcta BOOLEAN NOT NULL,
	CONSTRAINT FK_Pregunta_Respuesta FOREIGN KEY (id_Pregunta) REFERENCES Pregunta(id_Pregunta)
);
