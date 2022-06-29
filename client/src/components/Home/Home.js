import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTypeDiet, getRecipes } from "../../redux/actions";
import { DietFilter } from "../DietFilter/DietFilter";
import { OrderAlpha } from "../OrderAlphabetic/OrderAlphabetic.js";
import { OrderScore } from "../OrderScore/OrderScore.js";
import { Loader } from "../Loader/Loader.js";
import Recipe from "../Recipe/Recipe.js";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { Paged } from "../Paged/Paged.js";
import { Link } from "react-router-dom";
import Error404 from "../Error404/Error404"
import "../Home/Home.css"



export default function Home() {

    let key = 1
    let recipes = useSelector((state) => state.recipes);
    let dispatch = useDispatch();

    //paginado

    const [page, setPage] = useState(1);//pagina actual
    const [recipesPage] = useState(9);//cantidad de recetas por pagina

    const quantityRecipePage = page * recipesPage; // indice de mi ultima receta de la pagina
    const firstRecipePage = quantityRecipePage - recipesPage;//indice de la primer receta de la pagina
    const showRecipesPage = recipes.slice(firstRecipePage, quantityRecipePage);// slice toma una parte del arreglo segun parametros (del 1 al 9)

    const paged = function (pageNumber) {
        setPage(pageNumber);
    };

    const nextpaged = function () {
        setPage(page + 1)
    }

    const previuspaged = function () {
        setPage(page - 1)
    }


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    function onFilterChange(e){
        e.preventDefault();
        dispatch(filterTypeDiet(e.target.value));
    }
   
    // console.log(recipes)

    return (
        <div className="divgral">
            <nav className="hero">
                <div className="searchBar">
                    <SearchBar />
                </div>
                <div className="orderAlpha">
                    <OrderAlpha />
                </div>
                <div className="orderScore">
                    <OrderScore />
                </div>
                <div className="dietFilter">
                    <DietFilter />
                </div>
                <div>
                    <Link to="/recipe"><button className="button">Create Recipe</button> </Link>
                </div>
            </nav>
               {/* <div>
                <button className="reload" value="all" onClick={e => onFilterChange(e)}>Reload Home</button>
               </div> */}

        
            <div className="paged">
                <Paged recipes={recipes.length} recipesPage={recipesPage} paged={paged} page={page} nextpaged={nextpaged} previuspaged={previuspaged} />
            </div>
            <div className="recipes">
                {
                    recipes.length===0?<Error404/>:null
                }

                {
                    recipes.length > 0 ? showRecipesPage?.map(recipe => {
                    return <Recipe id={recipe.id} name={recipe.name} image={recipe.image} dietType={recipe.dietTypes ? recipe.dietTypes : recipe.diets?.map(el => el.name)} score={recipe.healthScore} key={key++} />

                }): <Loader/>}

            </div>
        </div>
    )
};