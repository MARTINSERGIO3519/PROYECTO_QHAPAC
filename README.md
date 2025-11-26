# Qhapac
---

## Descripción del proyecto
Qhapac es una aplicación web educativa e interactiva destinada a los estudiantes de entre 6 a 12 años que buscan aprender sobre la historia del Perú de manera divertida, concisa y dinámica.

El objetivo principal de Qhapac es fomentar el aprendizaje activo y la comprensión de eventos históricos importantes del Perú, incentivando la lectura y autodidacia mediante historietas, reflexión y análisis crítico. Los usuarios pueden explorar diferentes periodos históricos con ayuda de materiales didácticos atractivos, tales como historietas, imágenes ilustradas, videos y quizzes para poner a prueba su aprendizaje. Además, hacer crecer su lado competitivo, al contar con un sistema de rankings que se actualiza cada semana.

El proyecto está construido con un backend robusto en **Spring Boot**, que se encarga de la gestión de usuarios, el registro de decisiones y la conexión con la base de datos **MySQL**. El frontend está desarrollado en **React**, usando **Bootstrap** para ofrecer una interfaz amigable, intuitiva y responsive, que puede ser utilizada en distintos dispositivos. Qhapac está pensado tanto para estudiantes de historia, pero puede igualmente atraer a cualquier persona interesada en conocer la historia del Perú de forma entretenida e interactiva.

## Tecnologías usadas
- **Backend:** Spring Boot  
- **Frontend:** React, Bootstrap  
- **Base de datos:** MySQL  
- **Herramientas de desarrollo:** IntelliJ IDEA, MySQL Workbench, Node.js, npm

## Capturas de pantalla 
* Menu de login
<img width="1904" height="906" alt="image" src="https://github.com/user-attachments/assets/887b93c9-bbd9-4d4a-8952-49b3114f454f" />




## Instalación y ejecución

1. Clona el repositorio
~~~bash
git clone https://github.com/MARTINSERGIO3519/PROYECTO_QHAPAC.git
~~~

2. Abrir el proyecto en tu IDE favorito (NetBeans, IntelliJ, VSCode).
<img width="465" height="502" alt="image" src="https://github.com/user-attachments/assets/27fa9157-7571-4f79-bd53-7488293e94b2" />

3. Configurar la base de datos y actualizar el archivo application.properties.
~~~
server.port=8090
#Database
spring.datasource.url=jdbc:mysql://localhost:3306/qhapacdb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=martin01
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
~~~

4. Ejecuta el archivo TpCursoIntegradorApplication.java
<img width="989" height="223" alt="image" src="https://github.com/user-attachments/assets/06f21215-3935-47be-a56b-64fe986964f2" />



5. Estructura del proyecto:
     1.  Backend:
         * pom.xml:
         Contiene las dependencias para asegurar la comunicación, seguridad y funcionalidad con la base de datos.
         <img width="189" height="54" alt="image" src="https://github.com/user-attachments/assets/7ee2cf5e-bbc5-4bc1-b1cd-06dff2333768" />


         * WebConfig:
         Permite la comunicación entre un servidor frontend http React (puerto 3000) con el servidor backend Springboot(puerto 8090) usando la clase CordRegistry.
         <img width="401" height="52" alt="image" src="https://github.com/user-attachments/assets/0466647e-6c4a-477b-a870-cbf665d86e23" />


         * Clases DTO:   
          Representan las clases que almacenarán los datos recibidos por el usuario cuando este realice una petición HTTP.   
        <img width="400" height="71" alt="image" src="https://github.com/user-attachments/assets/b58e7a32-bc2a-4ff3-bffc-0792732ccf53" />

         * Interfaces Repository:
          Proporcionan métodos con los que puede realizar métodos CRUD a la base de datos sin necesidad de escribir querys manualmente, gracias a que extiende a la clase JpaRepository.
         <img width="424" height="65" alt="image" src="https://github.com/user-attachments/assets/0f7aac3f-0810-4f43-8eee-fc175c19ec70" />
        
         * Clases Entity:    
         Cada clase entity mapea(representa) completamente a una tabla específica de la base de datos. A su vez, representa las relaciones(uno a uno, uno a muchos o muchos a muchos) con las demás entidades, siendo               fiel a la estructura de la base de datos.
         <img width="412" height="271" alt="image" src="https://github.com/user-attachments/assets/b8646ad5-d357-4846-a71d-53374bf8a9a0" />
         
         * Clases Service:
         Cada clase service combina los métodos proporcionados por la interfaz Repository y la estructura de las clases DTO y entities con el objetivo de definir los métodos CRUD para comunicarse con la base de datos.
         <img width="415" height="69" alt="image" src="https://github.com/user-attachments/assets/29c6719c-72f0-4d81-926b-63e6f98c9236" />
        
         * Clases Mapper:
         Convierte una clase DTO a una entidad y viceversa.
         <img width="430" height="71" alt="image" src="https://github.com/user-attachments/assets/93f0179d-eb5b-44eb-b9d3-385e832c224b" />
        
         * Clases Controller:
        Define las API a las que se podrá conectar el usuario y las combina con los métodos ya establecidos en las clases Service.
         <img width="407" height="68" alt="image" src="https://github.com/user-attachments/assets/adcf56d4-9cd6-42d2-9f52-f4edb315df59" />
      2. Frontend:
         * Menú de Inicio:
           Permitirá al Interactuar al usuario con las preguntas, historietas y videos eductativos.
           <img width="1904" height="909" alt="image" src="https://github.com/user-attachments/assets/835e3bf1-8eba-4dd3-a82f-474323af6603" />

         * Menú tutorial:
           Permitirá responder a dudas frecuentes de los usuarios sobre el funcionamiento de la página.
           

           

         
         






