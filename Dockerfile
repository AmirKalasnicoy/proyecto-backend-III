# --- 1) Imagen base ---
FROM node:18

# --- 2) Carpeta de trabajo en el contenedor ---
WORKDIR /app

# --- 3) Copiar package.json y package-lock.json ---
COPY package*.json ./

# --- 4) Instalar dependencias ---
RUN npm install

# --- 5) Copiar el resto del código ---
COPY . .

# --- 6) Exponer el puerto que usa tu app ---
EXPOSE 3000

# --- 7) Comando de inicio ---
CMD ["npm", "start"]
