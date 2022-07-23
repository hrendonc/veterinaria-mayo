const form = document.querySelector('form')
const message = document.getElementById('message')

// Escuchar el envio de datos del formulario y guardarlos en un objeto
form.addEventListener('submit', e=>{
    e.preventDefault()
    let data = Object.fromEntries(
        new FormData(e.target)
    )
    
    login(data)
})

async function login (data){
    console.log(data)
    let login = await fetch("https://vetmayo.herokuapp.com/auth/signin", {
    //let login = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!login.ok) {
        message.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Error de autenticación!</strong><hr> Revisa el usuario y/o contraseña.
                <button type="button" id="btnAlert" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        return
    }
    
    window.location.assign("https://vetmayo.herokuapp.com/carrito")
    //window.location.assign("http://localhost:3000/carrito")
}