<div align="center">
  <img src="https://i.postimg.cc/LstzkZww/Captura-de-pantalla-2024-11-19-a-la-s-15-43-05.png" alt="Captura de pantalla">
</div>

# HelpHub: "Uniendo talentos, creando comunidad" | Backend

HelpHub es una plataforma de *intercambio de habilidades* comunitarias, diseñada como una iniciativa sin ánimo de lucro.

## 🎯 Objetivo
Proporcionar un entorno inclusivo donde los usuarios puedan ofrecer sus habilidades a otros miembros de la comunidad y, a su vez, reciban asistencia personalizada en áreas en las que buscan aprender o mejorar.
Este modelo de intercambio tiene como finalidad maximizar el potencial de la comunidad al unir fuerzas y fomentar el desarrollo mutuo.

## 👥 Audiencia
HelpHub está diseñado para una audiencia diversa, incluyendo:
- **Comunidad local**: Vecinos y ciudadanos que buscan colaborar entre sí.
- **Profesionales y expertos**: Compartir conocimiento y ampliar su red profesional.
- **Organizaciones sin ánimo de lucro**: Unir esfuerzos para ayudar a comunidades específicas.
- **Grupos de voluntarios**: Coordinar iniciativas y compartir habilidades dentro de sus redes.
- **Aprendices y mentores**: Fomentar relaciones de mentoría en múltiples disciplinas.
- **Emprendedores y pequeñas empresas**: Resolver necesidades puntuales y colaborar para crecer.

## 🛠️ Funcionalidades
- **Registro de Usuario con 2FA**: 🛡️ Los nuevos usuarios pueden registrarse proporcionando su información básica. Se implementa un sistema de autenticación de dos factores (2FA) para mayor seguridad.

- **Inicio de Sesión**: 🔐 Los usuarios pueden iniciar sesión con su correo y contraseña. Compatibilidad con el sistema 2FA para confirmar la identidad del usuario en cada inicio de sesión.

- **Perfil**: 👤 Los usuarios pueden crear, editar, ver y eliminar su perfil personal.

- **Habilidades**: 💡 Los usuarios pueden añadir, editar, listar y eliminar habilidades que desean ofrecer.

- **Solicitar Intercambio**: 🤝 Los usuarios pueden enviar solicitudes de intercambio a otros miembros de la plataforma. Sistema de notificaciones para informar al receptor de la solicitud.

- **Petición de Ayuda**: 🆘 Los usuarios pueden realizar una petición de ayuda si tienen algo específico que quieren resolver sin solicitar un intercambio.

- **Chat en Tiempo Real**: 💬 Comunicación directa entre usuarios para coordinar los intercambios.

- **Filtrar por Categorías**: 🔍 Herramienta de búsqueda avanzada para encontrar habilidades o usuarios específicos.

- **Valoración del Intercambio**: ⭐ Los usuarios pueden añadir una breve reseña describiendo su experiencia y calificando el intercambio.

## ⚙️ Tecnologías y herramientas
<div align="center">
    <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" />
    <img src= "https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="Nest"/>
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white" alt="Node"/>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" >
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
    <img src="https://img.shields.io/badge/%E2%96%B3%20argon2-6D4AFF?style=for-the-badge&logo=argon2&logoColor=white" alt="Argon2" />
    <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white" alt="Socket io">
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="Swagger" />
    <img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white" alt="Trello" />
    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />
</div>

## 🗄️ Diseño de Colecciones

<details>
<summary>👥 USERS </summary>

| Campo        | Tipo     | Descripción                        | Ejemplo      | Requerido | Valor por defecto |
|--------------|----------|------------------------------------|--------------|-----------|-------------------|
| email        | String   | Dirección de correo electrónico    | too@gmail.com| Sí        | Ninguno           |
| password     | String   | Contraseña del usuario             | fffD33454     | Sí        | Ninguno           |
| nameUser     | String   | Nombre del usuario                 | Toni         | Sí        | Ninguno           |
| surnameUser  | String   | Apellido del usuario               | Fernandez    | Sí        | Ninguno           |
| phone        | String   | Número de teléfono del usuario     | 123456       | No        | Ninguno           |
| optionCall   | Boolean  | Indica si acepta llamadas          | false        | No        | false             |
| showPhone    | Boolean  | Define si el teléfono es visible   | false        | No        | false             |
| blocked      | Boolean  | Estado de bloqueo del usuario      | false        | No        | false             |
| twoFa        | String   | Código de dos factores             | 445667       | No        | Ninguno           |
| role         | String   | Rol del usuario                    | user         | Sí        | 'user'            |

</details>

<details>
<summary>👤 PROFILE </summary>

| Campo                | Tipo         | Descripción                                 | Ejemplo                                          | Requerido | Valor por defecto |
|----------------------|--------------|---------------------------------------------|--------------------------------------------------|-----------|-------------------|
| description          | String       | Descripción breve sobre la persona          | I am a passionate developer with 5 years of experience. | Sí        | Ninguno           |
| interestedSkills     | Array (String) | Habilidades de interés del usuario         | ["Animales", "Salud"]                            | Sí        | Ninguno           |
| location             | String       | Ubicación del usuario                       | 12345                                            | Sí        | Ninguno           |
| profilePicture       | String       | URL de la foto de perfil                    | https://example.com/profile-picture.jpg          | No        | Ninguno           |
| preferredTimeRange   | String       | Rango horario preferido                     | 08:00 a 14:00                                    | No        | Ninguno           |
| selectedDays         | Array (String) | Días seleccionados para disponibilidad     | ["Lunes", "Miércoles", "Viernes"]                | No        | Ninguno           |

</details>

<details>
<summary>💡 HABILITY</summary>

| Campo        | Tipo         | Descripción                               | Ejemplo            | Requerido | Valor por defecto |
|--------------|--------------|-------------------------------------------|--------------------|-----------|-------------------|
| title        | String       | Título del rol o trabajo                  | Programador        | Sí        | Ninguno           |
| level        | String       | Nivel de habilidad o experiencia          | Básico             | Sí        | Ninguno           |
| mode         | String       | Modalidad de trabajo                      | Online             | Sí        | Ninguno           |
| description  | String       | Descripción breve del trabajo o rol       | doing c++          | No        | Ninguno           |
| category     | Array (String)| Categorías del trabajo o rol             | ["Idiomas", "Tutorías"] | Sí  | Ninguno           |

</details>

<details>
<summary>🆘 HELP REQUESTS</summary>

| Campo         | Tipo   | Descripción                                                   | Ejemplo                                              | Requerido | Valor por defecto |
|---------------|--------|---------------------------------------------------------------|------------------------------------------------------|-----------|-------------------|
| title         | String | Título de la solicitud o petición                             | Recipe                                               | Sí        | Ninguno           |
| description   | String | Descripción detallada de la solicitud                         | I need help with a vegan cheese recipe that I can't come up with. | Sí        | Ninguno           |
| category      | String | Categoría de la solicitud                                    | Cook                                                 | Sí        | Ninguno           |
| profilePicture| String | URL de la imagen de perfil o solicitud visual                 | https://example.com/help_request-picture.jpg          | No        | Ninguno           |


</details>

<details>
<summary>🔁 EXCHANGE</summary>

| Campo      | Tipo   | Descripción                                  | Ejemplo                | Requerido | Valor por defecto |
|------------|--------|----------------------------------------------|------------------------|-----------|-------------------|
| transmitter| String | Identificador o nombre del transmisor        | sdfsdfds31231311        | Sí        | Ninguno           |
| reciever   | String | Identificador o nombre del receptor          | sdfsdfdse1231231231311  | Sí        | Ninguno           |
| state      | String | Estado del proceso o transacción             | progress               | Sí        | Ninguno           |
| date       | String | Fecha en formato dd-mm-aaaa                  | 12-10-2024             | Sí        | Ninguno           |

</details>

## ✅ Requisitos previos
Asegúrate de cumplir con los siguientes requisitos antes de comenzar:

- **Node.js y npm**:
Asegúrate de tener instalados Node.js (versión recomendada: LTS) y npm (instalado automáticamente con Node.js).

- **Typescript**:
Aunque typescript se incluye como dependencia en los proyectos NestJS, puedes instalarlo globalmente si deseas ejecutar comandos como tsc fuera del proyecto: ```npm install -g typescript```

- **MongoDB**:
Instala MongoDB en tu máquina local desde [MongoDB Community Server](https://www.mongodb.com/try/download/community).
Opcional: Descarga e instala [MongoDB Compass](https://www.mongodb.com/products/tools/compass) para una interfaz gráfica que facilite la visualización y manipulación de datos.

- **Git**:
Instala [Git](https://git-scm.com/) para clonar el repositorio.

## 📦 Dependencias
Este proyecto requiere ciertos paquetes adicionales. Puedes instalarlos *automáticamente* con el comando ```npm install```, o *manualmente*:

- Configuración del entorno:
```npm install @nestjs/config```

- Documentación de la API:
```npm install --save @nestjs/swagger```

- Validación y transformación:
```npm i --save class-validator class-transformer```

- Integración con MongoDB utilizando Mongoose:
```npm i @nestjs/mongoose mongoose```

- Hashing seguro de contraseñas:
```npm i argon2```

- Envío de correos electrónicos y creación de plantillas:
```npm i @nestjs-modules/mailer```
```npm install mjml```

- Creación y validación de tokens:
```npm install --save @nestjs/jwt```

- Autenticación de usuarios:
```npm install --save @nestjs/jwt passport-jwt```
```npm install --save @nestjs/passport passport passport-local```

- Carga de archivos:
```npm i -D @types/multer```

- Comunicación en tiempo real:
```npm i --save @nestjs/websockets @nestjs/platform-socket.io```

- Manipulación de fechas:
```npm i date-fns```

## 💾 Instalación local

1. **Clona este repositorio**: ```git clone https://github.com/AdoptaUnJuniorPlatform/GT-HelpHub-Back```

2. **Instala las dependencias**: ```npm install -y```

3. **Configura el entorno**: Crea un archivo .env con las credenciales de tu base de datos.
```bash
FRONT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
IP_DATABASE=mongodb://localhost:27017/your_database_name
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_email_password
PORT_RUN=3000
MAIL_HOST=smtp.yourmailhost.com
MAIL_PORT=587
```

4. **Inicia el servidor**: ```npm run start```

5. **Prueba del sistema**: Una vez que el servidor de desarrollo esté en funcionamiento, puedes:
- *Interactuar con la aplicación*: a través de Swagger (ver abajo sección "🧾 Documentación de la API")
- *Verificar la base de datos*: usa MongoDB Compass para verificar la BD

## 🧾 Documentacón de la API
Nuestra API cuenta con documentación interactiva generada con **Swagger**. Allí encontrarás:
- Lista completa de endpoints organizados por recursos.
- Descripción de los parámetros requeridos para cada endpoint.
- Ejemplos de respuestas para facilitar la implementación.
- Botones de prueba interactivos para ejecutar solicitudes directamente desde el navegador.
#### Cómo acceder a Swagger
1. Asegúrate de que el servidor esté corriendo. Puedes iniciarlo con el siguiente comando: ```npm run start```
2. Una vez que el servidor esté en funcionamiento, abre tu navegador y navega a ```https://localhost:3000/api``` (reemplaza el puerto por el que estés utilizando). Desde allí, puedes interactuar con la aplicación.

## 🧪 Ejecución de Pruebas
El proyecto incluye pruebas automatizadas utilizando **Jest**. Asegúrate de haber instalado todas las dependencias del proyecto.

- Para **ejecutar todas las pruebas** definidas en el proyecto: ```npm run test```

- Para **obtener más detalles** durante la ejecución de las pruebas: ```npm run test:verbose```

- Para **generar un informe** de cobertura de código y ver qué partes del proyecto han sido probadas: ```npm run test:cov```

- Para **probar un archivo específico**: ```npm run test nombre-del-archivo.spec.ts```

## 🎨 Frontend
Echa un vistazo a los repositorios en:

- 🖥️ [Dekstop - HelpHub](https://github.com/AdoptaUnJuniorPlatform/GT-HelpHub-Front)
- 🤖 [Mobile Android - HelpHub](https://github.com/AdoptaUnJuniorPlatform/GT-HelpHub-Android)
- 🍎 [Mobile IOS - HelpHub](https://github.com/AdoptaUnJuniorPlatform/GT-HelpHub-IOS)

## 🤝 Agradecimientos

Queremos expresar nuestra profunda gratitud a toda la **comunidad de Adopta Un Junior**, quienes hacen posible este proyecto con su apoyo, feedback y compromiso constante.

Un agradecimiento especial a nuestros compañeros del equipo de trabajo HelpHub:
- **Equipo de UX/UI**
- **Equipo de Frontend**
- **Equipo de Mobile iOS y Android**
- **Equipo de Ciberseguridad** <br>
Cuya colaboración, talento y esfuerzo han sido claves para superar los retos técnicos y llevar este proyecto al siguiente nivel.

## 👨‍💻👩‍💻 Colaboradores
Desarrollado y mantenido por:

- **Todor Saltirov Ivanov** - Full Stack Developer <br>
  [![GitHub](https://img.shields.io/badge/-GitHub-333?logo=github&logoColor=white&style=flat-square)](https://github.com/tsaltirov)
  [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/todor-saltirov-ivanov/)

- **Morena Peralta Almada** - Full Stack Developer <br>
  [![GitHub](https://img.shields.io/badge/-GitHub-333?logo=github&logoColor=white&style=flat-square)](https://github.com/More-Pe)
  [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/morena-peralta-almada/)  

- **María Laura Luraschi** - Cybersecurity Analyst <br>
  [![GitHub](https://img.shields.io/badge/-GitHub-333?logo=github&logoColor=white&style=flat-square)](https://github.com/marialauraluraschi)
  [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/malalu/)  

