const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

router.get('/realtimeproducts', (req, res) => {
    // Lee el contenido del archivo productList.json
    const productListPath = path.join(__dirname, '../../mockDB/productsList.json');
    const productList = JSON.parse(fs.readFileSync(productListPath, 'utf-8'));

    // Renderiza la vista y pasa la lista de productos
    res.render('realTimeProducts', {
        title: 'Real Time Products',
        name: 'Gaston',
        style: 'products.css',
        products: productList, // Pasa la lista de productos a la vista
    });
});

module.exports = router;
