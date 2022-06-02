import React from "react";
import { useDispatch } from "react-redux";
import { orderAlphabetic } from "../../redux/actions";
import "../OrderAlphabetic/OrderAlphabetic.css"

export  function OrderAlpha(){
    const dispatch = useDispatch();

    function onSelectChange(e){
        dispatch(orderAlphabetic(e.target.value))
    }

    return(
        <div className="order-big">
            <select defaultValue="" name="select" onChange={onSelectChange}>
                <option disabled value="" >Order A to Z</option>
                <option value="ascendente">A to Z</option>
                <option value="descendente">Z to A</option>
            </select>
        </div>
    )
}