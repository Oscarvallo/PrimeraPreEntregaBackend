const fs = require('fs');
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

// Lee la lista de productos al inicio
let productList = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockDB/productsList.json'), 'utf-8'));

// Configuración del motor de plantillas Handlebars
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/views', viewsRouter);
app.use('/api/products', productsRouter(io, productList));

// Configuración de eventos de socket
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('crearProducto', (product) => {
 
    productList.push(product);
    fs.writeFileSync(path.join(__dirname, 'mockDB/productsList.json'), JSON.stringify(productList));
    io.emit('productoCreado', product);
  });

  socket.on('eliminarProducto', (productId) => {
   
    productList = productList.filter((product) => product.id !== productId);
    fs.writeFileSync(path.join(__dirname, 'mockDB/productsList.json'), JSON.stringify(productList));
    io.emit('productoEliminado', productId);
  });

  // Otros eventos o configuraciones de socket pueden ir aquí...

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 8080;
serverHttp.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportamos solo el servidor HTTP
module.exports = {
  serverHttp,
};
