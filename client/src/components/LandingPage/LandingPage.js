import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css"

export default function LandingPage() {
    return (
        <div >

            <div className="LandingPage">
                <div>
                    <h1 className="title">HENRY FOOD</h1>
                </div>
                <div>
                    <p className="text">Do you like to cook? Welcome to the paradise of recipes</p>
                </div>
                <div>
                    <Link to="/home">
                        <button className="homeButton">Enter</button>
                    </Link>
                </div>
            </div>


        </div>
    )
}