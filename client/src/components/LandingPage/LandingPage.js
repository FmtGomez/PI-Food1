import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css"
import img from "../../img/img.jpg"

export default function LandingPage() {
    return (
        <div className="main">

            
                <div className="bg-button">
                    <Link to="/home">
                        <button className="btn btn2">Enter</button>
                    </Link>
                </div>
                <div className="bg-img">
                    {/* <img src={img} /> */}
                </div>
                <div className="text">
                    <h1 >THIS IS <span>HENRY FOOD</span> </h1>
                </div>
                <div className="text para">
                    <p >Do you like to cook? Welcome to the paradise of recipes</p>
                </div>
                <div className="line"></div>
                


        </div>
    )
}