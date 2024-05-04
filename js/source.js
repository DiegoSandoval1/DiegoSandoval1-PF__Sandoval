//hay que usar eventlistener

const tragos = [
  {
      "trago": "Zerveza Kryztal",
      "Precio": 1000,
      "foto_del_producto": "imagenes/zervezaOrka.jpg",
  },
  {
      "trago": "Vino Orko",
      "Precio": 2000,
      "foto_del_producto": "imagenes/vinoOrko.jpg",
  },
  {
      "trago": "Dakka Kola",
      "Precio": 500,
      "foto_del_producto": "imagenes/dakaKola.jpg",
  },
  {
      "trago": "Fernet Garrapato",
      "Precio": 1000,
      "foto_del_producto": "imagenes/fernetGarrapato.jpg",
  },
  {
      "trago": "Ron Orko",
      "Precio": 3000,
      "foto_del_producto": "imagenes/ronOrko.jpg",
  },
  {
      "trago": "Jack Danielz",
      "Precio": 5000,
      "foto_del_producto": "imagenes/Jack Danielz.jpg",
  },
];

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let validadorDeTragos = false;


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

// Tragos a elegir 

const mostrarTragos = () => {
  const cajaDeTragos = document.getElementById("tragos");
  tragos.forEach(trago => {
      const tragoElement = document.createElement("div");
      tragoElement.innerHTML = `
          <img src="${trago.foto_del_producto}">
          <p>${trago.trago} - Precio: $${trago.Precio}</p>
          <button onclick="agregarAlCarrito('${trago.trago}', ${trago.Precio})">Agregar al carrito</button>
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

// Finalizar la compra

const finalizarCompra = () => {
  let total = 0;
  carrito.forEach(item => {
      total += item.precio;
  });
  alert(`Compra finalizada Waaaghhh!!! ¡AHORA A PAGAR!: $${total}`);
}

const borrarCompra = () => {
  carrito.splice(0, carrito.length);
  localStorage.setItem('carrito', JSON.stringify(carrito)); 
  mostrarCarrito();
}

//Eventlisters

document.addEventListener("DOMContentLoaded", function() {
  const botonVaciar = document.getElementById("boton-vaciar");
  botonVaciar.addEventListener("click", borrarCompra);
});

document.addEventListener("DOMContentLoaded", function() {
  const botonVaciar = document.getElementById("boton-comprar");
  botonVaciar.addEventListener("click", finalizarCompra);
});


//llamado de funciones 

confirmacionDeEdad();
mostrarTragos();


