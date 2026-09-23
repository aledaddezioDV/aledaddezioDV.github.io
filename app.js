// CONFIGURACIÓN
const ARCHIVO_CATALOGO = "catalogo.json";
// =========================================================
// ESTADO
let proyectos = [];
let filtros = {
    carrera: "",
    materia: "",
    anio: "",
    cuatrimestre: "",
    comision: "",
    trabajo: "",
    busqueda: "",
};
const CONFIG_FILTROS = [
    {
        id: "filtroCarrera",
        propiedad: "carrera",
        todos: "Todas",
    },
    {
        id: "filtroMateria",
        propiedad: "materia",
        todos: "Todas",
    },
    {
        id: "filtroAnio",
        propiedad: "anio",
        todos: "Todos",
    },
    {
        id: "filtroCuatrimestre",
        propiedad: "cuatrimestre",
        todos: "Todos",
    },
    {
        id: "filtroComision",
        propiedad: "comision",
        todos: "Todas",
    },
    {
        id: "filtroTrabajo",
        propiedad: "trabajo",
        todos: "Todos",
    },
];
// =========================================================
// INICIALIZAR
document.addEventListener("DOMContentLoaded", iniciar);
async function iniciar() {
    try {
        await cargarCatalogo();
        inicializarFiltros();
        configurarEventos();
        inicializarBotonFiltros();
    } catch (error) {
        console.error("Error al iniciar el catálogo:", error);
        mostrarError("No se pudo cargar el catálogo de proyectos.");
    }
}
// =========================================================
// CARGAR CATALOGO.JSON
async function cargarCatalogo() {
    const respuesta = await fetch(`${ARCHIVO_CATALOGO}?t=${Date.now()}`);
    if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    // -----------------------------------------------------
    // Solo proyectos visibles
    proyectos = Array.isArray(datos.proyectos) ? datos.proyectos.filter((proyecto) => proyecto.visible !== false) : [];
    console.log(`Catálogo cargado: ${proyectos.length} proyectos`);
}
// =========================================================
// FILTROS
function inicializarFiltros() {
    cargarFiltrosDesdeURL();
    actualizarFiltros();
    actualizarEstadoVisualFiltros();
    actualizarBotonFiltros();
    document.getElementById("filtroCarrera").value = filtros.carrera;
    document.getElementById("filtroMateria").value = filtros.materia;
    document.getElementById("filtroAnio").value = filtros.anio;
    document.getElementById("filtroCuatrimestre").value = filtros.cuatrimestre;
    document.getElementById("filtroComision").value = filtros.comision;
    document.getElementById("filtroTrabajo").value = filtros.trabajo;
    document.getElementById("buscador").value = filtros.busqueda;
    actualizarFiltros();
    mostrarFiltrosActivos();
    renderizarProyectos();
}
function actualizarFiltros() {
    CONFIG_FILTROS.forEach((filtro) => {
        actualizarSelect(filtro.id, filtro.propiedad, filtro.todos);
    });
}
function obtenerProyectosCompatibles(ignorarFiltro = null) {
    return proyectos.filter((proyecto) => {
        // -------------------------------------------------
        // Carrera
        if (ignorarFiltro !== "carrera" && filtros.carrera && String(proyecto.carrera) !== filtros.carrera) {
            return false;
        }
        // -------------------------------------------------
        // Materia
        if (ignorarFiltro !== "materia" && filtros.materia && String(proyecto.materia) !== filtros.materia) {
            return false;
        }
        // -------------------------------------------------
        // Año
        if (ignorarFiltro !== "anio" && filtros.anio && String(proyecto.anio) !== filtros.anio) {
            return false;
        }
        // -------------------------------------------------
        // Cuatrimestre
        if (ignorarFiltro !== "cuatrimestre" && filtros.cuatrimestre && String(proyecto.cuatrimestre) !== filtros.cuatrimestre) {
            return false;
        }
        // -------------------------------------------------
        // Comisión
        if (ignorarFiltro !== "comision" && filtros.comision && String(proyecto.comision) !== filtros.comision) {
            return false;
        }
        // -------------------------------------------------
        // Trabajo
        if (ignorarFiltro !== "trabajo" && filtros.trabajo && String(proyecto.trabajo) !== filtros.trabajo) {
            return false;
        }
        return true;
    });
}
function contarPorPropiedad(proyectos, propiedad) {
    const cantidades = {};
    proyectos.forEach((proyecto) => {
        const valor = proyecto[propiedad];
        if (valor === null || valor === undefined || valor === "") {
            return;
        }
        const clave = String(valor);
        if (!cantidades[clave]) {
            cantidades[clave] = 0;
        }
        cantidades[clave]++;
    });
    return cantidades;
}
function actualizarSelect(id, propiedad, textoTodos) {
    const select = document.getElementById(id);
    if (!select) {
        return;
    }
    const valorActual = filtros[propiedad];
    // -----------------------------------------------------
    // Obtener proyectos compatibles ignorando ESTE filtro
    const proyectosCompatibles = obtenerProyectosCompatibles(propiedad);
    // -----------------------------------------------------
    // Contar proyectos por valor
    const cantidades = contarPorPropiedad(proyectosCompatibles, propiedad);
    // -----------------------------------------------------
    // Valores disponibles
    const valores = [
        ...new Set(
            proyectosCompatibles
                .map((proyecto) => proyecto[propiedad])
                .filter((valor) => valor !== null && valor !== undefined && valor !== "")
                .map((valor) => String(valor)),
        ),
    ];
    valores.sort((a, b) =>
        a.localeCompare(b, "es", {
            numeric: true,
        }),
    );
    // -----------------------------------------------------
    // Reconstruir SELECT
    select.innerHTML = "";
    // -----------------------------------------------------
    // Opción TODOS
    const cantidadTotal = proyectosCompatibles.length;
    const opcionTodos = document.createElement("option");
    opcionTodos.value = "";
    opcionTodos.textContent = `${textoTodos} (${cantidadTotal})`;
    select.appendChild(opcionTodos);
    // -----------------------------------------------------
    // Opciones
    valores.forEach((valor) => {
        const cantidad = cantidades[valor] || 0;
        const option = document.createElement("option");
        option.value = valor;
        option.textContent = `${formatearValorFiltro(propiedad, valor)} (${cantidad})`;
        // -------------------------------------------------
        // Deshabilitar opciones sin resultados
        option.disabled = cantidad === 0;
        select.appendChild(option);
    });
    // -----------------------------------------------------
    // Mantener selección actual
    if (valorActual && valores.includes(valorActual)) {
        select.value = valorActual;
    } else {
        select.value = "";
        filtros[propiedad] = "";
    }
}
function mostrarFiltrosActivos() {
    const contenedor = document.getElementById("filtrosActivos");
    const filtrosActivos = [];
    if (filtros.carrera) {
        filtrosActivos.push(formatearValorFiltro("carrera", filtros.carrera));
    }
    if (filtros.materia) {
        filtrosActivos.push(formatearValorFiltro("materia", filtros.materia));
    }
    if (filtros.anio) {
        filtrosActivos.push(filtros.anio);
    }
    if (filtros.cuatrimestre) {
        filtrosActivos.push(`${filtros.cuatrimestre}° Cuatrimestre`);
    }
    if (filtros.comision) {
        filtrosActivos.push(filtros.comision);
    }
    if (filtros.trabajo) {
        filtrosActivos.push(formatearValorFiltro("trabajo", filtros.trabajo));
    }
    if (filtrosActivos.length === 0) {
        contenedor.textContent = "";
        return;
    }
    contenedor.textContent = filtrosActivos.join(" · ");
}
function actualizarURL() {
    const parametros = new URLSearchParams();
    if (filtros.carrera) {
        parametros.set("carrera", filtros.carrera);
    }
    if (filtros.materia) {
        parametros.set("materia", filtros.materia);
    }
    if (filtros.anio) {
        parametros.set("anio", filtros.anio);
    }
    if (filtros.cuatrimestre) {
        parametros.set("cuatrimestre", filtros.cuatrimestre);
    }
    if (filtros.comision) {
        parametros.set("comision", filtros.comision);
    }
    if (filtros.trabajo) {
        parametros.set("trabajo", filtros.trabajo);
    }
    if (filtros.busqueda) {
        parametros.set("busqueda", filtros.busqueda);
    }
    const nuevaURL = parametros.toString() ? `${window.location.pathname}?${parametros.toString()}` : window.location.pathname;
    window.history.replaceState({}, "", nuevaURL);
}
function cargarFiltrosDesdeURL() {
    const parametros = new URLSearchParams(window.location.search);
    filtros.carrera = parametros.get("carrera") || "";
    filtros.materia = parametros.get("materia") || "";
    filtros.anio = parametros.get("anio") || "";
    filtros.cuatrimestre = parametros.get("cuatrimestre") || "";
    filtros.comision = parametros.get("comision") || "";
    filtros.trabajo = parametros.get("trabajo") || "";
    filtros.busqueda = parametros.get("busqueda") || "";
}
function formatearValorFiltro(propiedad, valor) {
    if (propiedad === "trabajo") {
        return formatearNombreTrabajo(valor);
    }
    return valor;
}
function formatearNombreTrabajo(texto) {
    if (!texto) {
        return "";
    }

    return String(texto)
        .replace(/[_-]+/g, " ")
        .toLowerCase()
        .replace(/\b\p{L}/gu, (letra) => letra.toUpperCase());
}
// =========================================================
// EVENTOS
function configurarEventos() {
    const filtrosHTML = document.querySelectorAll(".filtro");
    filtrosHTML.forEach((filtro) => {
        filtro.addEventListener("change", manejarCambioFiltro);
    });
    const buscador = document.getElementById("buscador");
    if (buscador) {
        buscador.addEventListener("input", manejarBusqueda);
    }
    const botonLimpiar = document.getElementById("limpiarFiltros");
    if (botonLimpiar) {
        botonLimpiar.addEventListener("click", limpiarFiltros);
    }
}
function manejarBusqueda(evento) {
    filtros.busqueda = evento.target.value;
    renderizarProyectos();
    actualizarURL();
}
function actualizarEstadoVisualFiltros() {
    CONFIG_FILTROS.forEach((filtro) => {
        const select = document.getElementById(filtro.id);
        if (!select) {
            return;
        }
        select.classList.toggle("filtro-activo", filtros[filtro.propiedad] !== "");
    });
}
function manejarCambioFiltro(evento) {
    const id = evento.target.id;
    const configuracion = CONFIG_FILTROS.find((filtro) => filtro.id === id);
    if (!configuracion) {
        return;
    }
    filtros[configuracion.propiedad] = evento.target.value;
    actualizarFiltros();
    actualizarEstadoVisualFiltros();
    actualizarBotonFiltros();
    mostrarFiltrosActivos();
    renderizarProyectos();
    actualizarURL();
}
// =========================================================
// FILTRAR PROYECTOS
function obtenerProyectosFiltrados() {
    return proyectos.filter((proyecto) => {
        // -------------------------------------------------
        // Filtros
        if (filtros.carrera && String(proyecto.carrera) !== filtros.carrera) {
            return false;
        }
        if (filtros.materia && String(proyecto.materia) !== filtros.materia) {
            return false;
        }
        if (filtros.anio && String(proyecto.anio) !== filtros.anio) {
            return false;
        }
        if (filtros.cuatrimestre && String(proyecto.cuatrimestre) !== filtros.cuatrimestre) {
            return false;
        }
        if (filtros.comision && String(proyecto.comision) !== filtros.comision) {
            return false;
        }
        if (filtros.trabajo && String(proyecto.trabajo) !== filtros.trabajo) {
            return false;
        }
        // -------------------------------------------------
        // Buscador
        if (filtros.busqueda) {
            const busqueda = filtros.busqueda.toLowerCase().trim();
            const textoBusqueda = [proyecto.alumno, proyecto.tema, proyecto.trabajo, proyecto.descripcion,proyecto.tecnologias, proyecto.materia, proyecto.comision]
                .filter((valor) => valor)
                .join(" ")
                .toLowerCase();
            if (!textoBusqueda.includes(busqueda)) {
                return false;
            }
        }
        return true;
    });
}
// =========================================================
// RENDERIZAR PROYECTOS
function renderizarProyectos() {
    const contenedor = document.getElementById("contenedorProyectos");
    if (!contenedor) {
        return;
    }
    const proyectosFiltrados = obtenerProyectosFiltrados();
    contenedor.innerHTML = "";
    // -----------------------------------------------------
    // Contador
    actualizarContador(proyectosFiltrados.length);
    // -----------------------------------------------------
    // Sin resultados
    if (proyectosFiltrados.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <h3>No se encontraron proyectos</h3>
                <p>
                    No hay proyectos que coincidan
                    con los filtros seleccionados.
                </p>
            </div>
        `;
        return;
    }
    // -----------------------------------------------------
    // Crear tarjetas
    proyectosFiltrados.forEach((proyecto) => {
        const tarjeta = crearTarjeta(proyecto);
        contenedor.appendChild(tarjeta);
    });
}
// =========================================================
// CREAR TARJETA
function crearTarjeta(proyecto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-proyecto";
    // -----------------------------------------------------
    // FOTO
    const contenedorFoto = document.createElement("div");
    contenedorFoto.className = "tarjeta-foto";
    if (proyecto.foto) {
        const imagen = document.createElement("img");
        imagen.src = proyecto.foto;
        imagen.alt = proyecto.tema ? `Proyecto: ${proyecto.tema}` : `Proyecto de ${formatearNombre(proyecto.alumno)}`;
        imagen.loading = "lazy";
        imagen.onerror = function () {
            mostrarFotoDefault(contenedorFoto);
        };
        contenedorFoto.appendChild(imagen);
    } else {
        mostrarFotoDefault(contenedorFoto);
    }
    // -----------------------------------------------------
    // CONTENIDO
    const contenido = document.createElement("div");
    contenido.className = "tarjeta-contenido";
    // Tema
    const tema = document.createElement("h3");
    tema.textContent = proyecto.tema || "Proyecto sin título";
    // Alumno
    const alumno = document.createElement("p");
    alumno.className = "tarjeta-alumno";
    alumno.textContent = formatearNombre(proyecto.alumno);
    // Información
    const informacion = document.createElement("div");
    informacion.className = "tarjeta-informacion";
    informacion.innerHTML = `
        <span>
            <strong>Materia:</strong>
            ${escapeHTML(proyecto.materia)}
        </span>
        <span>
            <strong>Comisión:</strong>
            ${escapeHTML(proyecto.comision)}
        </span>
        <span>
            <strong>Período:</strong>
            ${escapeHTML(proyecto.periodo)}
        </span>
        <span>
            <strong>Trabajo:</strong>
            ${escapeHTML(formatearNombreTrabajo(proyecto.trabajo))}
        </span>
        <span>
            <strong>Tecnologías:</strong>
            ${escapeHTML(formatearNombreTrabajo(proyecto.tecnologias))}
        </span>
    `;
    // Descripción
    const descripcion = document.createElement("p");
    descripcion.className = "tarjeta-descripcion";
    descripcion.textContent = proyecto.descripcion || "Sin descripción disponible.";
    // Botón
    const enlace = document.createElement("a");
    enlace.className = "boton-ver";
    enlace.href = proyecto.url;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.textContent = "Ver trabajo";
    // -----------------------------------------------------
    // ARMAR TARJETA
    contenido.appendChild(tema);
    contenido.appendChild(alumno);
    contenido.appendChild(informacion);
    contenido.appendChild(descripcion);
    contenido.appendChild(enlace);
    tarjeta.appendChild(contenedorFoto);
    tarjeta.appendChild(contenido);
    return tarjeta;
}
// =========================================================
// FOTO POR DEFECTO
function mostrarFotoDefault(contenedor) {
    contenedor.innerHTML = `
        <div class="foto-default">
            <span>Sin imagen</span>
        </div>
    `;
}
// =========================================================
// CONTADOR
function actualizarContador(cantidad) {
    const contador = document.getElementById("contadorProyectos");
    if (!contador) {
        return;
    }
    contador.textContent = cantidad === 1 ? "1 proyecto" : `${cantidad} proyectos`;
}

function inicializarBotonFiltros() {
    const boton = document.getElementById("botonFiltros");
    const contenedor = document.getElementById("contenedorFiltros");
    if (!boton || !contenedor) return;
    boton.addEventListener("click", () => {
        contenedor.classList.toggle("filtros-visibles");
        actualizarBotonFiltros();
    });
    actualizarBotonFiltros();
}
function actualizarBotonFiltros() {
    const boton = document.getElementById("botonFiltros");
    const texto = document.getElementById("textoBotonFiltros");
    const contenedor = document.getElementById("contenedorFiltros");

    if (!boton || !texto || !contenedor) return;

    const cantidadFiltros = CONFIG_FILTROS.filter((filtro) => filtros[filtro.propiedad] !== "").length;

    const filtrosVisibles = contenedor.classList.contains("filtros-visibles");

    if (cantidadFiltros > 0) {
        texto.textContent = filtrosVisibles ? `Ocultar filtros · ${cantidadFiltros}` : `Filtros · ${cantidadFiltros}`;
    } else {
        texto.textContent = filtrosVisibles ? "Ocultar filtros" : "Filtros";
    }

    boton.setAttribute("aria-expanded", filtrosVisibles);
}

// =========================================================
// LIMPIAR FILTROS
function limpiarFiltros() {
    filtros = {
        carrera: "",
        materia: "",
        anio: "",
        cuatrimestre: "",
        comision: "",
        trabajo: "",
        busqueda: "",
    };
    document.getElementById("buscador").value = "";
    actualizarFiltros();
    actualizarEstadoVisualFiltros();
    actualizarBotonFiltros();
    mostrarFiltrosActivos();
    renderizarProyectos();
    actualizarURL();
}
// =========================================================
// FORMATEAR NOMBRE
function formatearNombre(nombre) {
    if (!nombre) {
        return "";
    }
    return nombre
        .split("_")
        .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase())
        .join(" ");
}
// =========================================================
// ESCAPAR HTML
function escapeHTML(valor) {
    if (valor === null || valor === undefined) {
        return "";
    }
    return String(valor).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
// =========================================================
// ERROR
function mostrarError(mensaje) {
    const contenedor = document.getElementById("contenedorProyectos");
    if (!contenedor) {
        return;
    }
    contenedor.innerHTML = `
        <div class="error-catalogo">
            <h3>Error</h3>
            <p>
                ${escapeHTML(mensaje)}
            </p>
        </div>
    `;
}