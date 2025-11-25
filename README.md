# 🐶🐱 Proyecto Backend III – Mocking, Adopciones, Tests y Docker

Este proyecto corresponde a la **Entrega Final** del curso **Backend III (Coderhouse)**. Incluye:

- Mocking de usuarios y mascotas
- Inserción masiva de datos
- CRUD de adopciones
- Documentación con Swagger
- Tests funcionales con Jest + Supertest
- Uso de MongoDB Atlas + Mongoose
- Dockerfile listo para producción
- Imagen Docker subida a DockerHub

---

# 📦 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Faker.js
- Bcrypt
- Dotenv
- Jest
- Supertest
- Swagger UI + Swagger-JSDoc
- Docker

---

# 📁 Estructura del Proyecto

```
src/
├─ models/
│  ├─ pet.model.js
│  ├─ user.model.js
│  └─ adoption.model.js
├─ routes/
│  ├─ mocks.router.js
│  ├─ pets.router.js
│  ├─ users.router.js
│  └─ adoption.router.js
├─ utils/
│  └─ mocking.js
├─ test/
│  └─ adoption.test.js
├─ app.js
├─ app.testing.js
Dockerfile
.env
package.json
README.md
```

---

# 📘 Documentación con Swagger

La documentación está disponible en:

👉 **http://localhost:3000/api/docs**

Ejemplo de anotación utilizada:

```js
/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
```

---

# 🚀 Endpoints principales

## 🔹 Mocking

### `GET /api/mocks/mockingusers`
Genera usuarios mock (NO se guardan en DB).

### `GET /api/mocks/mockingpets`
Genera mascotas mock (NO se guardan en DB).

### `GET /api/mocks/mockingadoptions`
Genera adopciones aleatorias (SÍ se guardan en DB).  
Requiere usuarios y mascotas creados previamente.

### `POST /api/mocks/generateData`
Inserta usuarios y mascotas reales en MongoDB.

Body:
```json
{
  "users": 20,
  "pets": 30
}
```

---

## 🔹 Users

### `GET /api/users`
Obtiene todos los usuarios.

---

## 🔹 Pets

### `GET /api/pets`
Obtiene todas las mascotas.

---

## 🔹 Adoptions

### `POST /api/adoption`
Crear adopción.

Body:
```json
{
  "user": "ObjectIdUser",
  "pet": "ObjectIdPet"
}
```

### `GET /api/adoption`
Obtiene todas las adopciones con populate.

---

# 🧪 Tests funcionales (Jest + Supertest)

Los tests cubren:

- Crear adopción (POST)
- Listar adopciones (GET)
- Uso de una base separada con `MONGO_URL_TEST`
- Limpieza automática al finalizar

Ejecutar tests:

```
npm test
```

---

# 🐳 Docker

Este proyecto está dockerizado.

## Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Imagen pública en DockerHub

👉 **https://hub.docker.com/r/amirkalasnicoy/proyecto-backend-iii**

## Ejecutar la imagen

1️⃣ Descargar:

```
docker pull amirkalasnicoy/proyecto-backend-iii
```

2️⃣ Ejecutar:

```
docker run -p 3000:3000 amirkalasnicoy/proyecto-backend-iii
```

Acceder a:

- http://localhost:3000  
- http://localhost:3000/api/docs  

---

# 🔐 Variables de entorno (.env)

```
PORT=3000
MONGO_URL=<cadena MongoAtlas>
MONGO_URL_TEST=<cadena MongoAtlasTesting>
```

---

# ▶️ Instrucciones de ejecución (sin Docker)

Instalar dependencias:

```
npm install
```

Iniciar servidor:

```
npm start
```

Modo desarrollo:

```
npm run dev
```

Ejecutar tests:

```
npm test
```

---


# 📸 Capturas de MongoDB

## Pets
![Pets](./imagenes_mongo/test_pets.png)

## Users
![Users](./imagenes_mongo/test_users.png)

---

