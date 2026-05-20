API REST desarrollada con Node.js, Express y SQLite para gestionar clientes aplicando operaciones CRUD con buenas prácticas de seguridad.

Tecnologías utilizadas
- Node.js
- Express
- better-sqlite3 (SQLite)

Requisitos previos
- tener instalado Node.js

Instalación
1) clonar el repositorio: https://github.com/S0liduss/API-rest.git

2) entrar a la carpeta del proyecto a través de la terminal

3) instalar las dependencias con el comando "npm install"

Ejecutar utilizando el comando "npm start"

El servidor quedará corriendo en "http://localhost:3000"

Endpoints disponibles
- GET /clientes Obtener todos los clientes 
- GET /clientes/:id Obtener un cliente por ID 
- POST /clientes Crear un nuevo cliente 
- PUT /clientes/:id Actualizar un cliente 
- DELETE /clientes/:id Eliminar un cliente 

Ejemplo de body para POST y PUT

```json
{
  "nombre": "John Doe ",
  "email": "jdoe@test.com",
  "telefono": "912345678"
}
```
Códigos de respuesta 

- 200 OK
- 201 Cliente creado exitosamente 
- 400 Faltan campos obligatorios 
- 404 Cliente no encontrado 
- 409 El email ya está registrado 
- 500 Error interno del servidor
