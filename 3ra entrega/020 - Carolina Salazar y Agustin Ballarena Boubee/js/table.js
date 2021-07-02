"use strict";

//al cargarse la pagina llamo a la funcion preLoad
document.addEventListener("DOMContentLoaded", preLoad);

//agrego el URL como constante
const url = "https://60d7abe3307c300017a5f95a.mockapi.io/api/excursiones";


//----------------------------PRECARGA----------------------------

//hago la precarga de la tabla llamando a la funcion getData
function preLoad() {
    getData();
}


//--------------------------OBTENER DATOS-------------------------

async function getData() {
    //referencio el contenido de la tabla
    let tableExcursions = document.querySelector("#table");
    //vacio el contenido de la tabla por si traia algo del html
    tableExcursions.innerHTML = "";
    try {
        //hago un fetch GET para traer la informacion de la API
        let response = await fetch(url);
        //transformo la respuesta de formato texto a json con json()
        let json = await response.json();
        console.log(json);
        //si la respuesta es ok  
        if (response.ok) {
            //recorro el arreglo json
            for (let i = 0; i < json.length; i++) {
                //y agrego la informacion que obtengo de la api a la tabla
                displayTable(json, i);

                //----------------------------BORRAR REGISTRO-----------------------------------
                //referencio los botones borrar
                let buttonsDelete = document.querySelectorAll(".delete-record");
                //itero los botones borrar
                for (let j = 0; j < buttonsDelete.length; j++) {
                    //guardo el id de cada boton en la variable id
                    let id = json[j].id;
                    //agrego el evento a cada boton, que llama a la funcion deleteRecord y le pasa como parametro el id
                    buttonsDelete[j].addEventListener("click", () => {
                        deleteRecord(id);
                    })
                }

                //----------------------------EDITAR REGISTRO-----------------------------------
                let buttonsEdit = document.querySelectorAll(".edit-record");
                //itero los botones editar
                for (let j = 0; j < buttonsEdit.length; j++) {
                    //guardo el id de cada boton en la variable id
                    let id = json[j].id;
                    //agrego el evento a cada boton, que llama a la funcion editRecord y le pasa como parametro el id
                    buttonsEdit[j].addEventListener("click", () => {
                        editRecord(id);
                    })
                }

            }
            //sino muestro el mensaje Fallo la Respuesta
        } else {
            tableExcursions.innerHTML = "<h1>Error - Falló la Respuesta</h1>";
        }
        //si falla el URL muestro el mensaje Error de Conexión
    } catch (error) {
        tableExcursions.innerHTML = "<h1>Error de Conexión</h1>";
        console.log(error);
    }
}

//---------------------------CARGAR TABLA--------------------------------

function displayTable(json, i) {
    //contando con el json y el index (de cada iteracion) muestro los objetos en la tabla
    let tableExcursions = document.querySelector("#table");
    tableExcursions.innerHTML +=
        `<tr>
        <td>${json[i].excursion}</td>
        <td>${json[i].nombre}</td>
        <td>${json[i].edad}</td>
        <td>${json[i].horario}</td>
        <td>${json[i].idioma}</td>
        <td class="td-buttons"><button class="delete-record">Borrar</button><button class="edit-record">Editar</button></td>
    </tr>`;
}

//---------------------ENVIAR REGISTRO Al SERVIDOR------------------------

async function sendRecord(newRecord) {
    try {
        //envio el nuevo registro a través de POST, defino method (POST), headers (tipo de objeto = json),
        //body (convierto el objeto json a string)
        let response = await fetch(url, {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(newRecord)
        });
        //si la respuesta es ok llamo a la funcion getData para obtener los datos del servidor y mostrarlos en la tabla
        if (response.ok) {
            getData();
        } else {
            container.innerHTML = "<h1>Error - Falló la Respuesta</h1>";
        }
    }
    catch (error) {
        container.innerHTML = "<h1>Error de Conexión</h1>";
        console.log(error);
    }
}


//---------------AGREGAR UN REGISTRO DESDE FORMULARIO-------------------

//referencio al botton add1 y le agrego el evento on click que llama a la funcion add1
document.querySelector("#btn-add1").addEventListener("click", add1);

async function add1(event) {
    event.preventDefault();
    //referencio los inputs y obtengo su valor
    let excursion = document.querySelector("#input-excursion").value;
    let name = document.querySelector("#input-name").value;
    let age = document.querySelector("#input-age").value;
    let time = document.querySelector("#input-time").value;
    let language = document.querySelector("#input-language").value;
    //creo el objeto json correspondiente al registro a agregar en la API
    let newRecord = {
        "excursion": excursion,
        "nombre": name,
        "edad": parseInt(age),
        "horario": parseInt(time),
        "idioma": language,
    }
    //llamo a la funcion sendRecord que envia el registro a traves de API Rest
    sendRecord(newRecord);
    //hago reset del form
    document.querySelector("#form-registration").reset();
}


//------------------------AGREGAR TRES REGISTROS-------------------------

//referencio al botton add3 y le agrego el evento on click que llama a la funcion add3
document.querySelector("#btn-add3").addEventListener("click", add3);

function add3(event) {
    event.preventDefault();
    //creo que objeto json correspondiente al primero registro a agregar
    let firstRecord = {
        "excursion": "Tour de las leyendas",
        "nombre": "Serena",
        "edad": 29,
        "horario": 8,
        "idioma": "Italiano",
    }
    //llamo a la funcion sendRecord y le paso el nuevo registro como parametro
    sendRecord(firstRecord);

    //creo que objeto json correspondiente al segundo registro a agregar
    let secondRecord = {
        "excursion": "Crucero por el Río Tiber",
        "nombre": "Maria",
        "edad": 34,
        "horario": 13,
        "idioma": "Inglés",
    }
    //llamo a la funcion sendRecord y le paso el nuevo registro como parametro
    setTimeout(function(){
        sendRecord(secondRecord)
    }, 1000) ;

    //creo que objeto json correspondiente al tercer registro a agregar
    let thirdRecord = {
        "excursion": "Tour por las Iglesias Barrocas",
        "nombre": "Simona",
        "edad": 8,
        "horario": 12,
        "idioma": "Español",
    }
    //llamo a la funcion sendRecord y le paso el nuevo registro como parametro
    setTimeout(function(){
        sendRecord(thirdRecord)
    }, 2000) ;
}


//--------------------------BORRAR UN REGISTRO--------------------------

async function deleteRecord(id) {
    try {
        //elimino el registro correspondiente al id pasado como parametro a traves del DELETE
        let response = await fetch(`${url}/${id}`, {
            "method": "DELETE"
        });
        //si la respuesta es ok muestro la tabla con el record eliminado
        if (response.ok) {
            //si la respuesta es ok llamo a la funcion getData para obtener los datos del servidor y mostrarlos en la tabla
            getData();
        } else {
            container.innerHTML = "<h1>Error - Falló la Respuesta</h1>";
        }
    }
    catch (error) {
        container.innerHTML = "<h1>Error de Conexión</h1>";
        console.log(error);
    }
}

//--------------------------EDITAR UN REGISTRO--------------------------

async function editRecord(id) {
    //referencio los inputs y obtengo su valor
    let excursion = document.querySelector("#edit-excursion").value;
    let name = document.querySelector("#edit-name").value;
    let age = document.querySelector("#edit-age").value;
    let time = document.querySelector("#edit-time").value;
    let language = document.querySelector("#edit-language").value;
    //creo el objeto json con los valores editados
    let editedRecord = {
        "excursion": excursion,
        "nombre": name,
        "edad": parseInt(age),
        "horario": parseInt(time),
        "idioma": language,
    }
    try {
        //modifico el registro correspondiente al id pasado como parametro a traves del PUT
        let response = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(editedRecord)
        });
        //si la respuesta es ok muestro la tabla con el record modificado
        if (response.ok) {
            //si la respuesta es ok llamo a la funcion getData para obtener los datos del servidor y mostrarlos en la tabla
            getData();
        } else {
            container.innerHTML = "<h1>Error - Falló la Respuesta</h1>";
        }
    }
    catch (error) {
        container.innerHTML = "<h1>Error de Conexión</h1>";
        console.log(error);
    }
    //hago reset del form
    document.querySelector("#form-edit").reset();
}


//------------------------------FILTRAR----------------------------------

let filter = document.querySelector("#select-filter");
let btnFilter = document.querySelector("#btn-filter").addEventListener("click", filterRecords);

async function filterRecords(event) {
    let filterValue = filter.value;
    console.log(filterValue);
    //referencio el contenido de la tabla
    let tableExcursions = document.querySelector("#table");
    //vacio el contenido de la tabla por si traia algo del html
    tableExcursions.innerHTML = "";
    event.preventDefault();
    try {
        //hago un fetch GET para traer la informacion de la API
        let response = await fetch(url);
        //transformo la respuesta de formato texto a json con json()
        let json = await response.json();
        //si la respuesta es ok  
        if (response.ok) {
            //si el value del select es morning
            if (filterValue == "morning") {
                //recorro el json
                for (let i = 0; i < json.length; i++) {
                    //si el horario es menor a 13
                    if (json[i].horario < 13) {
                        //llamo a displayTable que muestra el objeto en la tabla
                        displayTable(json, i)
                   } 
                }
            //si el value del select es afternoon
            } else if (filterValue == "afternoon") {
                //recorro el json
                for (let i = 0; i < json.length; i++) {
                    //si el horario esta entre 13 y 19
                    if ((json[i].horario >= 13) && (json[i].horario < 19)) {
                        //llamo a displayTable que muestra el objeto en la tabla
                        displayTable(json, i)
                    }
                }
            //si el value del select es night
            } else if (filterValue == "night") {
                //recorro el json
                for (let i = 0; i < json.length; i++) {
                    //si el horario esta entre 19 y 25
                    if ((json[i].horario >= 19) && (json[i].horario < 25)) {
                        //llamo a displayTable que muestra el objeto en la tabla
                        displayTable(json, i)
                    }
                }
            //si el value del select es italian
            } else if (filterValue == "italian") {
                //recorro el json
                for (let i = 0; i < json.length; i++) {
                    //si el idioma es italiano
                    if (json[i].idioma == "Italiano") {
                        //llamo a displayTable que muestra el objeto en la tabla
                        displayTable(json, i)
                    }
                }
            //si el value del select es spanish
            } else if (filterValue == "spanish") {
                //recorro el json
                for (let i = 0; i < json.length; i++) {
                    //si el idioma es español
                    if (json[i].idioma == "Español") {
                        //llamo a displayTable que muestra el objeto en la tabla
                        displayTable(json, i)
                    }
                }
            }
        } else {
        tableExcursions.innerHTML = "<h1>Error - Falló la Respuesta</h1>";
        }
    //si falla el URL muestro el mensaje Error de Conexión
    } catch (error) {
        tableExcursions.innerHTML = "<h1>Error de Conexión</h1>";
        console.log(error);
    }
}