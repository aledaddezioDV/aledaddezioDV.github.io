let valor = [true,true,true,true,true,true,true,true,true]

function mostrarMas(personaje){
    const parrafo = document.querySelector(`.selector${personaje}`)

    if (parrafo.classList.contains('oculto')){
        parrafo.classList.remove('oculto')
        parrafo.classList.add('visible')
    } else {
        parrafo.classList.remove('visible')
        parrafo.classList.add('oculto')
    }

    const boton = document.querySelector(`.boton${personaje}`)

    valor[personaje-1]? boton.innerText = "Ver menos" : boton.innerText = "Ver más"
    valor[personaje-1] = !valor[personaje-1]
}