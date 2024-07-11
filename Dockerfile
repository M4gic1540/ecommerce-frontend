# Usa una imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios al directorio de trabajo
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto en el que Express está escuchando
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
