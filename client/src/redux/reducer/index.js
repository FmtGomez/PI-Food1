import { GET_RECIPES,GET_TYPE_DIET,GET_DETAILS_RECIPE,ADD_RECIPE,GET_RECIPE_NAME,FILTER_TYPE_DIET,ORDER_ALPHABETIC,ORDER_SCORE, REMOVE, CREATED} from "../actions";


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
                    if(a.name.toLowerCase() < b.name.toLowerCase()){
                        return action.payload ==="ascendente"? -1 : 1;
                    }
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
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
                    if(a.healthScore < b.healthScore){
                        return action.payload === "mayor"? -1 : 1
                    }
                    if(a.healthScore > b.healthScore){
                        return action.payload === "mayor"? 1: -1;
                    }
                });
                return{
                    ...state,
                    recipes: orderScore
                };
                
                
                case FILTER_TYPE_DIET:
                    let allbyRecipes = state.allRecipes;
                    let dietFilter = action.payload === "all"? allbyRecipes?allbyRecipes:null: allbyRecipes.filter(x => x.dietTypes?.some(d => d.name? d.name === action.payload: d ===action.payload))
                    

                    let array =[]
                    for(let i = 0; i< allbyRecipes.length;i++){
                        if( allbyRecipes[i].vegetarian === true){
                            array.push(allbyRecipes[i])
                        }
                    }

                    
                    let finalFilter = []
                    dietFilter.forEach(el =>{
                        if(!array.includes(el)){
                            finalFilter.push(el)
                        }
                    });
                    array.forEach(el=>{
                        if(!dietFilter.includes(el)){
                            finalFilter.push(el)
                        }
                    });

                    return{
                        ...state,
                        recipes: action.payload==="vegetarian"? finalFilter: dietFilter
                    };
                
            default:
                return state
    }
};


