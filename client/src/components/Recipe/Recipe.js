import React from "react";
import "../Recipe/Recipe.css"


export default function Recipe({ name, image, dietType, score, }) {
    let key = 1

    return (
        <div className="card">
           
             <img className="img" src={image} alt="img" />
          
            <div>
                <h3 className="name">{name}</h3>
            </div>


            <div>
                {dietType?.map(el => <li key={key++}>{el.name ? el.name : el}</li>)}
            </div>
            <div>
                <p >{`Score: ${score}`}</p>
            </div>
        </div>
    )
}