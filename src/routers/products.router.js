const { Router } = require('express');
const ProductManagerFile = require('../managers/productsManager');

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
  .get('/:pid', async (req, res) => {  // Agregado async para poder usar await
    try {
      const { pid } = req.params;
      const product = await productsService.getProduct(pid);
    
      if (!product) {
        return res.status(400).send({
          status: 'error',
          message: 'No se encuentra el producto',
        });
      }

      res.send({
        status: 'success',
        payload: product,  // Cambiado 'product' a product
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
  
  .put('/:pid', (req, res) => {
    const { pid } = req.params;
    res.send('put product' + pid);
  })
  .delete('/:pid', (req, res) => {
    const { pid } = req.params;
    res.send('delete product' + pid);
  });

module.exports = router;
