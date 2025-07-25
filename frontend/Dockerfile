# frontend/Dockerfile.dev

FROM node:20-alpine

WORKDIR /app

# Salin package.json untuk install dependensi terlebih dahulu
COPY package.json .
RUN npm install

# Salin sisa kode (ini akan dioverride oleh volume di docker-compose, tapi baik untuk build awal)
COPY . .

# Expose port yang digunakan oleh Vite dev server
EXPOSE 5173

# Perintah untuk menjalankan dev server
CMD ["npm", "run", "dev"]