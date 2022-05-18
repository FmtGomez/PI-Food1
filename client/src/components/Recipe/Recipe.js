import React from "react";


export default function Recipe({name,image,dietType,score,}){
    let key = 1
    
    return(
        <div  >
            {/* {console.log(dietType)} */}
            <h3>{name}</h3>
            <img src={image} alt="img"  />
            {/* {console.log(dietType)} */}
            
            {dietType?.map(el => <li key={key++}>{el.name?el.name:el}</li>)}
            
            {/* <p>{dietType+""}</p> */}
            {/* {dietType? dietType.map(el =>{
                return(
                    <li key={key++}>{el}</li>
                )
            }): dietType.map(el => {
                return(
                    <li>{el.name}</li>
                )
            })} */}
            <p >{`Score: ${score}`}</p>
        </div>
    )
}