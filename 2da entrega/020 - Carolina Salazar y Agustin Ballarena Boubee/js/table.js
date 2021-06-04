"use strict";

//-----------------------EventListeners----------------------------

//cuado carga el HTML llama a la funcion preload
document.addEventListener("DOMContentLoaded", preLoad);
document.querySelector("#btn-add1").addEventListener("click", add1);
document.querySelector("#btn-add3").addEventListener("click", add3);
document.querySelector("#btn-delete").addEventListener("click", reset);

//cargamos un arreglo de objetos json
let table = [
    {
        excursion: "Visita al Vaticano",
        name: "Roger",
        age: 25,
        time: 15,
        language: "Español",
    },
    {
        excursion: "Coliseo, Foro y Palatino",
        name: "Rafa",
        age: 16,
        time: 12,
        language: "Italiano",
    },
    {
        excursion: "Excursión a las Catacumbas",
        name: "Novak",
        age: 11,
        time: 14,
        language: "Inglés",
    },
    {
        excursion: "Tour Gastronómico",
        name: "Andy",
        age: 52,
        time: 11,
        language: "Italiano",
    },
    {
        excursion: "Tour Nocturno",
        name: "Dominic",
        age: 30,
        time: 21,
        language: "Español",
    }
]

//-------------------------PRECARGA----------------------------

//llama a la funcion display table
function preLoad() {
    displayTable();
}

//------------------------MOSTRAR TABLA------------------------

function displayTable() {
    //referencia a la tabla
    let tableExcursions = document.querySelector("#table");
    //limpia el contenido de la tabla
    tableExcursions.innerHTML = '';
    //iteramos el arreglo de objetos desde 0 hasta el tabaño del arreglo
    for (let i = 0; i < table.length; i++) {
        //si la edad ingresada es menor o igual a 12
        if (table[i].age <= 12) {
            //se carga la tabla y se agrega la clase highlighted a los td
            tableExcursions.innerHTML +=
                `<tr>
                    <td class="highlighted">${table[i].excursion}</td>
                    <td class="highlighted">${table[i].name}</td>
                    <td class="highlighted">${table[i].age}</td>
                    <td class="highlighted">${table[i].time}</td>
                    <td class="highlighted">${table[i].language}</td>
                </tr>`;
        }
        //sino se carga la tabla sin agregar la clase
        else {
            tableExcursions.innerHTML +=
                `<tr>
                    <td>${table[i].excursion}</td>
                    <td>${table[i].name}</td>
                    <td>${table[i].age}</td>
                    <td>${table[i].time}</td>
                    <td>${table[i].language}</td>
                </tr>`;
        }
    }
}

//----------------------AGREGAR UN REGISTRO--------------------

function add1() {
    //referenciamos a los inputs
    let excursion = document.querySelector("#input-excursion").value;
    let name = document.querySelector("#input-name").value;
    let age = document.querySelector("#input-age").value;
    let time = document.querySelector("#input-time").value;
    let language = document.querySelector("#input-language").value;

    //creamos una variable con un objeto json
    let newRecord = {
        excursion: excursion,
        name: name,
        age: parseInt(age),
        time: parseInt(time),
        language: language,
    }

    //le hacemos push al newRecord para agregarlo al arreglo
    table.push(newRecord);
    //hacemos reset de formulario
    document.querySelector("form").reset();
    //llamamos a la funcion displaytable
    displayTable();
}

//-------------------AGREGAR TRES REGISTROS--------------

function add3() {
    //creamos 3 variables con objetos json
    let firstRecord = {
        excursion: "Tour de las leyendas",
        name: "Serena",
        age: 29,
        time: 8,
        language: "Italiano",
    }

    //los pusheamos para agregarlos al array de objetos
    table.push(firstRecord);

    let secondRecord = {
        excursion: "Crucero por el Río Tiber",
        name: "Maria",
        age: 34,
        time: 13,
        language: "Inglés",
    }

    table.push(secondRecord);

    let thirdRecord = {
        excursion: "Tour por las Iglesias Barrocas",
        name: "Simona",
        age: 8,
        time: 12,
        language: "Español",
    }

    table.push(thirdRecord);

    //hacemos reset del formulario
    document.querySelector("form").reset();
    //llamamos a la funcion displayTable
    displayTable();
}

//-------------------BORRAR REGISTROS--------------------

function reset() {
    //le asignamos un array basi
    table = [];
    //llamamos a displayTable
    displayTable();
}
