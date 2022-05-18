import { GET_RECIPES,GET_TYPE_DIET,GET_DETAILS_RECIPE,ADD_RECIPE,GET_RECIPE_NAME,FILTER_TYPE_DIET,ORDER_ALPHABETIC,ORDER_SCORE} from "../actions";


const initialState ={
    recipes:[],
    allRecipes:[],
    dietTypes:[],
    recipeDetail:{}
};


export function rootReducer(state = initialState,action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes:action.payload
            };
            case GET_DETAILS_RECIPE:
               
            return{
                    ...state,
                    recipeDetail: action.payload
                };
            case GET_TYPE_DIET:
                return{
                    ...state,
                    dietTypes: action.payload,
                };
            case ADD_RECIPE:
                return{
                    ...state,                  
                };
            case GET_RECIPE_NAME:
                return{
                    ...state,
                    recipes: action.payload
                };
            case ORDER_ALPHABETIC:
                let orderRecipe = [...state.recipes]
                orderRecipe = orderRecipe.sort((a,b)=>{
                    if(a.name < b.name){
                        return action.payload ==="ascendente"? -1 : 1;
                    }
                    if(a.name > b.name){
                        return action.payload ==="ascendente"? 1 : -1;
                    }
                    return 0;
                });                
                return{
                    ...state,
                    recipes: orderRecipe

                };
            case ORDER_SCORE:
                let orderScore = [...state.recipes]
                orderScore = orderScore.sort((a,b)=>{
                    if(a.score < b.score){
                        return action.payload === "mayor"? -1 : 1
                    }
                    if(a.score > b.score){
                        return action.payload === "mayor"? 1: -1;
                    }
                });
                return{
                    ...state,
                    recipes: orderScore
                };
                
                
                case FILTER_TYPE_DIET:
                    let allbyRecipes = state.allRecipes;
                    //console.log(action.payload)
                    let dietFilter = action.payload === "all"? allbyRecipes?allbyRecipes:null: allbyRecipes.filter(x => x.dietTypes?.some(d => d.name? d.name === action.payload: d ===action.payload))
                    
                    //let dietFilterDb =  action.payload === "all"? allbyRecipes: allbyRecipes.filter(x => x.diets?.some(d => d.name === action.payload))
                    // let array =[]
                    // for(let i = 0; i< dietFilter.length;i++){
                    //     if( dietFilter[i].vegetarian === true){
                    //         array.push(dietFilter[i])
                    //     }
                    // }
                    //let finalFilter = dietFilter.concat(dietFilterDb) 
                    let finalFilter = dietFilter
                    return{
                        ...state,
                        recipes: finalFilter
                    }
            default:
                return state
    }
};


