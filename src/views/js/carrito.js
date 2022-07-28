const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const form = document.querySelector('form')
const token = document.getElementById('token')
const message = document.getElementById('message')
const inputProducto = document.getElementById('producto')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

let carrito = {}
let productos = []  // Guarda los productos de la API
let enviarProductos = [] //Productos a enviar a la API
let objeto = {}
let myToken = token.innerHTML

document.addEventListener('DOMContentLoaded', ()=>{
    apiProductos()

    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

// Consumir Productos de la API y guardarlos en un arreglo
const apiProductos = async ()=>{
    try {
        let myObject = await fetch('/producto', {
            method: "get",
            headers:{
                'Content-Type': 'application/json',
                'auth': myToken
              }
        })

        let myData = await myObject.json();
        const dataResult = myData.message

        if(!myObject.ok) {
            message.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Error de autenticación!</strong><hr> ${myData.error}
                <button type="button" id="btnAlert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
            return
            //window.location.replace("/");
        }

        

        for(x in dataResult){
            productos.push(dataResult[x])            
        }
    }
    catch(e){ console.log(e) }

}

// Escuchar el envio de datos del formulario y guardarlos en un objeto
form.addEventListener('submit', e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    setCarrito(data)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})

const setCarrito = objeto=>{
    productos.forEach(element => {
        
        if(element.codigo == objeto.producto){  //Comprueba si lo que viene del Form se ecuentra en la API

            const newProducto = {
                id: element._id,
                codigo: element.codigo,
                nombre: element.nombre,
                precio: element.precio,
                cantidad: 1
            }

            if(carrito.hasOwnProperty(newProducto.codigo)){
                newProducto.cantidad = carrito[newProducto.codigo].cantidad + 1
            }

            carrito[newProducto.codigo] = {...newProducto}
            pintarCarrito()
            return
        }        
    })
}

const pintarCarrito = ()=>{
    items.innerHTML = ''
    inputProducto.focus()
    Object.values(carrito).forEach(producto=>{
        templateCarrito.querySelectorAll('td')[0].textContent = producto.codigo
        templateCarrito.querySelectorAll('td')[1].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[2].textContent = producto.precio
        templateCarrito.querySelectorAll('td')[3].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.codigo
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.codigo
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
    form.reset()
}

const pintarFooter = ()=>{
    footer.innerHTML = ''
    if (Object.keys(carrito).length == 0) {
        footer.innerHTML = `
            <th scope="row" colspan="6" class="text-center">Sistema listo para vender productos!</th>
            `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acomulador, {cantidad}) => acomulador + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acomulador, {cantidad, precio}) => acomulador + cantidad * precio, 0)
    templateFooter.querySelectorAll('td')[1].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', ()=>{
        carrito = {}
        pintarCarrito()   
    })
}

const btnVender = document.getElementById('vender-carrito')
    btnVender.addEventListener('click', ()=>{      
        if(Object.keys(carrito).length == 0)
        {
            footer.innerHTML = `
            <th scope="row" colspan="6" class="text-center">
                <div class="alert alert-warning d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div>
                    No se han agregado productos para vender!
                </div>
                </div>
            </th>
            
            `
            
            inputProducto.focus()
            return
        }

        for(x in carrito){
            enviarProductos.push(carrito[x])
        }

        objeto = {
            user: '6274793b080a4ddd01addc3b',
            productos: enviarProductos
        }   

        saveCarrito(objeto)
        carrito = {}
        objeto = {}
        enviarProductos = []
        pintarCarrito()
    })

async function saveCarrito (data){
    let miVenta = await fetch("/venta", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'auth': myToken
        },
        body: JSON.stringify(data)
    })

    if (!miVenta.ok) {
        window.location.replace("/")
    }

}

const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--

        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } 
        pintarCarrito()       
    }

    e.stopPropagation()
}