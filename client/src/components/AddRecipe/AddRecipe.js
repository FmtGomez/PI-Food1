import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addRecipe, getDiets, getRecipes } from "../../redux/actions";
import "../AddRecipe/AddRecipe.css"

function validate (input){
    const patron = new RegExp('^[ñíóáéú a-zA-Z ]+$')
    const errors = {};
    if(!input.name){
        errors.name = "Complete with a recipe name";
    } else if (!patron.test(input.name)){errors.name = "The name cannot contain numbers"}

    if(!input.summary) errors.summary = "Complete with comments about your recipe";
    if(!input.image) errors.image = "Complete with a imagen" 
    
    if (input.score < 1 || input.score>100){
        errors.score = "The score must be a number between 1 and 100";
    } else if(!/^([0-9]|[1-9][0-9]|100)$/.test(input.score)){errors.score = "The score must be from 1 to 100"}
    
    if (input.healthScore < 1 || input.healthScore > 100){
        errors.healthScore = 'The health score must be a number between 1 and 100';
    } else if (!/^([0-9]|[1-9][0-9]|100)$/.test(input.healthScore)){errors.healthScore = "The health score must be from 1 to 100" }
    
    if (!input.steps.length) errors.steps = 'Please detail the steps for your recipe';
    if (!input.dietTypes.length) errors.dietTypes = 'You must select at least one diet type';
    return errors;
}


export default function AddRecipe(){

    const dispatch = useDispatch();
    const diets = useSelector(state => state.dietTypes);
    const allState = useSelector(state =>state.recipes)
    const [errors,setErrors] = useState({});

    let key = 1
    
    

    const [input, setInput] = useState({
        name:"",
        image:"",
        summary:"",
        score:"",
        healthScore:"",
        steps:"",
        dietTypes:[],
    });

    useEffect(()=>{
        dispatch(getDiets())
        dispatch(getRecipes())
    },[dispatch]);


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        if(allState.find(recipe => recipe.name.toLowerCase() === e.target.value.toLowerCase())){
            setErrors({
                ...input,
                [e.target.name]: 'Recipe is found'
            })
        }
    };

    function handleCheckBox(e){
        let newarray = input.dietTypes;
        let find = newarray.indexOf(e.target.value);
        
        if(find >= 0 ){
            newarray.splice(find,1);
        }else{
            newarray.push(e.target.value)
        }

        setInput({
            ...input,
            dietTypes: newarray
        });
        setErrors(validate({
            ...input,
            [e.target.dietTypes] : e.target.value
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault();
        //input.steps = input.steps.split(" ")
        dispatch(addRecipe(input));
        alert("New recipe added successfully!");
        setInput({
            name:"",
            image:"",
            summary:"",
            score:"",
            healthScore:"",
            steps:"",
            dietTypes:[],
        });
    }



    return(
        <div className="divGral">
        {/* {console.log(diets)} */}
            <Link to={"/home"}> <button className="button">Go Back To Home</button> </Link>
            <h2 className="h2">Create your Recipe</h2>

            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="prueba12">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={e =>handleChange(e)}
                    />
                    {errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </div>
                <div className="prueba12">
                    <label>Image:</label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={e =>handleChange(e)}
                    />
                     {errors.image && (
                        <p className="errors">{errors.image}</p>
                    )}
                </div>
                <div className="prueba1">
                    <label>Summary:</label>
                    <input
                        type="text"
                        value={input.summary}
                        name="summary"
                        onChange={e =>handleChange(e)}
                    />
                    {errors.summary && (
                        <p className="errors">{errors.summary}</p>
                    )}
                </div>
                <div className="prueba12">
                    <label>Score:</label>
                    <input
                        type="text"
                        value={input.score}
                        name="score"
                        onChange={e =>handleChange(e)}
                    />
                    {errors.score && (
                        <p className="errors">{errors.score}</p>
                    )}
                </div>
                <div className="prueba2">
                    <label>Health Score:</label>
                    <input
                        type="text"
                        value={input.healthScore}
                        name="healthScore"
                        onChange={e =>handleChange(e)}
                    />
                    {errors.healthScore && (
                        <p className="errors">{errors.healthScore}</p>
                    )}
                </div>
                <div className="prueba12" >
                    <label>Steps:</label>
                    <input
                        type="text"
                        value={input.steps}
                        name="steps"
                        onChange={e =>handleChange(e)}
                    
                    />
                      {errors.steps && (
                        <p className="errors" >{errors.steps}</p>
                    )}
                </div>
                

                <div>
                    <label>Diet Types:</label>
                    
                    {diets.map(el =>{
                        return(
                            <div className="types">
                            <label>{el}</label>
                            <div className="types1">
                            <input 
                                type="checkbox"  
                                name={el}
                                value = {el}
                                selected ={input.dietTypes.includes(el)}
                                onChange={e=> handleCheckBox(e)}
                            />

                            </div>

                            
                            </div>
                        )
                    })}
                    {errors.dietTypes && (
                        <p className="errors">{errors.dietTypes}</p>
                    )}           
                </div>
                {/* <button type="submit"> Submit Recipe</button> */}
                <div>  

                    {((input.name !== '') && (!errors.name) && (input.summary !=='')) ?
                         
                             <button className="buttonEnd" type='submit'>Create</button>
                              :  input.name === ''? <p>Name is require</p>
                              :  <p>Summary is require</p>
                      }
                  </div> 
                {/* <Link to="/home"><button className="button">Go back to home</button></Link> */}

            </form>

        </div>
    )


};
