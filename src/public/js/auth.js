const form = document.querySelector('form')

form.addEventListener('submit', e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    sendData(data)
})

function sendData (data){
    console.log(data)

    //fetch("https://vetmayo.herokuapp.com/venta", {
    fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}