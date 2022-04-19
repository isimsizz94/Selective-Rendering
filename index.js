import {render} from "./render.js";

document.querySelector(".selective-render").onclick = () => {
    const persons = document.querySelectorAll(".persons");

    console.time("Render");
    render(persons[1], persons[0]);
    console.timeEnd("Render");
}

document.querySelector(".outerhtml-render").onclick = () => {
    const persons = document.querySelectorAll(".persons");

    console.time("Render");
    persons[1].outerHTML = persons[0].outerHTML;
    console.timeEnd("Render");
}