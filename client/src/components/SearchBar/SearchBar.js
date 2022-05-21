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

//  class SearchBar extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = { search: "" }
//         //console.log(this)
//     }
    
//     onInputChange(e) {
//         this.setState({ search: e.target.value })
//     }
//     onSubmit(e) {
//         e.preventDefault();
//         this.props.getRecipeName(this.state.search)
//     }
    
//     render() {
//         {console.log(this)}
//         const {search} = this.state;
//         return (
//             <div>
//                 <form onSubmit={(e)=>this.onSubmit(e)}>
//                     <input type="text" onChange={(e)=>this.onInputChange(e)} value={search} />
//                     <input className="buscar" type="submit" value="Buscar" />
//                 </form>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state){
//     return{
//         recipes:  state.recipes
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         getRecipeName: (name) => dispatch(getRecipeName(name))
//     }
// }

// export default connect( mapStateToProps , mapDispatchToProps)(SearchBar);