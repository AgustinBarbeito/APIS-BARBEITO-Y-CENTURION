const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Importación de routers personalizados
const apiRouter = require('./routes/api'); // Ahora apunta al index.js

// Creación de la instancia de la aplicación Express
const app = express();

// Middleware para interpretar JSON y datos de formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Habilita CORS para todas las rutas
app.use(cors());

// Middleware para parsear cookies
app.use(cookieParser());

// Middleware personalizado para configurar cabeceras CORS más específicas
app.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:3008', 'http://localhost:3009'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, session-id');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Definición de rutas
app.use('/api', apiRouter);

// Conexión a la base de datos MongoDB Atlas
const mongoUrl = 'mongodb+srv://azulcenturion:bQ89J6yIOoih6D8s@cluster0.dfo83ha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully Connected to the MongoDB Database..');
})
.catch((e) => {
  console.log('Error Connecting to the MongoDB Database..');
  console.log(e);
});

// Setup server port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Servidor de ABM Users iniciado en el puerto', port);
}); 