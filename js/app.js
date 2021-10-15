const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const min = document.querySelector('#minimo');
const max = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const currentYear = new Date().getFullYear();
const minYear = currentYear - 10;

const infoBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    min: '',
    max : '',
    puertas: '',
    transmision: '',
    color: ''
}

let listaAutosFiltrada = [];

document.addEventListener('DOMContentLoaded', () => {
    filtrarAutos();
    mostrarAutos();
    cargarAnios();
});

marca.addEventListener('change', event => {
    infoBusqueda.marca = event.target.value;
    filtrarAutos();
})

year.addEventListener('change', event => {
    infoBusqueda.year = parseInt(event.target.value);
    filtrarAutos();
})

min.addEventListener('change', event => {
    infoBusqueda.min = parseInt(event.target.value);
    filtrarAutos();
});

max.addEventListener('change', event => {
    infoBusqueda.max = parseInt(event.target.value);
    filtrarAutos();
});

puertas.addEventListener('change', event => {
    infoBusqueda.puertas = parseInt(event.target.value);
    filtrarAutos();
});

transmision.addEventListener('change', event => {
    infoBusqueda.transmision = event.target.value;
    filtrarAutos();
});

color.addEventListener('change', event => {
    infoBusqueda.color = event.target.value;
    filtrarAutos();
});


function mostrarAutos() {
    limpiarResultado();
    listaAutosFiltrada.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;

        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} puertas - Transmisión ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        resultado.appendChild(autoHTML);
    });
}

function cargarAnios() {
    for (let x = currentYear; x >= minYear; x--) {
        const yearOption = document.createElement('option');
        yearOption.textContent = x;

        year.appendChild(yearOption);
    }
}

function filtrarAutos() {
    listaAutosFiltrada = autos.filter(filtrarMarca).filter(filtrarAnio).filter(filtrarRangoPrecio).filter(filtrarNoPuertas).filter(filtrarTransmision).filter(filtrarColor);
    console.log(listaAutosFiltrada)
    mostrarAutos();

    if (listaAutosFiltrada.length === 0) {
        mostrarErrorNoResultados();
    }
}

function limpiarResultado() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarErrorNoResultados() {
    const sinResultados = document.createElement('div');
    sinResultados.classList.add('alerta', 'error');
    sinResultados.textContent = 'Sin Resultados';

    resultado.appendChild(sinResultados);
}

function filtrarMarca(auto) {
    const {marca} = infoBusqueda;
    if(marca) {
       return auto.marca === marca;
    }

    return auto;
}

function filtrarAnio(auto) {
    const {year} = infoBusqueda;
    if (year) {
        return auto.year === year;
    }

    return auto;
}

function filtrarRangoPrecio(auto) {
    const {min, max} = infoBusqueda;
    if (min && max) {
        return auto.precio >= min && auto.precio <= max;
    }

    if (min && !max) {
        return auto.precio >= min;
    }

    if (!min && max) {
        return auto.precio <= max;
    }

    return auto;
}

function filtrarNoPuertas(auto) {
    const {puertas} = infoBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }

    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = infoBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }

    return auto;
}

function filtrarColor(auto) {
    const {color} = infoBusqueda;
    if (color) {
        return auto.color === color;
    }

    return auto;
}