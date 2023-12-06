// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const productsRouter = require('./routers/apis/products.router');
const viewsRouter = require('./routers/views/views.router.js');

const app = express();
const serverHttp = http.createServer(app);
const io = socketIo(serverHttp);

app.engine('.hbs', exphbs({
   extname: '.hbs',
   defaultLayout: 'main',
   layoutsDir: path.join(__dirname, 'views/layouts'),
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Rutas
app.use('/views', viewsRouter);
app.use('/api/products', productsRouter(io));  // Pasamos la instancia de io al enrutador
app.use('/api/carts', (req, res) => {
   res.send('Carts endpoint');
});

const PORT = process.env.PORT || 8080;
serverHttp.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportamos solo el servidor HTTP
module.exports = {
  serverHttp,
};
