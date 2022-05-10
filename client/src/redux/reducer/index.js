import { GET_RECIPES } from "../actions";

const initialState ={
    recipes:[],
    allRecipes:[],
    dietRecipes:[],
    recipeDetail:[]
};


export function rootReducer(state = initialState,action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes:action.payload
            }
            default:
                return state
    }
};


