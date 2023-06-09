const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const dividir = (a, b) => a / b;
const multiplicar = (a, b) => a * b;
const iva = x => x * 0.21;

let verificador = 0;
let carrito = [];
let productoElegido;
let precioFinal;

class Producto {
  constructor(nombre, precio, id) {
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.id = id;
  }
}

const prod1 = new Producto("Grafica RTX 2080 Ti", "160000", "producto1");
const prod2 = new Producto("Mouse Logitech G203", "3400", "producto2");
const prod3 = new Producto("Monitor LG 144hz 1080p", "140000", "producto3");
const prod4 = new Producto("Auriculares Redragon Zeus X", "11000", "producto4");

let productos = [prod1, prod2, prod3, prod4];

const carritoItem = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const carritoAdd = document.querySelectorAll('.carrito-add');
const carritoVaciar = document.getElementById('carrito-clear');

let carItems = [];
let carTotal = 0;

carritoAdd.forEach(button => {
  button.addEventListener('click', addtoCarrito);
});

carritoVaciar.addEventListener('click', clearCart);

if (localStorage.getItem('carItems')) {
  carItems = JSON.parse(localStorage.getItem('carItems'));
  calculateCartTotal();
  updateCartUI();
}

async function fetchData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Error al obtener los datos del archivo JSON');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function addtoCarrito(event) {
  const button = event.target;
  const productId = button.getAttribute('id');
  const productElement = button.parentNode;
  const productPrice = Number(productElement.querySelector('span').textContent.replace('$', ''));
  const productName = productElement.querySelector('h2').textContent;
  let timerInterval

  try {
    const data = await fetchData('data.json');
    const productoChosen = {
      id: productId,
      name: productName,
      price: productPrice
    };

    carItems.push(productoChosen);
    calculateCartTotal();
    updateCartUI();
    saveCartData();
    button.classList.add('selected');
    Swal.fire({
      icon: 'success',
      title: 'Producto Añadido al carrito!',
      html: '',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo malo pasó!',
    })
  }
}

function calculateCartTotal() {
  carTotal = carItems.reduce((total, productoChosen) => total + productoChosen.price, 0);
}

function updateCartUI() {
  carritoItem.innerHTML = '';
  carritoTotal.textContent = `${carTotal.toFixed(3)}`;

  carItems.forEach(productoChosen => {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${productoChosen.name} - $${productoChosen.price.toFixed(3)}`;
    carritoItem.appendChild(cartItem);
  });
}

function clearCart() {
  carItems = [];
  carTotal = 0;
  updateCartUI();
  saveCartData();
  carritoAdd.forEach(button => {
    button.classList.remove('selected');
  });
}

function saveCartData() {
  localStorage.setItem('carItems', JSON.stringify(carItems));
}

// const numeros = [1, 2, 3, 4, 5, 6]
// const total = numeros.reduce((acumulador, elemento) => acumulador + elemento, 0)
