"use strict";

//declaro la variable donde se va a almacenar el captcha
let captcha = "";


function generateRandom(){
    //genero el numero random y lo asigno a la variable random
    let random = Math.floor(Math.random()*1000000);
    //referencio el display-captcha
    let displayCaptcha = document.querySelector("#display-captcha")
    //muestro el numero random en el campo display-captcha
    displayCaptcha.innerHTML = random;
    //le asigno a la variable captcha el numero random
    captcha = random;
}

//ejecuto la funcion generateRandom
generateRandom();

//referencio el btn-send
let btnSend = document.querySelector("#btn-send")
//agregamos eventlistener para llamar a la funcion validation
btnSend.addEventListener("click", validation);

function validation(){
    //referencio el input-captcha
    let inputCaptcha = document.querySelector("#input-captcha");
    //referencio el result
    let result = document.querySelector("#result"); 
    //si el captcha ingresado es igual al captcha random
    if (inputCaptcha.value == captcha) {
        //muestro el mensaje en result
        result.innerHTML = "Eres un Humano :)";
        //hago reset del form
        document.querySelector("#form").reset();
        //ejecuto la funcion generateRandom
        generateRandom();
    //sino el captcha es incorrecto
    }else {
        //muestro el mensaje en result
        result.innerHTML = "Eres un Robot :(";
        //hago reset del form
        document.querySelector("#form").reset();
        //ejecuto la funcion generateRandom
        generateRandom();
    }
}