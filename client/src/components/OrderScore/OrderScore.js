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
        <div>
            <select name="select" onChange={onScoreChange}>
                <option value="mayor" >menor</option>
                <option value="menor" >mayor</option>
            </select>

        </div>
    )
};