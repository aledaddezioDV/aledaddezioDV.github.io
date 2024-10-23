let mybutton = document.getElementById("boton-volver");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

 // JavaScript para controlar la clase sin-scroll en el body
 document.getElementById('modal-alumnos').addEventListener('click', function() {
  document.body.classList.add('sin-scroll');
});

document.querySelector('.cerrar').addEventListener('click', function() {
  document.body.classList.remove('sin-scroll');
});
