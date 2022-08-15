const items = document.getElementById('items')
const templateUsuarios = document.getElementById('template-usuarios').content
const templateInputs = document.getElementById('template-inputs').content
const fragment = document.createDocumentFragment()

const form = document.querySelector('form')
const title = document.getElementById('exampleModalLabel')
const message = document.getElementById('message')
const tabla = document.querySelector('table')
const tituloForm = document.getElementById('tituloForm')
const btnRepintar = document.getElementById('btnRepintar')


//**** E V E N T O S ****//

document.addEventListener('DOMContentLoaded', ()=>{ 
    pintarInputs()
    pintarUsuarios()
})

// Escuchar el envio de datos del formulario y guardarlos en un objeto
form.addEventListener('submit', e=>{
    e.preventDefault()
    let data = Object.fromEntries(
        new FormData(e.target)
    )

    const btnPri = e.target.children[5].children[0].classList.contains("btn-primary")
    const btnWar = e.target.children[5].children[0].classList.contains("btn-warning")
    
    if(btnPri) addData(data)
    if(btnWar) editDataApi(data)
     
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

 btnRepintar.addEventListener('click', e =>{
    pintarInputs()
    pintarUsuarios()
    e.stopPropagation()
})


//**** F U N C I O N E S ****//

async function pintarInputs() {
    tituloForm.innerHTML = `Registrar un usuario`

    try {
        form.innerHTML = ''
        // Despues de actualizar se debe borrar el contenido
        templateInputs.getElementById('user').removeAttribute('placeholder')
        templateInputs.getElementById('email').removeAttribute('placeholder')
        templateInputs.getElementById('pass').removeAttribute('placeholder')

        templateInputs.getElementById('user')
        templateInputs.getElementById('email')
        templateInputs.getElementById('pass')
        templateInputs.getElementById('btn').setAttribute("value","Registrar Usuario")
        templateInputs.getElementById('btn').setAttribute("class","btn btn-primary btn-lg")

        const clone = templateInputs.cloneNode(true)
        fragment.appendChild(clone)
        form.appendChild(fragment) 

    } catch (error) {
        console.log(error)
    }
    //document.loginForm.codigo.focus()
}

// Consumir Productos de la API y mostrarlos
async function pintarUsuarios(){
    try {
        const res = await fetch('/user')
        const data = await res.json()
        const user = data.message    
        
        items.innerHTML = ''
        let number = 0

        for(x in user){
            number ++
            templateUsuarios.querySelector('th').textContent = number
            templateUsuarios.querySelectorAll('td')[0].textContent = user[x].user
            templateUsuarios.querySelectorAll('td')[1].textContent = user[x].email            
            templateUsuarios.querySelector('.btn-info').dataset.id = user[x]._id
            templateUsuarios.querySelector('.btn-danger').dataset.id = user[x]._id       
            templateUsuarios.querySelector('.bi-pencil').dataset.id = user[x]._id
            templateUsuarios.querySelector('.bi-trash3').dataset.id = user[x]._id
        
            const clone = templateUsuarios.cloneNode(true)
            fragment.appendChild(clone)
        }

        items.appendChild(fragment)
    }
    catch(e){ console.log(e) }
}

// Función para agregar productos
async function addData (data){
    const res = await fetch('/user', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const myData = await res.json()

    if (!res.ok) {
        title.innerHTML = `Error!`;
        message.innerHTML = `${myData.error}`;
        return
    }

    if(res.ok){
        title.innerHTML = `Usuario Agregado!`;
        message.innerHTML = `${myData.message}`;
        return
    }
}

// Función para Eliminar productos
async function deleteData (data){
    const res = await fetch(`/user/${data}`, {
        method: "DELETE"
    })
    const myData = await res.json()

    if (!res.ok) {
        title.innerHTML = `Error!`;
        message.innerHTML = `${myData.error}`;
        return
    }

    if(res.ok){
        title.innerHTML = `Usuario Eliminado!`;
        message.innerHTML = `${myData.message}`;
    }
}

// Función para crear el Formulario para Editar productos
function editData (data){
    let findData = {}
    let id = 0

    for(let i=1; i<tabla.rows.length; i++){
        id = tabla.rows[i].cells[3].firstElementChild.getAttribute('data-id')

        if(id === data){
            findData = {
                id,
                user: tabla.rows[i].cells[1].innerHTML,
                email: tabla.rows[i].cells[2].innerHTML,
            }
        break
        }   
    }

    tituloForm.innerHTML = `Actualizar un usuario`
    
    try {
        form.innerHTML = ''
        templateInputs.getElementById('id').setAttribute("value",`${id}`)
        templateInputs.getElementById('user').setAttribute("value",`${findData.user}`)
        templateInputs.getElementById('email').setAttribute("value",`${findData.email}`)
        templateInputs.getElementById('btn').setAttribute("value","Actualizar Producto")
        templateInputs.getElementById('btn').setAttribute("class","btn btn-warning btn-lg")

        templateInputs.getElementById('id').removeAttribute("required")
        templateInputs.getElementById('user').removeAttribute("required")
        templateInputs.getElementById('email').removeAttribute("required")
        
        const clone = templateInputs.cloneNode(true)
        fragment.appendChild(clone)
        form.appendChild(fragment) 

    } catch (error) {
        console.log(error)
    }

    //document.loginForm.codigo.focus()
}

// Función para Editar productos
async function editDataApi(newData){

    const res = await fetch(`/user/${newData.id}`, {
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    const myData = await res.json()

    if (!res.ok) {
        title.innerHTML = `Error!`;
        message.innerHTML = `<strong >${myData.error}`;
        return
    }

    if(res.ok){
        title.innerHTML = `Tarea realizada!`;
        message.innerHTML = `El usuario < ${myData.body.user} > se actualizó con exito. `;
        return
    }
}

        

