// realTimeProducts.js
const socket = io();

function agregarProductoALaLista(nuevoProducto) {
  const productList = document.getElementById('productList');
  const newProduct = document.createElement('li');
  newProduct.id = nuevoProducto.id;
  newProduct.innerHTML = `${nuevoProducto.title} - $${nuevoProducto.price}
                          <button onclick="eliminarProducto('${nuevoProducto.id}')">Eliminar</button>`;
  productList.appendChild(newProduct);
}

function eliminarProductoDeLaLista(productId) {
  const productToRemove = document.getElementById(productId);
  if (productToRemove) {
    productToRemove.remove();
  }
}

function agregarProducto() {
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  // Lógica para enviar el nombre y precio del nuevo producto al servidor mediante websockets
  socket.emit('crearProducto', { title: productName, price: productPrice });
}

// Escuchar eventos del servidor
socket.on('productoCreado', agregarProductoALaLista);
socket.on('productoEliminado', eliminarProductoDeLaLista);
