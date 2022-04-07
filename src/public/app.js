const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const form = document.querySelector('form')
const templateCard = document.querySelector('.template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

let carrito = {}
let productos = []

document.addEventListener('DOMContentLoaded', ()=>{
    //fetchData()
    apiProductos()

    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        // console.log(carrito)
        pintarCarrito()
    }
})

// Consumir Productos de la API y guardarlos en un arreglo
const apiProductos = async ()=>{
    try {
        const res = await fetch('http://localhost:3000/producto')
        const data = await res.json()
        const mydata = data.body
        
        for(x in mydata){
            productos.push(mydata[x])
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
                id: element.codigo,
                nombre: element.nombre,
                precio: element.precio,
                cantidad: 1
            }

            if(carrito.hasOwnProperty(newProducto.id)){
                newProducto.cantidad = carrito[newProducto.id].cantidad + 1
            }

            carrito[newProducto.id] = {...newProducto}
                // console.log(carrito)
            pintarCarrito()
            return
        }        
    })
}

const pintarCarrito = ()=>{
    items.innerHTML = ''
    Object.values(carrito).forEach(producto=>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = ()=>{
    footer.innerHTML = ''
    if (Object.keys(carrito).length == 0) {
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
            `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acomulador, {cantidad}) => acomulador + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acomulador, {cantidad, precio}) => acomulador + cantidad * precio, 0)
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', ()=>{
        carrito = {}
        pintarCarrito()
    })

    const btnVender = document.getElementById('vender-carrito')
    btnVender.addEventListener('click', ()=>{
        
        const lasCabeceras = new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json'
          });
          
          
          const laURL = 'venta/myventa';
          
          const laSolicitud = new Request(
            laURL,
            {
              method: 'POST',
              headers: lasCabeceras,
              //mode: 'no-cors',
              body: JSON.stringify(carrito)
            }
          );
          
          fetch(laSolicitud)
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              // podemos ver el objeto pasado en la clave 'data'
              console.log(`El tipo de 'json.data' es: ${typeof json.data}`);
              console.log(json.data);
              // claro está que viene como cadena de texto
              // si deseamos verlo como objeto, habrá que
              // usar JSON.parse()
              let objeto = JSON.parse(json.data);
              console.log(`El tipo de 'objeto' es: ${typeof objeto}`);
              console.log(objeto);
            })
            .catch((error) => {
              console.log('Uuuuups');
              console.log(error.message);
            });
    })
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