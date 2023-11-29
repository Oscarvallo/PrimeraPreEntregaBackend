const fs = require ('node:fs')
const { pid } = require('node:process')

class CartsManagerFile {
    constructor() {
        this.path = './mockDB/productsList.json'
    }
        readFile = async () => {
            try {
                const data = await fs.promise.readFile(this.path, 'utf-8')
                console.log(data)
                return JSON.parse(data)
            }
            catch (error) {
                return []
            }



        }
        getCartById = async (cid) => {
          const carts = await this.readFile()
          const cart = carts.find (carts => cart.id === cid)
          if (!cart) {
            return 'no encuentra el cart'
          }
          return cart
        }
        createCart = async () => {
            const carts = this.readFile()
            let newCart 
            if (carts.length === 0){
                newCart = {id:1, products: []}
            }
            else{
                newCart = {id: carts.length + 1, products: []} }
                carts.push(newCart)
                const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
                return results


        }
        async addProductToCart(cid, product) {
            try {
              const carts = await this.readFile();
              const cartIndex = carts.findIndex((cart) => cart.id === cid);
        
              if (cartIndex === -1) {
                return 'No se encuentra el carrito';
              }
        
              const existingProductIndex = carts[cartIndex].products.findIndex((p) => p.productId === product.productId);
        
              if (existingProductIndex !== -1) {
                carts[cartIndex].products[existingProductIndex].quantity += 1;
              } else {
                carts[cartIndex].products.push({ productId: product.productId, quantity: 1 });
              }
        
              await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
              return 'Producto agregado al carrito';
            } catch (error) {
              throw new Error(error);
            }
          }
        }
        
    module.exports = CartsManagerFile;