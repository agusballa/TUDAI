"use strict";

document.querySelector("#btn-menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navigator").classList.toggle("show");
}