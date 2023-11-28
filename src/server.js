   const express = require ('express')
   const productsRouter = require ('./routers/products.router')

   const app = express ()
   
app.use(express.json())
app.use(express.urlencoded({extended: true}))



   //http:localhost:8080
   app.use ('/api/products', productsRouter)
app.use('/api/carts', (req, res) => {
  res.send('Carts endpoint');
});
   app.listen(8080, () => {
    console.log ('corriendo en el puerto 8080')
   })