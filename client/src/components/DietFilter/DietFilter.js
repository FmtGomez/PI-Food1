import React  from "react";
import { useDispatch } from "react-redux";
import { filterTypeDiet} from "../../redux/actions";


export function DietFilter(){
    
    const dispatch = useDispatch();

    function onFilterChange(e){
        e.preventDefault();
        dispatch(filterTypeDiet(e.target.value));
       
    }
    
    
    
    return(
        <div className="order-big">
            <select name="select" onChange={e=> onFilterChange(e)}>
                <option value="all">All</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto vegetarian">Lacto Vegetarian</option>
                <option value="ovo vegetarian">Ovo Vegetarian</option>
                <option value="lacto ovo">Lacto Ovo</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescetarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="fodmap friendly">Low Fodmap</option>
                <option value="whole 30">Whole 30</option>
                <option value="dairy free">Dairy Free</option>
                <option value="lacto ovo vegetarian">Lacto Ovo egetarian</option>
            </select>
           
        </div>
    )
};