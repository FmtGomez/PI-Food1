import React from "react";
import "../Paged/Paged.css"

export function Paged({ recipes, paged, recipesPage, nextpaged, previuspaged , page}) {
    const pages = [];
    for (let i = 1; i <= Math.ceil(recipes / recipesPage); i++) { //divido cantidad de recetas totales por 9 y lo rendodeo para arriba
        pages.push(i);
    };
    return (
        <nav>
            <ul className="ul">
                <button disabled={page === 1} className="buttonprueba1" onClick={() => previuspaged()}>previus</button>
                {pages &&
                    pages.map(number => (
                        <li className="li" key={number}>
                            <button className="buttonprueba " onClick={() => paged(number)}>{number}</button>
                        </li>
                    ))}

                <button disabled={page >= Math.ceil(recipes / recipesPage)} className="buttonprueba1" onClick={() => nextpaged()}>next</button>

            </ul>
        </nav>
    )
}

