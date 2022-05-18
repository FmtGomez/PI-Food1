import React from "react";
import { useDispatch } from "react-redux";
import { orderAlphabetic } from "../../redux/actions";

export  function OrderAlpha(){
    const dispatch = useDispatch();

    function onSelectChange(e){
        dispatch(orderAlphabetic(e.target.value))
    }

    return(
        <div>
            <select name="select" onChange={onSelectChange}>
                <option value="ascendente">ascendente</option>
                <option value="descendente">descendente</option>
            </select>
        </div>
    )
}