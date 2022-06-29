import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsRecipe } from "../../redux/actions/index.js";
import "../DetailRecipe/DetailRecipe.css"
import { Loader } from "../Loader/Loader.js";


export default function DetailRecipe(props) {

    let key = 1
    const recipeDetails = useSelector(state => state.recipeDetail)

    const id = props.match.params.id

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(detailsRecipe(id))
    }, [dispatch, id]);


    return (

        <div className="divgral container_1">
            {/* {console.log(recipeDetails.map(el =>el))} */}
            {/* {console.log(recipeDetails)} */}


            <div>
                <Link to={"/home"}><button className="button">Go Back To Home</button></Link>
            </div>
            {
                recipeDetails.name ?
            <div className="bg">
                <h2>{recipeDetails.name}</h2>
                <img className="image" src={recipeDetails.image} alt="img" />
                <h3>Summary</h3>
                <p>{recipeDetails?.summary?.replace(/<[^>]*>/g, '')}</p>
            </div>
            :<Loader/>}
            
            
            <div className="steps">
                <h3>Steps</h3>

                {
                    typeof recipeDetails?.steps !== "string" ? recipeDetails.steps?.map(e => {
                        return (
                            
                            <li className="liPr" key={key++}>{e.step}</li>
                        )
                    }) :
                        <li className="liPr" key={key++}>{recipeDetails.steps}</li>
                }
            </div>
            
     

            <div className="prueba">
                <div className="namedetail">
                    <h3>Health Score: {recipeDetails.healthScore} </h3>
                </div>
                <div className="namedetail">
                    {recipeDetails.dishType?.map(el => {
                        return (
                            <h3>Dish Type : {el}</h3>
                        )
                    })}
                </div>

                <div className="namedetail">
                    <h3>Score : {recipeDetails.score}</h3>
                </div>

                <div className="namedetail">
                    <h3>Diet Types</h3>
                    {recipeDetails.dietTypes?.map(el => <li key={key++}>{el.name ? el.name : el}</li>)}

                </div>

            </div>


        </div>
    )

};


