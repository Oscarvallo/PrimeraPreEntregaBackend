// product.router.js
const { Router } = require('express');
const ProductManagerFile = require('../../managers/productsManagerFile');

const router = Router();
const productsService = new ProductManagerFile();

// Función de enrutador que recibe la instancia de io
module.exports = function(io) {
  router
    .get('/', async (req, res) => {
      try {
        const products = await productsService.getProducts();
        res.send({
          status: 'success',
          payload: products,
        });
      } catch (error) {
        res.status(500).send({
          status: 'error',
          message: 'Error al obtener los productos',
        });
      }
    })
    .post('/', async (req, res) => {
      try {
        const product = req.body;
        const result = await productsService.addProduct(product);

        // Emite el evento para actualizar la lista de productos en tiempo real
        io.emit('productoCreado', result);

        res.send(result);
      } catch (error) {
        res.status(500).send({
          status: 'error',
          message: 'Error al agregar el producto',
        });
      }
    })
    .delete('/:pid', async (req, res) => {
      try {
        const { pid } = req.params;
        await productsService.delete(parseInt(pid));

        // Emite el evento para actualizar la lista de productos en tiempo real
        io.emit('productoEliminado', parseInt(pid));

        res.send('Producto eliminado');
      } catch (error) {
        res.status(500).send({
          status: 'error',
          message: 'Error al eliminar el producto',
        });
      }
    });

  return router;
};
