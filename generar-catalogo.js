//node generar-catálogo.js

const fs = require("fs");
const path = require("path");

// =========================================================
// CONFIGURACIÓN
// =========================================================

const CARPETA_RAIZ = __dirname;

const CARPETA_DW = path.join(CARPETA_RAIZ, "DW");

const MATERIA = "IDM";

const URL_PAGES = "https://aledaddezioDV.github.io/";

// =========================================================
// CONFIGURACIÓN DE ARCHIVOS DEL PROYECTO
// =========================================================

const NOMBRE_PROYECTO_JSON = "proyecto.json";

const NOMBRES_FOTO = ["foto.jpg", "foto.jpeg", "foto.png", "foto.webp"];

// Contenido inicial de proyecto.json
const PLANTILLA_PROYECTO = {
    tema: "",
    descripcion: "",
    tecnologias: "",
    visible: true,
};

// =========================================================
// UTILIDADES
// =========================================================

function obtenerDirectorios(ruta) {
    if (!fs.existsSync(ruta)) {
        return [];
    }

    return fs
        .readdirSync(ruta, {
            withFileTypes: true,
        })
        .filter((elemento) => elemento.isDirectory())
        .map((elemento) => elemento.name);
}

function tieneIndexHTML(ruta) {
    return fs.existsSync(path.join(ruta, "index.html"));
}

function convertirRutaURL(ruta) {
    return ruta.split(path.sep).join("/");
}

// =========================================================
// PROYECTO.JSON
// =========================================================

/**
 * Verifica si existe proyecto.json.
 *
 * Si no existe, lo crea automáticamente.
 * 
 * IMPORTANTE:
 * Nunca sobrescribe un proyecto.json existente.
 */
function asegurarProyectoJSON(rutaProyecto) {
    const archivoJSON = path.join(rutaProyecto, NOMBRE_PROYECTO_JSON);

    // ---------------------------------------------
    // Ya existe
    // ---------------------------------------------

    if (fs.existsSync(archivoJSON)) {
        return false;
    }

    // ---------------------------------------------
    // Crear archivo
    // ---------------------------------------------

    fs.writeFileSync(
        archivoJSON,

        JSON.stringify(PLANTILLA_PROYECTO, null, 4),

        "utf8",
    );

    console.log(`📝 Creado: ${convertirRutaURL(path.relative(CARPETA_RAIZ, archivoJSON))}`);

    return true;
}

/**
 * Lee proyecto.json.
 */
function obtenerDatosManuales(rutaProyecto) {
    const archivoJSON = path.join(rutaProyecto, NOMBRE_PROYECTO_JSON);

    try {
        const contenido = fs.readFileSync(archivoJSON, "utf8");

        const datos = JSON.parse(contenido);

        return {
            tema: typeof datos.tema === "string" ? datos.tema : "",

            descripcion: typeof datos.descripcion === "string" ? datos.descripcion : "",

            tecnologias: typeof datos.tecnologias === "string" ? datos.tecnologias : "",

            visible: typeof datos.visible === "boolean" ? datos.visible : true,
        };
    } catch (error) {
        console.error(`❌ Error leyendo ${archivoJSON}`);

        console.error(error.message);

        return {
            tema: "",

            descripcion: "",

            tecnologias: "",

            visible: true,
        };
    }
}

// =========================================================
// FOTO
// =========================================================

function obtenerFoto(rutaProyecto) {
    for (const nombreFoto of NOMBRES_FOTO) {
        const rutaFoto = path.join(rutaProyecto, nombreFoto);

        if (fs.existsSync(rutaFoto)) {
            const rutaRelativa = path.relative(CARPETA_RAIZ, rutaFoto);

            return convertirRutaURL(rutaRelativa);
        }
    }

    return null;
}

// =========================================================
// PERÍODO
// =========================================================

function obtenerAnio(periodo) {
    const partes = periodo.split(".");

    if (partes.length !== 2) {
        return null;
    }

    const anioCorto = parseInt(partes[0], 10);

    if (isNaN(anioCorto)) {
        return null;
    }

    return 2000 + anioCorto;
}

function obtenerCuatrimestre(periodo) {
    const partes = periodo.split(".");

    if (partes.length !== 2) {
        return null;
    }

    const cuatrimestre = parseInt(partes[1], 10);

    return isNaN(cuatrimestre) ? null : cuatrimestre;
}

// =========================================================
// RECORRER DW / IDM
// =========================================================

function recorrerDWIDM() {
    const proyectos = [];

    // -----------------------------------------------------
    // DW
    // -----------------------------------------------------

    if (!fs.existsSync(CARPETA_DW)) {
        console.error("❌ No existe la carpeta DW.");

        return proyectos;
    }

    // -----------------------------------------------------
    // DW → IDM
    // -----------------------------------------------------

    const carpetaMateria = path.join(CARPETA_DW, MATERIA);

    if (!fs.existsSync(carpetaMateria)) {
        console.error(`❌ No existe DW/${MATERIA}`);

        return proyectos;
    }

    // -----------------------------------------------------
    // IDM → PERÍODO
    // -----------------------------------------------------

    const periodos = obtenerDirectorios(carpetaMateria);

    for (const periodo of periodos) {
        const carpetaPeriodo = path.join(carpetaMateria, periodo);

        // -------------------------------------------------
        // PERÍODO → COMISIÓN
        // -------------------------------------------------

        const comisiones = obtenerDirectorios(carpetaPeriodo);

        for (const comision of comisiones) {
            const carpetaComision = path.join(carpetaPeriodo, comision);

            // ---------------------------------------------
            // COMISIÓN → ALUMNO
            // ---------------------------------------------

            const alumnos = obtenerDirectorios(carpetaComision);

            for (const alumno of alumnos) {
                const carpetaAlumno = path.join(carpetaComision, alumno);

                // -----------------------------------------
                // ALUMNO → TRABAJO
                // -----------------------------------------

                const trabajos = obtenerDirectorios(carpetaAlumno);

                for (const trabajo of trabajos) {
                    const carpetaTrabajo = path.join(carpetaAlumno, trabajo);

                    // -------------------------------------
                    // Verificar index.html
                    // -------------------------------------

                    if (!tieneIndexHTML(carpetaTrabajo)) {
                        continue;
                    }

                    // -------------------------------------
                    // Crear proyecto.json si no existe
                    // -------------------------------------

                    asegurarProyectoJSON(carpetaTrabajo);

                    // -------------------------------------
                    // RUTA RELATIVA
                    // -------------------------------------

                    const rutaRelativa = path.relative(CARPETA_RAIZ, carpetaTrabajo);

                    const rutaURL = convertirRutaURL(rutaRelativa);

                    // -------------------------------------
                    // FOTO
                    // -------------------------------------

                    const foto = obtenerFoto(carpetaTrabajo);

                    // -------------------------------------
                    // DATOS MANUALES
                    // -------------------------------------

                    const datosManuales = obtenerDatosManuales(carpetaTrabajo);

                    // -------------------------------------
                    // ID
                    // -------------------------------------

                    const id = ["DW", periodo, comision, alumno, trabajo].join("-");

                    // -------------------------------------
                    // CREAR OBJETO
                    // -------------------------------------

                    proyectos.push({
                        id: id,

                        carrera: "DW",

                        materia: MATERIA,

                        periodo: periodo,

                        anio: obtenerAnio(periodo),

                        cuatrimestre: obtenerCuatrimestre(periodo),

                        comision: comision,

                        alumno: alumno,

                        trabajo: trabajo,

                        tema: datosManuales.tema,

                        descripcion: datosManuales.descripcion,

                        tecnologias: datosManuales.tecnologias,

                        foto: foto,

                        visible: datosManuales.visible,

                        ruta: rutaURL,

                        url: `${URL_PAGES}${rutaURL}/`,
                    });
                }
            }
        }
    }

    return proyectos;
}

// =========================================================
// ORDENAR
// =========================================================

function ordenarProyectos(proyectos) {
    return proyectos.sort((a, b) => {
        // Año
        if (a.anio !== b.anio) {
            return a.anio - b.anio;
        }

        // Cuatrimestre
        if (a.cuatrimestre !== b.cuatrimestre) {
            return a.cuatrimestre - b.cuatrimestre;
        }

        // Comisión
        const diferenciaComision = a.comision.localeCompare(b.comision);

        if (diferenciaComision !== 0) {
            return diferenciaComision;
        }

        // Alumno
        const diferenciaAlumno = a.alumno.localeCompare(b.alumno);

        if (diferenciaAlumno !== 0) {
            return diferenciaAlumno;
        }

        // Trabajo
        return a.trabajo.localeCompare(b.trabajo);
    });
}

// =========================================================
// GENERAR CATÁLOGO
// =========================================================

function generarCatalogo() {
    console.log("");
    console.log("======================================");
    console.log("🔎 GENERANDO CATÁLOGO");
    console.log("======================================");
    console.log("");

    let proyectos = recorrerDWIDM();

    proyectos = ordenarProyectos(proyectos);

    const catalogo = {
        version: 1,

        generado: new Date().toISOString(),

        cantidad: proyectos.length,

        proyectos: proyectos,
    };

    // -----------------------------------------------------
    // GUARDAR CATALOGO.JSON
    // -----------------------------------------------------

    const archivoCatalogo = path.join(CARPETA_RAIZ, "catalogo.json");

    fs.writeFileSync(
        archivoCatalogo,

        JSON.stringify(catalogo, null, 4),

        "utf8",
    );

    // -----------------------------------------------------
    // RESULTADO
    // -----------------------------------------------------

    console.log("");

    console.log(`✅ Proyectos encontrados: ${proyectos.length}`);

    console.log("📄 catalogo.json generado correctamente.");

    console.log("");

    console.table(proyectos);

    console.log("");
    console.log("======================================");
    console.log("✅ PROCESO FINALIZADO");
    console.log("======================================");
    console.log("");
}

// =========================================================
// EJECUTAR
// =========================================================

generarCatalogo();
