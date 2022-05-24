import React, { Component } from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getRecipeName } from "../../redux/actions";
import "../SearchBar/SearchBar.css"


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
            <input className="buscar" type="submit" value="Buscar" />
            </form>
        </div>
    )
}