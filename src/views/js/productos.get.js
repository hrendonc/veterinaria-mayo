let productos = []  // Guarda los productos de la API
document.addEventListener('DOMContentLoaded', ()=>{
    apiProductos()

    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})