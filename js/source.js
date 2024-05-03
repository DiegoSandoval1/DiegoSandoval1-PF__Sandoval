const tragos = [
  {
      "trago": "Zerveza Kryztal",
      "Precio": 1000,
  },
  {
      "trago": "Vino Orko",
      "Precio": 2000,
  },
  {
      "trago": "Dakka Kola",
      "Precio": 500,
  },
  {
      "trago": "Fernet Garrapato",
      "Precio": 1000,
  },
  {
      "trago": "Ron Orko",
      "Precio": 3000,
  },
  {
      "trago": "Jack Danielz",
      "Precio": 5000,
  },
];

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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



//Orden de las funciones
confirmacionDeEdad();

