import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import { DietFilter } from "../DietFilter/DietFilter";
import { OrderAlpha } from "../OrderAlphabetic/OrderAlphabetic.js";
import { OrderScore } from "../OrderScore/OrderScore.js";
import Recipe from "../Recipe/Recipe.js";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { Paged } from "../Paged/Paged.js";
import { Link } from "react-router-dom";
import "../Home/Home.css"



export default function Home() {

    let key = 1
    let recipes = useSelector((state) => state.recipes);
    let dispatch = useDispatch();

    //paginado

    const [page, setPage] = useState(1);
    const [recipesPage] = useState(9);

    const quantityRecipePage = page * recipesPage;
    const firstRecipePage = quantityRecipePage - recipesPage;
    const showRecipesPage = recipes.slice(firstRecipePage, quantityRecipePage);

    const paged = function (pageNumber) {
        setPage(pageNumber);
    };


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);



    // console.log(recipes)

    return (
        <div className="divgral">
            <nav className="nav">
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
            <div>
                <Paged recipes={recipes.length} recipesPage={recipesPage} paged={paged} />
            </div>
            <div className="recipes">
                {showRecipesPage?.map(recipe => {
                    return <Link to={"/home/" + recipe.id} key={key++}>
                        <Recipe name={recipe.name} image={recipe.image} dietType={recipe.dietTypes ? recipe.dietTypes : recipe.diets?.map(el => el.name)} score={recipe.score} key={key++} />
                    </Link>

                })}

            </div>
        </div>
    )
};