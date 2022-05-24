import React from "react";
import { useDispatch } from "react-redux";
import { filterTypeDiet } from "../../redux/actions";


export function DietFilter(){
    
    const dispatch = useDispatch();
    
    function onFilterChange(e){
        e.preventDefault();
        dispatch(filterTypeDiet(e.target.value));
       
    }
    
    
    
    return(
        <div>
            <select name="select" onChange={e=> onFilterChange(e)}>
                <option value="all">all</option>
                <option value="gluten free">gluten free</option>
                <option value="ketogenic">ketogenic</option>
                <option value="vegetarian">vegetarian</option>
                <option value="lacto vegetarian">lacto vegetarian</option>
                <option value="ovo vegetarian">ovo vegetarian</option>
                <option value="lacto ovo">lacto ovo</option>
                <option value="vegan">vegan</option>
                <option value="pescatarian">pescetarian</option>
                <option value="paleolithic">paleolithic</option>
                <option value="fodmap friendly">low fodmap</option>
                <option value="whole 30">whole 30</option>
                <option value="dairy free">dairy free</option>
                <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
            </select>
           
        </div>
    )
};