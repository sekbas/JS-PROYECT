const sumar = (a,b) => a + b
const restar = (a,b) => a - b
const dividir = (a,b) => a / b
const  multiplicar = (a,b) => a * b
const iva = x => x * 0.21
let verificador = 0
let carrito = [];
let productoElegido
let precioFinal
class Producto {
    constructor(nombre, precio, id) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
        this.id = id;
    }
}
 const prod1 = new Producto("Grafica RTX 2080 Ti","160000", "producto1");
 const prod2 = new Producto("Mouse Logitech G203","3400", "producto2");
 const prod3 = new Producto("Monitor LG 144hz 1080p","140000", "producto3")
 const prod4 = new Producto("Auriculares Redragon Zeus X","11000", "producto4")
 let productos = [prod1,prod2,prod3,prod4]
// function finalizarCompra(){
//     let finCompra = prompt("El precio total de los productos es: " + precioFinal + "\n" + "Quiere finalizar la compra?" + "\n" + "Por favor responda con SI o NO")
//     if(finCompra == "Si" || finCompra == "si" || finCompra == "sI"){
//         finCompra = "SI"
//     }
//     if(finCompra == "No" || finCompra == "no" || finCompra == "nO"){
//         finCompra = "NO"
//     }
//     switch (finCompra){
//         case "NO" :
//         alert("Su compra ha sido cancelada con exito");
//         break;
//         case "SI" :
//             alert("Su compra ha sido realizada!");
//             break;
//         default : alert("Ingrese un dato Valido Por favor")

//             finCompra = String(prompt("El precio total de los productos es: " + precioFinal + "\n" + "Quiere finalizar la compra?" + "\n" + "Por favor responda con SI o NO"))
//         break;
//     }
// }
// function cambiarValor1(){
//     productoElegido = 160000
//     precioFinal = sumar(productoElegido, iva(productoElegido))
//     mensajeCompra()
// }
// function cambiarValor2(){
//     productoElegido = 3400
//     precioFinal = sumar(productoElegido, iva(productoElegido))
//     mensajeCompra()
// }
// function cambiarValor3(){
//     productoElegido = 140000
//     precioFinal = sumar(productoElegido, iva(productoElegido))
//     mensajeCompra()
// }
// function cambiarValor4(){
//     productoElegido = 11000
//     precioFinal = sumar(productoElegido, iva(productoElegido))
//     mensajeCompra()
// }
// document.getElementById('botonprod1').addEventListener('click', cambiarValor1);
// document.getElementById('botonprod2').addEventListener('click', cambiarValor2);
// document.getElementById('botonprod3').addEventListener('click', cambiarValor3);
// document.getElementById('botonprod4').addEventListener('click', cambiarValor4);

// if(!isNaN(precioFinal)){
//     mensajeCompra()
// }
// function compraFinal(){
//     // precioFinal = carrito[0]
//     for(let i = 0; i<carrito.length; i++){
//         precioFinal = precioFinal + carrito[i]
//     }
//     mensajeCompra();
// }
// function mensajeCompra(){
//  let decisionFinal = String(prompt("El precio Final de la compra es: " + precioFinal + "\n" + "Quiere seguir comprando?" + "\n" + "Por favor responda con SI o NO"))
//  if(decisionFinal == "Si" || decisionFinal == "si" || decisionFinal == "sI"){
//     decisionFinal = "SI"
// }
// if(decisionFinal == "No" || decisionFinal == "no" || decisionFinal == "nO"){
//     decisionFinal = "NO"
// }
// switch (decisionFinal){
//     case "NO":
//         alert("Procederemos a darle el precio final de la compra");
//         finalizarCompra();
//         break;
//     case "SI":
//         alert("Siga con su compra!");
//         carrito.push(precioFinal)
//         compraFinal()
//         break;
//     default: 
//         alert("Ingrese un dato Valido Por favor")
//         decisionFinal = String(prompt("El precio Final de la compra es: " + precioFinal + "\n" + "Quiere seguir comprando?"))
//         break;
// }
// }
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


function addtoCarrito(event) {
  const button = event.target;
  const productId = button.getAttribute('id');
  const productElement = button.parentNode;
  const productPrice = Number(productElement.querySelector('span').textContent.replace('$', ''));
  console.log(productPrice)
  const productName = productElement.querySelector('h2').textContent;

  const productoChosen = {
    id: productId,
    name: productName,
    price: productPrice
  }

  carItems.push(productoChosen);
  calculateCartTotal();
  updateCartUI();
  saveCartData();
  button.classList.add('selected');
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
