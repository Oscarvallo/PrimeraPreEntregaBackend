const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const router = Router();

module.exports = function (io, productList) {
  router
    .get('/', (req, res) => {
      res.send({
        status: 'success',
        payload: productList,
      });
    })
    // Modifica la parte relevante en products.router.js
.post('/', (req, res) => {
  try {
    const product = req.body;
    const productId = obtenerNuevoId(); // Implementa una función para obtener un nuevo ID único
    product.id = productId;

    productList.push(product);

    fs.writeFileSync(path.join(__dirname, '../../mockDB/productsList.json'), JSON.stringify(productList));

    io.emit('productoCreado', product);

    console.log('Evento productoCreado emitido:', product);
    res.send({
      status: 'success',
      payload: product,
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Error al agregar el producto',
    });
  }
})

.delete('/:pid', (req, res) => {
  try {
    const productId = req.params.pid;
    const index = productList.findIndex(product => product.id === parseInt(productId));

    if (index !== -1) {
      const deletedProduct = productList.splice(index, 1)[0];
      fs.writeFileSync(path.join(__dirname, '../../mockDB/productsList.json'), JSON.stringify(productList));

      io.emit('productoEliminado', deletedProduct.id);

      console.log('Evento productoEliminado emitido:', deletedProduct.id);

      res.send({
        status: 'success',
        payload: deletedProduct,
      });
    } else {
      res.status(404).send({
        status: 'error',
        message: 'Producto no encontrado',
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Error al eliminar el producto',
    });
  }
});

return router;
};4