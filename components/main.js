let autos

fetch('components/autos.json')
    .then(response => response.json())
    .then(data => {
        autos = data
        cargarElementosDelAlmacenamientoLocal()
    })

function toggleSlideOver() {
    document.getElementById('slideover-container').classList.toggle('invisible')
    document.getElementById('slideover-bg').classList.toggle('opacity-0')
    document.getElementById('slideover-bg').classList.toggle('opacity-50')
    document.getElementById('slideover').classList.toggle('translate-x-full')
}

const botonCarrito = document.querySelector('.boton-carrito')
botonCarrito.addEventListener('click', toggleSlideOver)


function closeSlideOver() {
    const slideoverContainer = document.getElementById('slideover-container')
    const slideover = document.getElementById('slideover')

    slideoverContainer.classList.add('invisible')
    slideover.classList.add('translate-x-full')
}

const slideoverBg = document.getElementById('slideover-bg')
slideoverBg.addEventListener('click', closeSlideOver)

const btnCerrar = document.getElementById('btnCerrar')
btnCerrar.addEventListener('click', closeSlideOver)


function crearElementoCarrito(ID) {
    const auto = conseguirInformacionAuto(ID)
    const item = document.createElement('div')
    item.innerHTML = `
        <div class="cart-item">
            <img src="./public/${auto.id}.avif" data-id="${auto.id}" alt="${auto.nombre}">
            <div class="item-details mb-2 flex flex-col items-center justify-center">
                <p class="item-name font-semibold text-gray-900">${auto.nombre}</p>
                <p class="item-price text-gray-900">${auto.precio}</p>
                <p class="item-id hidden">${auto.id}</p>
                <div class="mb-2 gap-2 m-3 flex items-center justify-center">
                    <button class="btnEliminar px-4 py-2 bg-red-500 text-white text-xs">Eliminar</button>
                    <button class="btnComprar px-4 py-2 bg-blue-500 text-white text-xs">Comprar</button>
                </div>
            </div>
        </div>
    `

    const deleteButton = item.querySelector('.btnEliminar')
    deleteButton.addEventListener('click', eliminarDelCarrito)
    configurarBotonesComprar()
    return item
}

function conseguirInformacionAuto(ID) {
    return autos.find(producto => producto.id === ID);
}

function conseguirID(elemento) {
    return elemento.getAttribute('data-id')
}

function agregarAlCarrito(elemento) {
    const cartItemsContainer = document.querySelector('.cart-items')
    cartItemsContainer.innerHTML = '';
    const ID = conseguirID(elemento)
    const item = crearElementoCarrito(ID)
    cartItemsContainer.appendChild(item)
    configurarBotonesComprar()
    actualizarAlmacenamientoLocal()
}

const agregarCarritoButtons = document.querySelectorAll('.agregar-btn')

agregarCarritoButtons.forEach(button => {
    button.addEventListener('click', () => {
        agregarAlCarrito(button)
    })
})

function agregarAlCarritoPw(elemento) {
    const cartItemsContainer = document.querySelector('.cart-items-pw')
    const ID = conseguirID(elemento)
    const item = crearElementoCarrito(ID)
    cartItemsContainer.appendChild(item)
    configurarBotonesComprar()
    actualizarAlmacenamientoLocal()
}

const powerwallButton = document.querySelectorAll('.agregar-btn-powerwall')

powerwallButton.forEach(button => {
    button.addEventListener('click', () => {
        agregarAlCarritoPw(button)
    })
})

function actualizarAlmacenamientoLocal() {
    const cartItems = document.querySelectorAll('.cart-item')
    const cartData = []

    cartItems.forEach(item => {
        const id = item.querySelector('.item-id').textContent
        const nombre = item.querySelector('.item-name').textContent
        const precio = item.querySelector('.item-price').textContent
        cartData.push({ id, nombre, precio })
    })
    localStorage.setItem('cart', JSON.stringify(cartData))
}


function eliminarDelCarrito(event) {
    const cartItem = event.target.closest('.cart-item')
    if (cartItem) {
        cartItem.remove()
        actualizarAlmacenamientoLocal()
    }

}
const deleteButtons = document.querySelectorAll('.btnEliminar')
deleteButtons.forEach(button => {
    button.addEventListener('click', eliminarDelCarrito)
})


function configurarBotonesComprar() {
    const buyButtons = document.querySelectorAll('.btnComprar')
    buyButtons.forEach(button => {
        button.addEventListener('click', eliminarDelCarrito)
        button.addEventListener('click', () => {
            Swal.fire({
                icon: 'success',
                title: 'Listo!',
                text: 'Tu compra fue realizada!',
                timer: 3000,
                timerProgressBar: true
            })
        })
    })
}

configurarBotonesComprar()


function cargarElementosDelAlmacenamientoLocal() {
    const cartData = JSON.parse(localStorage.getItem('cart'))
    if (cartData) {
        const cartItemsContainer = document.querySelector('.cart-items')
        cartData.forEach(item => {
            const elemento = document.createElement('div')
            elemento.setAttribute('data-id', item.id)
            elemento.setAttribute('data-nombre', item.nombre)
            elemento.setAttribute('data-precio', item.precio)
            const ID = conseguirID(elemento)
            const elementoCarrito = crearElementoCarrito(ID)
            cartItemsContainer.appendChild(elementoCarrito)
        })
    }
}

function agregarElementoDesdeAlmacenamiento(elemento) {
    const cartItemsContainer = document.querySelector('.cart-items')
    const ID = conseguirID(elemento)
    const item = crearElementoCarrito(ID)
    cartItemsContainer.appendChild(item)
    actualizarAlmacenamientoLocal()
}

const agregarAlCarritoBtn = document.querySelectorAll('.agregar-btn, .agregar-btn-powerwall')

agregarAlCarritoBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        btn.classList.add('bg-green-500')
        btn.classList.add('border-green-500')
        setTimeout(() => {
            btn.classList.remove('bg-green-500')
            btn.classList.remove('border-green-500')
        }, 500)
    })
})