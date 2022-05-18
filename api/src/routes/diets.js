const { Router } = require('express');
const {Diet} = require("../db.js");
const router = Router();
const axios = require ("axios");
const {API_KEY,spoonacularUrl} = process.env;

const dietTypesDb=["gluten free","ketogenic","vegetarian","lacto vegetarian","ovo vegetarian","lacto ovo vegetarian","vegan","pescetarian","paleolithic","primal","fodmap friendly","whole 30","dairy free"]

router.get("/", async(req,res,next)=>{

    try{
        
        dietTypesDb.forEach(x =>{
            Diet.findOrCreate({
                where:{
                    name:x
                }
            })
        });
        
        let dietTypes = await Diet.findAll();
        
        res.send(dietTypes);
    }catch(error){
        next(error); 
    }
});

// router.get("/", async(req,res,next)=>{
//     const dietsApi = await axios.get(`${spoonacularUrl}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
//     //console.log(dietsApi.data)
//     const diets = dietsApi.data.results.map(el => el.diets)
//      const dietEach = diets.map(el => {
//          for(let i = 0 ; i < el.length;i++) return el[i]})
//     console.log(dietEach)
//     dietEach.forEach(el =>{
//         Diet.findOrCreate({
//             where:{name:el}
//         })
//     })
//     const allDiets = await Diet.findAll()
//     res.send(allDiets)
// })


module.exports = router;