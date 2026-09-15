const productos = [
    { 
        id: 1, 
        nombre: "Tactical Throne Batman Deluxe 1/4", 
        descripcion: "Estatua a escala 1/4 de la Legacy Collection de Prime 1 Studio. Presenta a Batman en su trono táctico, con iluminación LED en monitores y base. Incluye piezas intercambiables y tiene una altura de 113 cm (44.48 pulgadas).", 
        precio: 3500000, 
        imagen: "batman-1.jpg", 
        universo: "BATMAN" 
    },
    { 
        id: 2, 
        nombre: "Batman (1989) 1/2 Scale Statue", 
        descripcion: "Estatua a escala 1/2 de la línea Masterline Museum. Representación detallada del Batman de 1989. Incluye una cabeza intercambiable con máscara extraíble y el icónico gancho (grapple gun).", 
        precio: 2200000, 
        imagen: "batman-2.jpg", 
        universo: "BATMAN" 
    },
    { 
        id: 3, 
        nombre: "Batman vs Joker Deluxe 1/3 Scale", 
        descripcion: "Estatua a escala 1/3, colaboración de Prime 1 Studio y Blitzway. Presenta a Batman luchando contra el Joker sobre una base detallada. Incluye dos cabezas de Batman y dos de Joker.", 
        precio: 1800000, 
        imagen: "batman-3.jpg", 
        universo: "BATMAN" 
    },
    { 
        id: 4, 
        nombre: "The Joker 'Say Cheese' 1/3 Statue", 
        descripcion: "Estatua de lujo a escala 1/3 del Joker de la línea Masterline Museum. El payaso del crimen posando sobre una base temática de alcantarilla. Incluye tres cabezas intercambiables y un rifle de juguete.", 
        precio: 1650000, 
        imagen: "batman-4.jpg", 
        universo: "BATMAN" 
    },
    { 
        id: 5, 
        nombre: "Goku Kaioken HQS 1/6 Edición Limitada", 
        descripcion: "Estatua de edición limitada a escala 1/6 de Goku en su forma Kaioken. Esculpida en inmersión dinámica, mide 37 cm y tiene iluminación LED para destacar el aura de energía.", 
        precio: 750000, 
        imagen: "dragonball-5.jpg", 
        universo: "DRAGONBALL" 
    },
    { 
        id: 6, 
        nombre: "Goku SSJGSSJ Gigantic Series", 
        descripcion: "Figura de la Gigantic Series de X-Plus. Presenta a Super Saiyan God Super Saiyan Goku. Mide 47 cm (18.5 pulgadas). Modelo grande y no articulado con aplicación de pintura precisa.", 
        precio: 125000, 
        imagen: "dragonball-6.jpg", 
        universo: "DRAGONBALL" 
    },
    { 
        id: 7, 
        nombre: "Goku SSJ3 FiguartsZERO Exclusiva", 
        descripcion: "Figura Exclusiva de FiguartsZERO, Super Saiyan 3 Goku. Presenta a Goku con un aura de fuego y electricidad. No articulada, incluye efectos de energía y base.", 
        precio: 100000, 
        imagen: "dragonball-7.jpg", 
        universo: "DRAGONBALL" 
    },
    { 
        id: 8, 
        nombre: "Freeza Forma 4 HQS 1/4 Estatua", 
        descripcion: "Estatua de escala 1/4 de Freeza en su 4ta Forma. Edición Limitada HQS Plus. Detallada estatua de 76 cm de alto, con resina y materiales translúcidos para los efectos de batalla.", 
        precio: 1200000, 
        imagen: "dragonball-8.jpg", 
        universo: "DRAGONBALL" 
    },
    { 
        id: 9, 
        nombre: "Darth Vader MMS510 Deluxe 1/6 Scale", 
        descripcion: "Estatua a escala 1/6 de Hot Toys, línea Movie Masterpiece Series. Basada en 'Star Wars: Revenge of the Sith'. Versión Deluxe que incluye múltiples sables de luz, cabeza de Anakin Skywalker y base temática.", 
        precio: 470000, 
        imagen: "starwars-9.jpg", 
        universo: "STARWARS" 
    },
    { 
        id: 10, 
        nombre: "Obi-Wan Kenobi Premium Format", 
        descripcion: "Estatua formato Premium de Sideshow Collectibles. Basada en 'A New Hope', la pieza muestra a Obi-Wan con túnica de tela y sable de luz activo. Escala 1/4 con 53 cm (21 pulgadas) de altura.", 
        precio: 690000, 
        imagen: "starwars-10.jpg", 
        universo: "STARWARS" 
    },
    { 
        id: 11, 
        nombre: "Darth Maul Hyperreal 1/3 Limited", 
        descripcion: "Estatua de edición limitada Hyperreal a escala 1/3. Basada en 'The Phantom Menace', con efectos de iluminación LED en la base y el sable de luz. Mide 69 cm (27 pulgadas).", 
        precio: 2100000, 
        imagen: "starwars-11.jpg", 
        universo: "STARWARS" 
    },
    { 
        id: 12, 
        nombre: "Darth Maul Epic Series 1/3 Statue", 
        descripcion: "Estatua de la Epic Series a escala 1/3. Presenta a Darth Maul blandiendo su sable de luz doble. Mide 86 cm (34 pulgadas). Base temática del templo Sith. Edición Deluxe.", 
        precio: 1450000, 
        imagen: "starwars-12.jpg", 
        universo: "STARWARS" 
    },
    { 
        id: 13, 
        nombre: "Optimus Prime Jet Convoy Edition", 
        descripcion: "Estatua a escala 1/38 de la línea Museum Masterline. Representa a Optimus Prime en su modo Jet Convoy, con más de 70 piezas intercambiables y funciones de iluminación LED. De Prime 1 Studio.", 
        precio: 4100000, 
        imagen: "transformers-13.jpg", 
        universo: "TRANSFORMERS" 
    },
    { 
        id: 14, 
        nombre: "Devastator Estatua 30'' Masterline", 
        descripcion: "Estatua masiva de Devastator de la línea Museum Masterline. Mide 76 cm (30 pulgadas). Pieza de resina altamente detallada con armadura de combate y efectos de desgaste. Es un coleccionable Premium.", 
        precio: 3400000, 
        imagen: "transformers-14.jpg", 
        universo: "TRANSFORMERS" 
    },
    { 
        id: 15, 
        nombre: "Megatron Museum Masterline DX", 
        descripcion: "Estatua de Megatron a escala 1/38, versión Deluxe. Pieza articulada con iluminación LED, armamento intercambiable (cañón de fusión) y capa de tela. De la línea Museum Masterline.", 
        precio: 2700000, 
        imagen: "transformers-15.jpg", 
        universo: "TRANSFORMERS" 
    },
    { 
        id: 16, 
        nombre: "Optimus Prime EX (ROTF) Masterline", 
        descripcion: "Estatua Premium Exclusiva de Optimus Prime (ROTF) a escala 1/38. Incluye brazos de batalla intercambiables, rifle de plasma y modo doble de hacha. Pieza basada en la película 'Revenge of the Fallen'.", 
        precio: 2500000, 
        imagen: "transformers-16.jpg", 
        universo: "TRANSFORMERS" 
    }
    ];

let carrito = []; 
const contenedorProductos = document.getElementById('grilla-productos');
const contadorCarritoDOM = document.getElementById('carrito-contador');
const listaCarritoDOM = document.getElementById('carrito-lista');
const montoTotalDOM = document.getElementById('carrito-total-monto');
const totalCantidadDOM = document.getElementById('carrito-total-cantidad');
const mensajeVacioDOM = document.getElementById('carrito-vacio-mensaje');
const modalDetalleCarrito = new bootstrap.Modal(document.getElementById('detalleCarritoModal'));
const modalDetalleProducto = new bootstrap.Modal(document.getElementById('detalleProductoModal'));

function formatearPrecio(numero) {
    let numeroString = String(Math.round(numero)); 
    let resultado = '';
    let contador = 0;

    for (let i = numeroString.length - 1; i >= 0; i--) {
        resultado = numeroString.charAt(i) + resultado; 
        contador++;

        if (contador % 3 === 0 && i !== 0) {
            resultado = '.' + resultado;
        }
    }

    return '$' + resultado;
}

document.addEventListener('DOMContentLoaded', () => {
    const muestraInicial = obtenerMuestraAleatoria(6);
    cargarCatalogo(muestraInicial); 
    
    asignarEventosFiltro();
    asignarEventosControl();
    actualizarMiniCarrito();
});

function obtenerMuestraAleatoria(n) {
    if (n >= productos.length) {
        return productos;
    }

    const productosClonados = [...productos];
    const muestra = [];

    while (muestra.length < n) {
        const indiceAleatorio = Math.floor(Math.random() * productosClonados.length);
        
        const productoSeleccionado = productosClonados.splice(indiceAleatorio, 1)[0];
        muestra.push(productoSeleccionado);
    }

    return muestra;
}

function cargarCatalogo(listaProductos) {
    contenedorProductos.innerHTML = ''; 

    if (listaProductos.length === 0) {
        contenedorProductos.innerHTML = '<p class="text-center lead text-muted">No hay figuras en este universo.</p>';
        return;
    }

    listaProductos.forEach(producto => {
        const col = document.createElement('article');
        col.className = 'col-lg-4 col-md-6 col-12 mb-4'; 

        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm bg-vault-card';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'card-img-container'; 

        const img = document.createElement('img');
        img.src = `assets/img/tienda/productos/${producto.imagen}`;
        img.className = 'card-img-top img-fluid'; 
        img.alt = producto.nombre;

        imgContainer.appendChild(img); 

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column';

        const titulo = document.createElement('h5');
        titulo.innerHTML = producto.nombre; 
        titulo.className = 'card-title';

        const descripcion = document.createElement('p');
        descripcion.innerHTML = producto.descripcion.substring(0, 60) + '...';
        descripcion.className = 'card-text small text-muted';
        
        const precio = document.createElement('p');
        precio.innerHTML = formatearPrecio(producto.precio); 
        precio.className = 'card-text fw-bold fs-5 text-neon mt-auto'; 

        const botonDetalle = document.createElement('button');
        botonDetalle.innerHTML = 'Ver Detalle';
        botonDetalle.onclick = () => mostrarDetalleProducto(producto.id);
        botonDetalle.className = 'btn btn-outline-info btn-sm mb-2';

        const botonAgregar = document.createElement('button');
        botonAgregar.innerHTML = 'Agregar al Carrito';
        botonAgregar.setAttribute('data-id', producto.id);
        botonAgregar.onclick = () => agregarAlCarrito(producto.id, producto.nombre);
        botonAgregar.className = 'btn btn-neon-fill'; 

        cardBody.appendChild(titulo);
        cardBody.appendChild(descripcion); 
        cardBody.appendChild(precio);
        cardBody.appendChild(botonDetalle);
        cardBody.appendChild(botonAgregar);
        
        card.appendChild(imgContainer); 
        card.appendChild(cardBody);
        col.appendChild(card);
        
        contenedorProductos.appendChild(col);
    });
}

function actualizarMiniCarrito() {
    contadorCarritoDOM.innerHTML = carrito.length;

    if (carrito.length === 0) {
        mensajeVacioDOM.style.display = 'block';
        listaCarritoDOM.innerHTML = '';
        montoTotalDOM.innerHTML = formatearPrecio(0); 
        totalCantidadDOM.innerHTML = '0';
    } else {
        mensajeVacioDOM.style.display = 'none';
        
        renderizarCarritoDetalle();
    }
}

function agregarAlCarrito(idProducto, nombreProducto) {
    carrito.push(idProducto);
    actualizarMiniCarrito();

    const modalConfirmacion = new bootstrap.Modal(document.getElementById('carritoModal'));
    document.getElementById('producto-agregado-nombre').innerHTML = nombreProducto;
    modalConfirmacion.show();
}

function renderizarCarritoDetalle() {
    listaCarritoDOM.innerHTML = ''; 

    const conteo = {};
    carrito.forEach(id => {
        conteo[id] = (conteo[id] || 0) + 1;
    });

    let total = 0;
    let totalItems = 0;

    for (const id in conteo) { 
        const producto = productos.find(p => p.id === parseInt(id));
        if (producto) {
            const subtotal = producto.precio * conteo[id];
            total += subtotal; 
            totalItems += conteo[id];

            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center bg-vault-light text-white mb-2';
            item.innerHTML = `
                <span>${conteo[id]}x ${producto.nombre}</span>
                <span class="text-neon fw-bold">${formatearPrecio(subtotal)}</span>
            `;
            
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-sm btn-outline-danger ms-3';
            btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
            btnEliminar.onclick = () => eliminarProducto(parseInt(id)); 
            
            item.appendChild(btnEliminar);
            listaCarritoDOM.appendChild(item);
        }
    }
    
    montoTotalDOM.innerHTML = formatearPrecio(total);
    totalCantidadDOM.innerHTML = totalItems;
}

function mostrarDetalleCarrito() {
    actualizarMiniCarrito();
    modalDetalleCarrito.show();
}

function eliminarProducto(idProducto) {
    const indice = carrito.indexOf(idProducto); 
    if (indice > -1) {
        carrito.splice(indice, 1);
        actualizarMiniCarrito();
        if (modalDetalleCarrito._isShown) {
             renderizarCarritoDetalle();
        }
    }
}

function vaciarCarrito() {
    carrito = [];
    actualizarMiniCarrito();
    renderizarCarritoDetalle(); 
}

function mostrarDetalleProducto(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    
    if (producto) {
        document.getElementById('detalleProductoModalLabel').innerHTML = producto.nombre;
        document.getElementById('detalle-imagen').src = `assets/img/tienda/productos/${producto.imagen}`; 
        document.getElementById('detalle-imagen').alt = producto.nombre;
        document.getElementById('detalle-nombre').innerHTML = producto.nombre;
        document.getElementById('detalle-universo').innerHTML = producto.universo;
        document.getElementById('detalle-descripcion').innerHTML = producto.descripcion;
        document.getElementById('detalle-precio').innerHTML = formatearPrecio(producto.precio);
        
        document.getElementById('detalle-btn-agregar').onclick = () => {
            agregarAlCarrito(producto.id, producto.nombre);
            modalDetalleProducto.hide(); 
        };
        
        modalDetalleProducto.show(); 
    }
}

function asignarEventosFiltro() {
    const botonesFiltro = document.querySelectorAll('.filtro-item');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const universo = boton.getAttribute('data-universo');
            filtrarYRenderizar(universo);
        });
    });
    
    const botonesCarrousel = document.querySelectorAll('.btn-carrousel-filtro');
    botonesCarrousel.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const universo = boton.getAttribute('data-universo');
            
            setTimeout(() => {
                filtrarYRenderizar(universo);
            }, 100); 
        });
    });
}

function filtrarYRenderizar(universo) {
    if (universo === 'TODO') {
        cargarCatalogo(productos); 
    } else {
        const productosFiltrados = productos.filter(p => p.universo === universo);
        cargarCatalogo(productosFiltrados);
    }
}

function asignarEventosControl() {
    const btnMiniCarrito = document.getElementById('btn-carrito');
    btnMiniCarrito.addEventListener('click', mostrarDetalleCarrito);

    const btnVaciar = document.getElementById('btn-vaciar-carrito');
    btnVaciar.addEventListener('click', vaciarCarrito);
}