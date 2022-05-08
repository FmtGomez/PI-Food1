const { Router } = require('express');
const {Diet} = require("../db.js");
const router = Router();

router.get("/", async(req,res,next)=>{

    try{
        const dietTypesDb=["gluttenFree","ketogenic","vegetarian","lacto_vegetarian","ovo_vegetarian","lacto ovo vegetarian","vegan","pescetarian","paleolithic","primal","low fodmap","whole 30","dairy free"]
        
        dietTypesDb.forEach(x =>{
            Diet.findOrCreate({
                where:{
                    name:x
                }
            })
        });
        
        let typesDiet = await Diet.findAll();
        res.json(typesDiet);
    }catch(error){
        next(error); 
    }
});

module.exports = router;