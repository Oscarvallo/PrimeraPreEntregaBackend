const fs = require('fs').promises;  
const path = './src/mockDB/ProductsOne.json';

class ProductManagerFile {
  constructor() {
    this.path = path;
  }

  readFile = async () => {
    try {
      const data = await fs.readFile(this.path, 'utf-8');  
      console.log(data);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };

  getProducts = async () => {
    try {
      const products = await this.readFile();
      return products;
    } catch (error) {
      return 'No hay productos';
    }
  };
  

  getProduct = async (id) => {
    try {
      const products = await this.readFile();
      if (!products) return 'No hay productos';
      return products.find((product) => product.id === id);
    } catch (error) {
      return new Error(error);
    }
  };

  addProduct = async (newItem) => {
    try {
      let products = await this.readFile();
      // Si existe, no lo voy a crear
      const productDb = products.find((product) => product.code === newItem.code);
      console.log(productDb);
      if (productDb) {
        return 'Se encuentra el producto';
      }

      if (products.length === 0) {
        newItem.id = 1;
        products.push(newItem);
      } else {
        //products = [...products, { ...newItem, id: products[products.length - 1].id + 1 }];
      products = [...products, {...newItem, id:products.length + 1}]
    }

      await fs.promise.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');  
      return 'Producto agregado';
    } catch (error) {
      return new Error(error);
    }
  };
  async update(pid, updateToProduct) {
    try {
      let products = await this.readFile();  // Cambiado let product a let products

      const productIndex = products.findIndex((product) => pid === product.id);
      if (productIndex !== -1) {
        products[productIndex] = updateToProduct;  // Cambiado producIndex a productIndex
      }

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductManagerFile;
