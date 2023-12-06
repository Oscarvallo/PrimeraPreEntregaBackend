const { Router } = require('express');
const CartsManagerFile = require('../../managers/cartsManager');
const cartsService = new CartsManagerFile();
const router = Router();

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsService.getCartById(parseFloat(cid));
        res.send({
            status: 'success',
            payload: cart
        });  
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor'); 
    }
});

module.exports = router;
