import {render} from "./render.js";


const persons = document.querySelectorAll(".persons");

setInterval(() => {
    // console.time("Render");
    render(persons[1], persons[0]);
    // console.timeEnd("Render");
}, 150);