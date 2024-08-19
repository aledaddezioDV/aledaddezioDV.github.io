function abrirHamburguesa() {

  let menu = document.getElementById("ul-indice");
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
  } else {
      menu.style.display = "none";
  }
  }

function enviarFormulario() {

  document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("enviado-correctamente").style.display = "block";
  });
}
