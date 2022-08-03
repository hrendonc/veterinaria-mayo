const items = document.getElementById('items')
const templateProductos = document.getElementById('template-productos').content
const fragment = document.createDocumentFragment()

const formAdd = document.getElementById('formAdd')

const message = document.getElementById('message')
const title = document.getElementById('exampleModalLabel')

const tabla = document.querySelector('table')


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
formAdd.addEventListener('submit', e=>{
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

    if(editar) editData(e.target.dataset.id)
    if(editarIco) editData(e.target.dataset.id)
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
        return
    }
}

// Función para Eliminar productos
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

// Función para crear el Formulario para enviar productos a editar
function editData (data){
    let findData = {}
    let id
     
    for(let i=1; i<tabla.rows.length; i++){

        id = tabla.rows[i].cells[4].lastElementChild.getAttribute("data-id")
        
        if(id === data){
            findData = {
                codigo: tabla.rows[i].cells[0].innerHTML,
                nombre: tabla.rows[i].cells[1].innerHTML,
                precio: tabla.rows[i].cells[2].lastChild.innerHTML,
                stock: tabla.rows[i].cells[3].innerHTML,
                id: tabla.rows[i].cells[4].lastElementChild.getAttribute("data-id")
            }

            title.innerHTML = `
            <strong>Actualizar un producto</strong>
                `;
            message.innerHTML = `

            <form id="formEdit">
                <div class="input-group mb-3">
                    <span class="input-group-text">Código:</span>
                    <input type="number" class="form-control" name="codigo" id="codigo" autofocus value="${findData.codigo}">
                </div>
                <div class="input-group mb-3 mt-3">
                    <span class="input-group-text">Nombre:</span>
                    <input type="text" class="form-control" name="nombre" id="nombre" value="${findData.nombre}">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Precio:</span>
                    <input type="number" class="form-control" name="precio" id="precio" value="${findData.precio}">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Stock:</span>
                    <input type="number" class="form-control" name="stock" id="stock" value="${findData.stock}">
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <input type="submit" class="btn btn-primary btn-lg" id="btn" value="Actualizar Producto">
                </div>
            </form>

            `;
        }   
    }
}

const formEdit = document.getElementById('formEdit')

// Escuchar el envio de datos del formulario y guardarlos en un objeto
formEdit.addEventListener('submit', e => {
    e.preventDefault()
    let newData = Object.fromEntries(
        new FormData(e.target)
    )

    console.log(newData)

    editDataApi(newData)
    e.stopPropagation()
})

async function editDataApi(newData){
    const res = await fetch(`/productos/${findData.id}`, {
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
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
        <strong>Tarea realizada!</strong>
            `;
        message.innerHTML = `
            <strong class="alert alert-warning" role="alert">El artículo < ${myData.body.nombre} > se actualizó con exito.</strong>
        `;
        console.log(myData.body.nombre)
        return
    }
}

        

