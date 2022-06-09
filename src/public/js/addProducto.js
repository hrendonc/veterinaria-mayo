const items = document.getElementById('items')
const templateProductos = document.getElementById('template-productos').content
const fragment = document.createDocumentFragment()

pintarProductos()

// Consumir Productos de la API y mostrarlos
async function pintarProductos(){
    try {
        const res = await fetch('https://vetmayo.herokuapp.com/producto')
        //const res = await fetch('http://localhost:3000/producto')
        const data = await res.json()
        const producto = data.body      

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