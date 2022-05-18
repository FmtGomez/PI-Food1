import React from "react";

export function Paged({recipes,paged,recipesPage}){
    const pages = [];
    for (let i = 1; i<= Math.ceil(recipes/recipesPage);i++){
        pages.push(i);
    };
    return(
        <nav>
            <ul>
                {pages&&
                pages.map(number =>(
                    <li key={number}>
                        <button  onClick={()=> paged(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}