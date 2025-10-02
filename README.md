# 🛍️ Wishlist & Shopping Bag Service

Microservicio para manejar la **bolsa de compras** y la **lista de deseos (favoritos)** en una tienda online.  
Construido con **Node.js + Express + Sequelize + PostgreSQL (Neon)**.

---

## ⚙️ Requisitos

- Node.js >= 18
- PostgreSQL (ej. Neon DB)
- Dependencias instaladas:

```bash
npm install

Archivo .env con las variables necesarias:

APP_PORT=4001
API_GATEWAY_URL=http://localhost:3000
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name


Levantar el servicio
node index.js

