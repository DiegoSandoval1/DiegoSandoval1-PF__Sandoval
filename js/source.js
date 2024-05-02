const confirmacionDeEdad = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¡Bienvenido HUMIE!',
      text: '¿Erez mayor e edad?',
      imageUrl: "recursos_visuales/imagenes/logo_orko.png",
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
      window.location.href = "index.html";
    }
  }
  
  confirmacionDeEdad();
  