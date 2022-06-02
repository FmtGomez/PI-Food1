import React from "react";
import { useDispatch } from "react-redux";
import { orderScore } from "../../redux/actions";

export  function OrderScore(){

    
    const dispatch = useDispatch()

    function onScoreChange(e){
        e.preventDefault()
        dispatch(orderScore(e.target.value))
       
    }

    return(
        <div className="order-big">
            <select defaultValue="prueba" name="select" onChange={onScoreChange}>
                <option disabled value="prueba" >Score</option>
                <option value="mayor" >Max</option>
                <option value="menor" >Min</option>
            </select>

        </div>
    )
};