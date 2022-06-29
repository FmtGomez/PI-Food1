import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../../redux/actions";
import "../SearchBar/SearchBar.css"


export function SearchBar(){

    const [search,searchState] = useState("")
    const dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault();
        
        search?dispatch(getRecipeName(search)): alert("oops! empty field")
       
    };

    function onInputChange(e){
        searchState(e.target.value)
    };


    return(
        <div className="prueba123">
            <form className="container_form" onSubmit={onSubmit}>
                <input className="input1" type="text" onChange={onInputChange} value={search} placeholder="Search..."/>
                <input className="input2" type="submit" value="🔍" />
            </form>
        </div>
    )
}