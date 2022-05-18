import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../../redux/actions";


export function SearchBar(){
    
    const [search,searchState] = useState("")
    const dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault();
        dispatch(getRecipeName(search))
    };

    function onInputChange(e){
        searchState(e.target.value)
    };


    return(
        <div>
            <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} value={search}/>
            <input type="submit" value="Buscar" />
            </form>
        </div>
    )
}