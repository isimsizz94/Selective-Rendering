import {render} from "./render.js";

const outTime = arr => {
    const newOutElement = document.createElement("div");
    newOutElement.className = "out";
    arr.forEach(str => {
        const p = document.createElement("p");
        p.textContent = str;
        newOutElement.appendChild(p);
    });
    render(document.querySelector(".out"), newOutElement);
};

const subtract = (start, end) => {
    return +(start - end).toFixed(5);
};

document.querySelector(".selective-render").onclick = () => {
    const persons = document.querySelectorAll(".persons");

    const start = performance.now();
    render(persons[1], persons[0]);
    const startHtmlRender = performance.now();

    setTimeout(() => {
        const now = performance.now();
        const renderTime = subtract(now, start);
        const domRenderTime = subtract(now, startHtmlRender);

        outTime([
            `Render: ${renderTime}ms`,
            `DOM render: ${domRenderTime}ms`,
            `All: ${+(renderTime + domRenderTime).toFixed(5)}ms`
        ]);
    }, 0);
}

document.querySelector(".outerhtml-render").onclick = () => {
    const persons = document.querySelectorAll(".persons");

    const start = performance.now();
    persons[1].outerHTML = persons[0].outerHTML;
    const startHtmlRender = performance.now();

    setTimeout(() => {
        const now = performance.now();
        const renderTime = subtract(now, start);
        const domRenderTime = subtract(now, startHtmlRender);

        outTime([
            `Render: ${renderTime}ms`,
            `DOM render: ${domRenderTime}ms`,
            `All: ${+(renderTime + domRenderTime).toFixed(5)}ms`
        ]);
    }, 0);
}
