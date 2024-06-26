//Sweet alert y pregunta por edad para entrar al sitio
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
    Swal.fire("¡Uneté al Waaaghh!!");
  } else {
    Swal.fire("¡Alejate humie!");
    setTimeout(() => {
      window.location.href = "pages/noAki.html";
    }, 1000);
  }
}

//Variables y el localStorage de JSON

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//El Apis y Fetch

// Api del clima 
const obtenerTiempoSantiago = async () => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Santiago,cl&appid=5fa11a68a777a74282cfe971b681cf2d&units=metric');
    if (!response.ok) {
      throw new Error('Error al obtener el tiempo en Zantiago');
    }
    const data = await response.json();
    return data.main.temp;
  } catch (error) {
    console.error('Error al obtener el tiempo en Zantiago:', error);
    return 'No se pudo obtener el tiempo en Zantiago.';
  } finally {
    document.getElementById("imagenDeKarga").classList.remove("mostrarGif");
  }

};

//Llamado del JSON
const obtenerTragos = async () => {
  try {
    const response = await fetch('/JSON/tragos.json');
    if (!response.ok) {
      throw new Error('Error al obtener los tragos');
    }
    const tragos = await response.json();
    mostrarTragos(tragos);
  } catch (error) {
    console.error('Error al kargar el archivo JSON:', error);
    Swal.fire({
      imageUrl: "imagenes/logo_orko.png",
      imageWidth: 140, 
      imageHeight: 200,
      title: 'Error',
      text: 'Hubo un error al kargar loz tragoz ¡Hazlo de nuevo!',
    });
  } finally {
    document.getElementById("imagenDeKarga").classList.remove("mostrarGif");
  }
};

// Tragos a elegir 

const mostrarTragos = (tragos) => {
  const cajaDeTragos = document.getElementById("tragos");
  tragos.forEach(trago => {
      const tragoElement = document.createElement("div");
      tragoElement.innerHTML = `       
      <div class="card border-5 border-warning">
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
}

// Carrito 

const agregarAlCarrito = (trago, precio) => {
  const item = { trago, precio };
  carrito.push(item);
  mostrarCarrito();
  Totales();
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
  Totales(); 
}

// Total de las compras para ser mostradas en el carro

const Totales = () => {
  let total = 0;
  if (carrito.length > 0) {
    carrito.forEach(item => {
      total += item.precio;
    });
  }

  let totalDeCosas = document.getElementById("total_a_pagar");
  totalDeCosas.innerText = `Total: $${total}`;
  
  if (total === 0) {
    totalDeCosas.innerText = `Total: $${total}`;
  }
}


// Finalizar la compra 

const finalizarCompra = () => {
  let total = 0;
  carrito.forEach(item => {
      total += item.precio;
  });
  Swal.fire(`Compra finalizada Waaaghhh!!! ¡AHORA A PAGAR!: $${total}`);
  carrito.splice(0, carrito.length);
  localStorage.setItem('carrito', JSON.stringify(carrito)); 
  mostrarCarrito();
}

// Borrar la compra

const borrarCompra = (index) => {
  carrito.splice(index, 1); 
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

//Eventlisters

//Eventlister del Fetch
document.addEventListener('DOMContentLoaded', async function() {
  confirmacionDeEdad();
  obtenerTragos();
  const temperaturaSantiago = await obtenerTiempoSantiago();
  document.getElementById('temperatura-santiago').textContent = temperaturaSantiago;
});


//Eventlister del boton de vaciar el carro
document.addEventListener("DOMContentLoaded", function() {
  const botonVaciar = document.getElementById("boton-vaciar");
  botonVaciar.addEventListener("click", borrarCompra);
});

//Eventlister del boton de compra
document.addEventListener("DOMContentLoaded", function() {
  const botonComprar = document.getElementById("boton-comprar");
  botonComprar.addEventListener("click", finalizarCompra);
});


//llamado de funciones 
mostrarTragos();



