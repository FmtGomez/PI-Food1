const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
const {API_KEY,spoonacularUrl,API_KEY1} = process.env;
const {Recipe,Diet} = require("../db.js")
const router = Router();

const getapiInfo = async ()=>{
    
    try{
        const apiInfoUrl = await axios.get(`${spoonacularUrl}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const {results} = apiInfoUrl.data
        let apiInfo = await results?.map(response =>{
            return{
                id: response.id, 
                name: response.title,
                summary: response.summary,
                healthScore: response.healthScore, 
                score: response.spoonacularScore,
                dietTypes:response.diets,
                dishType: response.dishTypes,
                vegetarian: response.vegetarian,
                vegan: response.vegan,
                glutenFree: response.glutenFree,
                dairyFree: response.dairyFree,
                image: response.image,
                steps: response.analyzedInstructions[0]?.steps.map(x=>{
                    return{
                        number:x.number,
                        step:x.step
                    };
                })

            };
        });
    
    return apiInfo;

    }catch(error){
        console.log(error);
        return([]);
    } ;   
};

const getDbInfo = async()=>{
    try{
        const infoDatabase = await Recipe.findAll({
            include:{
                model: Diet,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        });
       
        let dbInfo = await infoDatabase?.map(response =>{
            return{
                id: response.id,
                name: response.name,
                summary: response.summary,
                healthScore: response.healthScore,
                steps: response.steps,
                image: response.image,
                score: response.score,
                dietTypes: response.diets?response.diets: response.diets.map(x => x.name)

            }
        });
       return dbInfo;

     }catch(error){
         console.error(error);
     };
};
// const getDbInfo = async()=>{
//     return await Recipe.findAll({
//         include:{
//             model: Diet,
//             attributes:["name"],
//             through:{
//                 attributes:[],
//             }
//         }
//     })
// }

const getAllInfo = async()=>{
    try{
        const apiInformation = await getapiInfo();
        const dbInformation = await getDbInfo();
        const allInformation = apiInformation.concat(dbInformation);
        return allInformation;
    }catch(error){
        console.error(error)
    };
};

// const getApiByName = async (name)=>{
//     try{
//         const apiInfoUrl = await axios.get(`${spoonacularUrl}/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
//         const {results} = apiInfoUrl.data;

//         let apiInfo = await results?.map(response =>{
//             return{
//                 id: response.id,
//                 name: response.title,
//                 summary: response.summary,
//                 healthScore: response.healthScore,
//                 score: response.spoonacularScore,
//                 dietTypes:response.diets,
//                 dishType: response.dishTypes,
//                 vegetarian: response.vegetarian,
//                 vegan: response.vegan,
//                 glutenFree: response.glutenFree,
//                 dairyFree: response.dairyFree,
//                 image: response.image,
//                 steps: response.analyzedInstructions[0]?.steps.map(x=>{
//                     return{
//                         number:x.number,
//                         step:x.step
//                     };
//                 })

//             }
//         })
//         return apiInfo;

//     }catch(error){
//         console.error(error);
//         return ("error");
//     };
// };

// const getDBName = async(name)=>{
//     try{
//         const DataBaseInfo = await getDbInfo();
//         const nameFilter = DataBaseInfo.filter(x => x.name.include(name));
//         return nameFilter;
//     }catch(error){
//         console.error(error);
//         return ("error")
//     };
// };

// const getAllInfoByName = async(name)=>{
//     try{
//         const apyName = await getApiByName(name);
//         const dbName = await getDBName(name);
//         const allInfo = [...apyName, ...dbName];
//         return allInfo;
//     }catch(error){
//         console.error(error);
//         return ("error");
//     }
// };



// router.get("/", async (req,res,next)=>{
//     try{
//         const {name} = req.query;
//         if(name){
//             const dataByName = await getAllInfoByName(name);
//             if(dataByName !== "error" && dataByName.length > 0){
//                 res.status(200).json(dataByName);
//             }else{
//                 res.status(400).json({msg:"error!not found any recipes"});
//             };
//         }else{
//             const allData = await getAllInfo();
//             if(allData !== "error"){
//                 res.json(allData);
//             }else{
//                 res.status(404).json({msg: "Data search error" })
//             };
//         };
//     }catch(error){
//         next(error)
//     }
// });

router.get("/", async(req,res,next)=>{
    const name = req.query.name
    let recipestotal = await getAllInfo();
    if(name){
        let recipeName = await recipestotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        recipeName.length?
        res.status(200).send(recipeName):
        res.status(404).send("No esta la receta");
    }else{
        res.status(200).send(recipestotal);
    }
});

router.get("/:id", async(req,res,next)=>{
    const id = req.params.id
    let recipeTotal = await getAllInfo();
    if(id){
        let recipeId = await recipeTotal.filter(el => el.id == id)
        recipeId.length?
        res.status(200).json(recipeId):
        res.status(404).send("No se encontro la receta")
    }
})

router.delete("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        await Recipe.destroy({
            where:{
                id:id
            }
        }) 
        res.send("eliminado con exito")
    }catch(e){
        next(e)
    }
})

router.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let {name} = req.body
        const response = await Recipe.update(
            {
            name:name
        },
        {where:{id:id}}
            )
         res.send(`${response} done`)
    }catch(e){
        res.send(e)
    }
})

// router.get("/:id", async(req,res,next)=>{
//     try{
//         let {id} = req.params;
//         if(typeof id ==="string" && id.length > 10){
//             const dbData = await Recipe.findByPk(id,{
//                 include:{
//                     model: Diet,
//                     attributes:["name"],
//                     through:{
//                         attributes:[],
//                     }
//                 }
//             });
//             if(dbData){
//                 const dataId ={
//                     id: dbData.id,
//                     name: dbData.name,
//                     summary: dbData.summary,
//                     healthScore: dbData.healthScore,
//                     score: dbData.score,
//                     diets: dbData.diets?.map(x => x.name),
//                     steps: dbData.steps
//                 }
//                 res.status(200).json(dataId);
//             }else{
//                 res.status(400).send({msg:"data not found"})
//             };
//         }else{
//             const infoApi = await axios.get(`${spoonacularUrl}/recipes/${id}/information?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`);
//             //const {results} = infoApi.data;
//             console.log(infoApi.data.dishTypes)
//             let obj ={}
//             obj = {
//                 id: infoApi.data.id,
//                 name: infoApi.data.title,
//                 summary: infoApi.data.summary,
//                 healthScore: infoApi.data.healthScore,
//                 score: infoApi.data.score,
//                 dishTypes: infoApi.data.dishTypes,
//                 dietTypes: infoApi.data.dietTypes,
//                 image: infoApi.data.image,
//                 vegetarian: infoApi.data.vegetarian,
//                 vegan: infoApi.data.vegan,
//                 glutenFree: infoApi.data.glutenFree,
//                 dairyFree: infoApi.data.dairyFree,
//                 steps: infoApi.data.analyzedInstructions[0]?.steps.map(stp =>{
//                     return{
//                         number:stp.number,
//                         step: stp.step
//                     }
//                 })
//             }
//             if(obj){
                
//                 res.status(200).json(obj);
//             }else{
//                 res.status(400).send({msg:"data not found"});
//             }
//         }
//     }catch(error){
//         next(error)
//     }
// });





module.exports = router;

