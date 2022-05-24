import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsRecipe } from "../../redux/actions/index.js";
import "../DetailRecipe/DetailRecipe.css"


export default function DetailRecipe(props){
    
    let key = 1
    const recipeDetails = useSelector(state =>state.recipeDetail)
  
    const id = props.match.params.id
   
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(detailsRecipe(id))
    },[dispatch,id]);


    return(
        
        <div className="div">
            {/* {console.log(recipeDetails.map(el =>el))} */}
                {/* {console.log(recipeDetails)} */}
    
            
            <nav>
                <Link to={"/home"}><button className="button">Go Back To Home</button></Link>
            </nav>
            
            <div className="namedetail">          
                <h2>{recipeDetails.name}</h2>
            </div>

            <div className="imgdiv">
                <img className="imge" src={recipeDetails.image } alt="img" />
            </div>

            <div className="namedetail">
                <h3>Summary</h3>
                <p>{recipeDetails?.summary?.replace(/<[^>]*>/g, '')}</p>
            </div>

            <div className="namedetail">
               
                <h3>Steps</h3>
                
                { 
                  typeof recipeDetails?.steps !== "string"? recipeDetails.steps?.map(e =>{
                    return(
                        <li key={key++}>{e.step}</li>
                    )
                }):
                <li key={key++}>{recipeDetails.steps}</li> 
                }
                
           
            </div>
            <div className="prueba">
            <div className="namedetail">
                <h3>Health Score: {recipeDetails.healthScore} </h3> 
            </div>
            <div className="namedetail">
                { recipeDetails.dishType?.map(el =>{
                    return(
                        <h3>Dish Type : {el}</h3>
                    )
                })}
            </div>

            <div className="namedetail">
                <h3>Score : {recipeDetails.healthscore}</h3>
            </div>

            <div className="namedetail">
                <h3>Diet Types</h3>
               {recipeDetails.dietTypes?.map(el=> <li key={key++}>{el.name?el.name:el}</li>)}
             
            </div>

            </div>

        </div>
    )
    
};


