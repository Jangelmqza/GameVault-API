require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Agregamos '0.0.0.0' como segundo parámetro aquí 👇
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
