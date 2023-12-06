const { Router } = require('express');
const router = Router();
const productMock = [
    { id: '1', title: 'Product 1', price: 1500, stock: 100, description: 'Esto es un prod. ' },
    { id: '2', title: 'Product 2', price: 1500, stock: 100, description: 'Esto es un prod. ' },
    { id: '3', title: 'Product 3', price: 1500, stock: 100, description: 'Esto es un prod. ' },
];

router.get('/', (req, res) => {
    res.render('index', {
        title: 'mercadigo Gaston',
        name: 'Gaston'
    });
});

router.get('/realtimeproducts', (req, res) => {
    // En lugar de pasar datos estáticos, puedes pasar datos dinámicos obtenidos del servidor o de la base de datos.
    res.render('realTimeProducts', {
        title: 'Real Time Products',
        name: 'Gaston',
        products: productMock,
        style: 'products.css'
    });
});

module.exports = router;
