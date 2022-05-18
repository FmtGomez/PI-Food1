import React from "react";
import { Link } from "react-router-dom";

export default function Error404(){
    return(
        <div>
        <h2>Opss!! nothing here</h2>
        <Link to="/home"><button>Go Back To Home</button> </Link>

        </div>
    )
}