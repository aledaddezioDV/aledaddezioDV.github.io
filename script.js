function inicializarBotonFiltros() {
    const boton = document.getElementById("botonFiltros");
    const contenedor = document.getElementById("contenedorFiltros");
    const texto = document.getElementById("textoBotonFiltros");
    if (!boton || !contenedor || !texto) return;
    boton.addEventListener("click", () => {
        const visibles = contenedor.classList.toggle("filtros-visibles");
        boton.setAttribute("aria-expanded", visibles);
        texto.textContent = visibles ? "Ocultar filtros" : "Filtros";
    });
}
inicializarBotonFiltros();