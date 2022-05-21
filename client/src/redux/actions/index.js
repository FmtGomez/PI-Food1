import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_TYPE_DIET = "GET_TYPE_DIET";
export const GET_DETAILS_RECIPE = "GET_DETAILS_RECIPE";
export const ADD_RECIPE = "ADD_RECIPE";
export const FILTER_TYPE_DIET = "FILTER_TYPE_DIET";
export const ORDER_ALPHABETIC = "ORDER_ALPHABETIC";
export const ORDER_SCORE = "ORDER_SCORE";
export const REMOVE = "REMOVE"
export const LOCAL_HOST = "http://localhost:3001/api";

export function getRecipes() {
    return function(dispatch){
        axios.get(`${LOCAL_HOST}/recipes`)
        .then(response =>{
            return dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        }).catch((error)=>{
            console.log(error)
        });
    };
};

export function getDiets(){
    return async function(dispatch){
        try{
            let response = await axios.get(`${LOCAL_HOST}/types`);
            return dispatch({
                type: GET_TYPE_DIET,
                payload: response.data.map(diet => diet.name)
            });
        }catch(error){
            console.log(error)
        };
    };
};

export function detailsRecipe(id){
    return async function(dispatch){
        try{
            let response = await axios.get(`${LOCAL_HOST}/recipes/${id}`);
            return dispatch({
                type: GET_DETAILS_RECIPE,
                payload: response.data[0]
            });
        }catch(error){
            console.log(error)
        };
    };
};

export function getRecipeName(name){
    return async function (dispatch){

        try{
            let response = await axios.get(`${LOCAL_HOST}/recipes?name=${name}`);
            
            return dispatch({
                type: GET_RECIPE_NAME,
                payload: response.data
            })
        }catch{
            return alert("Recipe not found")
        };
    };
};




export function addRecipe(payload){
    return async function(){
        try{
            let response = await axios.post(`${LOCAL_HOST}/recipe`, payload);
            return response
        }catch(error){
            console.log(error)
        };
    };
};



export function filterTypeDiet(payload){
    return{
        type:FILTER_TYPE_DIET,
        payload
    };
};

export function orderAlphabetic(order){
    return {
        type: ORDER_ALPHABETIC,
        payload: order
    };
};

export function orderScore(score){
    return {
        type: ORDER_SCORE,
        payload: score
    };
};

export function remove(id){
    return{
        type: REMOVE,
        payload:id
    };
};
