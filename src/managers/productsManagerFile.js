const fs = require('fs').promises;  
const path = '../mockDB/productsList.json';

class ProductManagerFile {
  constructor() {
    this.path = path;

 
  }

readFile = async () => {
  try {
    const data = await fs.readFile(this.path, 'utf-8');  

    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return [];
  }
};


  getProducts = async () => {
    try {
      const products = await this.readFile();
      console.log(products);
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
    
      const productDb = products.find((product) => product.code === newItem.code);
      console.log(productDb);
      if (productDb) {
        return 'Se encuentra el producto';
      }

      if (products.length === 0) {
        newItem.id = 1;
        products.push(newItem);
      } else {

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
      let products = await this.readFile();  

      const productIndex = products.findIndex((product) => pid === product.id);
      if (productIndex !== -1) {
        products[productIndex] = updateToProduct;  
      }

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(pid) {
    try {
      let products = await this.readFile();
      products = products.filter((product) => pid !== product.id);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductManagerFile;
