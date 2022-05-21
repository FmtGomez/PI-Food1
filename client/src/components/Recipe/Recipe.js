import React from "react";
//import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { remove } from "../../redux/actions";
import "../Recipe/Recipe.css"


export default function Recipe({ name, image, dietType, score,id}) {
    let key = 1
    //const dispatch = useDispatch()

    return (
        <div className="card">
            {/* <button onClick={()=> dispatch(remove(id))}>x</button> */}
             <img className="img" src={image} alt="img" />
           
           <Link  to={"/home/" + id}>
            <div>
                <h3 className="name">{name}</h3>
            </div>
           </Link>
          


            <div className="dietTypes">
                {dietType?.map(el => <li key={key++}>{el.name ? el.name : el}</li>)}
            </div>
            <div className="dietTypes">
                <p >{`Score: ${score}`}</p>
            </div>
        </div>
    )
}