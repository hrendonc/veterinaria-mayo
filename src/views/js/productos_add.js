const items = document.getElementById('items')
const templateProductos = document.getElementById('template-productos').content
const fragment = document.createDocumentFragment()

const form = document.querySelector('form')
const message = document.getElementById('message') 

document.addEventListener('DOMContentLoaded', ()=>{
    if(message.innerHTML != ''){
        message.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>${message.innerHTML}</strong>
                    <button type="button" id="btnAlert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `;
    }
    pintarProductos()
})



// Escuchar el envio de datos del formulario y guardarlos en un objeto

form.addEventListener('submit', e=>{
    e.preventDefault()
    let data = Object.fromEntries(
        new FormData(e.target)
    )
    
    addData(data)
})

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
        message.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Error de autenticación!</strong><hr> ${myData.error}
                <button type="button" id="btnAlert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        return
    }
        
    //window.location.assign("/productos_fe")
}

// Consumir Productos de la API y mostrarlos
async function pintarProductos(){
    try {
        const res = await fetch('/productos')
        const data = await res.json()
        const producto = data.message    
        
        console.log(data.message)

        items.innerHTML = ''

        for(x in producto){
            templateProductos.querySelector('th').textContent = producto[x].codigo
            templateProductos.querySelectorAll('td')[0].textContent = producto[x].nombre
            templateProductos.querySelector('span').textContent = producto[x].precio      
            templateProductos.querySelectorAll('td')[2].textContent = producto[x].stock  
            templateProductos.querySelector('.btn-info').dataset.id = producto[x]._id
            templateProductos.querySelector('.btn-danger').dataset.id = producto[x]._id       
        
            const clone = templateProductos.cloneNode(true)
            fragment.appendChild(clone)
        }

        items.appendChild(fragment)
    }
    catch(e){ console.log(e) }
}