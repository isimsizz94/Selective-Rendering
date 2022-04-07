import {render} from "./render.js";

setInterval(() => {
    const persons = document.querySelectorAll(".persons");

    console.time("Render");
    render(persons[1], persons[0]);
    console.timeEnd("Render");
}, 150);