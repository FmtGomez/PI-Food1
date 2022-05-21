import React from "react";
import "../Paged/Paged.css"

export function Paged({recipes,paged,recipesPage}){
    const pages = [];
    for (let i = 1; i<= Math.ceil(recipes/recipesPage);i++){ //divido cantidad de recetas totales por 9 y lo rendodeo para arriba
        pages.push(i);
    };
    return(
        <nav>
            <ul className="ul">
                {pages&&
                pages.map(number =>(
                    <li className="li" key={number}>
                        <button  onClick={()=> paged(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}