const { Router } = require('express');
const ProductManagerFile = require('../managers/productsManagerFile');

const router = Router();
const productsService = new ProductManagerFile();

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
  .get('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productsService.getProduct(parseInt(pid));

      if (!product) {
        return res.status(400).send({
          status: 'error',
          message: 'No se encuentra el producto',
        });
      }

      res.send({
        status: 'success',
        payload: product,
      });
    } catch (error) {
      res.status(500).send({
        status: 'error',
        message: 'Error al obtener el producto',
      });
    }
  })
  .post('/', async (req, res) => {
    try {
      const product = req.body;
      const result = await productsService.addProduct(product);
      res.send(result);
    } catch (error) {
      res.status(500).send({
        status: 'error',
        message: 'Error al agregar el producto',
      });
    }
  })
  .put('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const updateToProduct = req.body;
      await productsService.update(parseInt(pid), updateToProduct);
      res.send('Producto actualizado');
    } catch (error) {
      res.status(500).send({
        status: 'error',
        message: 'Error al actualizar el producto',
      });
    }
  })
  .delete('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      await productsService.delete(parseInt(pid));
      res.send('Producto eliminado');
    } catch (error) {
      res.status(500).send({
        status: 'error',
        message: 'Error al eliminar el producto',
      });
    }
  });

module.exports = router;

