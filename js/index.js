import { SmoothScroll } from "./Animation/Animation__scroll.js";
import { jsonToHtml } from "./Utils/jsonToHtml.js";
import "./webComponents/Card.js";


const Z_SPACING = 1000;
const SPEED = 2.6;

window.addEventListener("DOMContentLoaded", () => {
    fetch('./api/card__info.json')
    .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки JSON');

        return response.json();
    })
    .then(data => {
        const $gallery  = document.querySelector('#gallery');
        
        for (let item of data) {
            
            $gallery.insertAdjacentHTML("beforeend", `<card-component class="frame ${!item.globalClass ? "" : item.globalClass}">
                ${jsonToHtml(item)}
            </card-component>`);
        };
        
        requestAnimationFrame(() => {
            const perCard = Z_SPACING / SPEED;
            const depth = data.length * perCard + window.innerHeight;
            
            document.documentElement.style.setProperty('--depth', `${depth}px`);
        
            new SmoothScroll({ ease: 0.12, speed: SPEED, zSpacing: -Z_SPACING });

            window.scrollTo(0, 1);
        });
    })
    .catch(error => console.error('Fetch error:', error)); 
});




