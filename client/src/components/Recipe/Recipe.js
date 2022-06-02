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
           
           <Link  to={"/home/" + id}>
             <img className="img" src={image} alt="img" />
           </Link>
          
            <div className="bg-name-diet">
                <h3 className="name">{name}</h3>
           
                {dietType?.map(el => <li className="diet" key={key++}>{el.name ? el.name : el}</li>)}
                <p >{`Score: ${score}`}</p>
         
            </div>


           
        </div>
    )
}