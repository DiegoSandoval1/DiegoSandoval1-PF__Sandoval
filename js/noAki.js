//alert del noAki.html

const noAki = async () => {

    setTimeout(() => {
        Swal.fire({
        title: "¿Kierez volver a intentarlo?",
        confirmButtonColor: '#18392B',
        showClass: {
            popup: `
            animate__animated
            animate__fadeInRight
            animate__slower
            `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__slower
            `
        }
        }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "../index.html";
        } else {
            Swal.fire("¡Adioz!");
        }
        });
    }, 1000);
  
}

noAki();
  