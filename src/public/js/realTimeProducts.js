const socket = io();

function agregarProductoALaLista(nuevoProducto) {
  const productList = document.getElementById('productList');

  // Verificar si el producto ya está en la lista
  const existingProduct = document.querySelector(`#productList li[id="${nuevoProducto.id}"]`);
  if (existingProduct) {
    console.log('El producto ya está en la lista');
    return;
  }

  // Si no existe, agregar el nuevo producto
  const newProduct = document.createElement('li');
  newProduct.id = nuevoProducto.id; // Usar el ID del producto como ID
  newProduct.innerHTML = `${nuevoProducto.title} - $${nuevoProducto.price}
                          <button onclick="eliminarProducto('${nuevoProducto.id}')">Eliminar</button>`;
  productList.appendChild(newProduct);
}


function eliminarProductoDeLaLista(productId) {
  console.log('Evento productoEliminado recibido:', productId);
  const productToRemove = document.getElementById(productId);
  if (productToRemove) {
    productToRemove.remove();
  }
}

// Modifica tu función agregarProducto en realTimeProducts.js
// Modifica tu función agregarProducto en realTimeProducts.js
function agregarProducto() {
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;

  // Validar que los campos no estén vacíos
  if (!productName || !productPrice) {
    console.log('Por favor, completa todos los campos.');
    return;
  }

  const productId = generateUniqueId();

  console.log('Antes de validar existencia:', productId);

  // Validar si el producto ya está en la lista
  const existingProduct = document.querySelector(`#productList li[id="${productId}"]`);
  if (existingProduct) {
    console.log('El producto ya está en la lista');
    return;
  }

  console.log('Después de validar existencia:', productId);

  // Enviar el evento al servidor para agregar un producto
  socket.emit('crearProducto', { id: productId, title: productName, price: productPrice });
}



function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}




function eliminarProducto(productId) {
  // Enviar el evento al servidor para eliminar un producto
  socket.emit('eliminarProducto', productId);
}

socket.on('productoCreado', agregarProductoALaLista);
socket.on('productoEliminado', eliminarProductoDeLaLista);
