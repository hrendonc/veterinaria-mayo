const items = document.getElementById('items')
const templateProductos = document.getElementById('template-productos').content
const fragment = document.createDocumentFragment()

const form = document.querySelector('form')
const message = document.getElementById('message')
const title = document.getElementById('exampleModalLabel') 

document.addEventListener('DOMContentLoaded', ()=>{ 
    pintarProductos()
})

// Consumir Productos de la API y mostrarlos
async function pintarProductos(){
    try {
        const res = await fetch('/productos')
        const data = await res.json()
        const producto = data.message    
        
        items.innerHTML = ''

        for(x in producto){
            templateProductos.querySelector('th').textContent = producto[x].codigo
            templateProductos.querySelectorAll('td')[0].textContent = producto[x].nombre
            templateProductos.querySelector('span').textContent = producto[x].precio      
            templateProductos.querySelectorAll('td')[2].textContent = producto[x].stock  
            templateProductos.querySelector('.btn-info').dataset.id = producto[x]._id
            templateProductos.querySelector('.btn-danger').dataset.id = producto[x]._id       
            templateProductos.querySelector('.bi-pencil').dataset.id = producto[x]._id
            templateProductos.querySelector('.bi-trash3').dataset.id = producto[x]._id
        
            const clone = templateProductos.cloneNode(true)
            fragment.appendChild(clone)
        }

        items.appendChild(fragment)
    }
    catch(e){ console.log(e) }
}

// Escuchar el envio de datos del formulario y guardarlos en un objeto
form.addEventListener('submit', e=>{
    e.preventDefault()
    let data = Object.fromEntries(
        new FormData(e.target)
    )
     
    addData(data)
    e.stopPropagation()
})

// Escuchar el evento de acciones y enviarlo a la opción correspondiente
items.addEventListener('click', e =>{
    let editar = e.target.classList.contains('btn-info')
    let editarIco = e.target.classList.contains('bi-pencil')
    let eliminar = e.target.classList.contains('btn-danger')
    let eliminarIco = e.target.classList.contains('bi-trash3')

    if(editar) console.log('Editar: ', e.target.dataset.id)
    if(editarIco) console.log('EditarIco: ', e.target.dataset.id)
    if(eliminar) deleteData(e.target.dataset.id)
    if(eliminarIco) deleteData(e.target.dataset.id)

    e.stopPropagation()
})

// Función para agregar productos
async function addData (data){
    const res = await fetch('/productos', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const myData = await res.json()

    if (!res.ok) {
        title.innerHTML = `
        <strong>Error!</strong>
            `;
        message.innerHTML = `
        <strong class="alert alert-warning" role="alert">${myData.error}</strong>
            `;
        return
    }

    if(res.ok){
        title.innerHTML = `
        <strong>Producto Agregado!</strong>
            `;
        message.innerHTML = `
            <strong class="alert alert-warning" role="alert">El producto ${myData.body.nombre} ha sido registrado correctamente!</strong>
        `;
    }
}

// Función para eliminar productos
async function deleteData (data){
    const res = await fetch(`/productos/${data}`, {
        method: "DELETE"
    })
    const myData = await res.json()

    if (!res.ok) {
        title.innerHTML = `
        <strong>Error!</strong>
            `;
        message.innerHTML = `
        <strong class="alert alert-warning" role="alert">${myData.error}</strong>
            `;
        return
    }

    if(res.ok){
        title.innerHTML = `
        <strong>Producto Eliminado!</strong>
            `;
        message.innerHTML = `
            <strong class="alert alert-warning" role="alert">${myData.message}</strong>
        `;
    }
}

