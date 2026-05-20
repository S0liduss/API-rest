const express  = require('express');
const app      = express();
const PORT     = 3000;

// Middleware para utilizar JSON
app.use(express.json());

// Rutas
const clientesRouter = require('./routes/clientes');
app.use('/clientes', clientesRouter);

// Ruta raíz para hacer pruebas
app.get('/', (req, res) => {
  res.json({ message: 'API Clientes funcionando ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});