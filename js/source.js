//Sweet alert y pregunta por edad
const confirmacionDeEdad = async () => {
  const { isConfirmed } = await Swal.fire({
    title: '¡Bienvenido HUMIE!',
    text: '¿Erez mayor e edad?',
    imageUrl: "imagenes/logo_orko.png",
    imageWidth: 140, 
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: '#18392B',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, soy mayor de edad',
    cancelButtonText: 'No',
  });

  if (isConfirmed) {
    Swal.fire("¡Uneté al Waaaghh!!");;
  } else {
    Swal.fire("¡Alejate humie!");
    setTimeout(() => {
      window.location.href = "pages/noAki.html";
    }, 1000);
  }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let validadorDeTragos = false;

const obtenerTragos = async () => {
  try {
    const response = await fetch('./tragos.json');
    if (!response.ok) {
      throw new Error('Error al obtener los tragos');
    }
    const tragos = await response.json();
    mostrarTragos(tragos);
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
};

// Tragos a elegir 

const mostrarTragos = (tragos) => {
  const cajaDeTragos = document.getElementById("tragos");
  tragos.forEach(trago => {
      const tragoElement = document.createElement("div");
      tragoElement.innerHTML = `       
      <div class="card">
      <img class="card-img-top mx-auto" src="${trago.foto_del_producto}">
      <div class="card-body">
        <h5 class="card-title">${trago.trago}</h5>
        Precio: $${trago.Precio}</p>
        <button onclick="agregarAlCarrito('${trago.trago}', ${trago.Precio})">Agregar al carrito</button>
      </div>
    </div>
      `;
      cajaDeTragos.appendChild(tragoElement);
      validadorDeTragos = true;
  });
  console.log(validadorDeTragos);
  if (validadorDeTragos == true){
    const botonTrue = document.createElement("div");
  }
}

// Carrito 

const agregarAlCarrito = (trago, precio) => {
  const item = { trago, precio };
  carrito.push(item);
  mostrarCarrito();
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

const mostrarCarrito = () => {
  const carro = document.getElementById("carro");
  carro.innerHTML = "";
  carrito.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.innerText = `${item.trago} - Precio: $${item.precio}`;
      carro.appendChild(itemElement);
  });
}

// Finalizar y borrar la compra

const finalizarCompra = () => {
  let total = 0;
  carrito.forEach(item => {
      total += item.precio;
  });
  Swal.fire(`Compra finalizada Waaaghhh!!! ¡AHORA A PAGAR!: $${total}`);
}

const borrarCompra = () => {
  carrito.splice(0, carrito.length);
  localStorage.setItem('carrito', JSON.stringify(carrito)); 
  mostrarCarrito();
}

//Eventlisters

document.addEventListener('DOMContentLoaded', function() {
  confirmacionDeEdad();
  obtenerTragos();
});

document.addEventListener("DOMContentLoaded", function() {
  const botonVaciar = document.getElementById("boton-vaciar");
  botonVaciar.addEventListener("click", borrarCompra);
});

document.addEventListener("DOMContentLoaded", function() {
  const botonVaciar = document.getElementById("boton-comprar");
  botonVaciar.addEventListener("click", finalizarCompra);
});


//llamado de funciones 
mostrarTragos();


