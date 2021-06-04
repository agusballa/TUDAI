"use strict";

//refenciamos el btn-menu y agregamos el event listener, cuando hace click llama a la funcion
document.querySelector("#btn-menu").addEventListener("click", toggleMenu);

//refenciamos a lista del menu de navegacion, y le agregamos classlist toggle para que agregue la clase show
function toggleMenu() {
    document.querySelector(".navigator").classList.toggle("show");
}

//.navigator tiene display none, y cuando se agrega show pasa display flow 