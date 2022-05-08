const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
const {APY_KEY,spoonacularUrl} = process.env;
const {Recipe,Diet} = require("../db.js")
const router = Router();

const getapiInfo = async ()=>{
    
    try{
        const apiInfoUrl = await axios.get(`${spoonacularUrl}/recipes/complexSearch?apyKey=${APY_KEY}&addRecipeInformation=true&number=100`);
        const {results} = apiInfoUrl.data
        let apiInfo = await results?.map(response =>{
            return{
                id: response.id,
                name: response.title,
                summary: response.summary,
                healthScore: response.healthScore,
                score: response.spoonacularScore,
                dietTypes:response.diets,
                dishType: response.dietTypes,
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
                model:Diet,
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
                diets: response.diets?.map(x => x.name)

            }
        });
        return dbInfo;

    }catch(error){
        console.error(error);
    };
};


const getAllInfo = async()=>{
    try{
        const apiInformation = await getapiInfo();
        const dbInformation = await getDbInfo();
        const allInformation = [...apiInformation,...dbInformation];
        return allInformation;
    }catch(error){
        console.error(error)
    };
};

const getApiByName = async (name)=>{
    try{
        const apiInfoUrl = await axios.get(`${spoonacularUrl}/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${APY_KEY}`);
        const {results} = apiInfoUrl.data;

        let apiInfo = await results?.map(response =>{
            return{
                id: response.id,
                name: response.title,
                summary: response.summary,
                healthScore: response.healthScore,
                score: response.spoonacularScore,
                dietTypes:response.diets,
                dishType: response.dietTypes,
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

            }
        })
        return apiInfo;

    }catch(error){
        console.error(error);
        return ("error");
    };
};

const getDBName = async(name)=>{
    try{
        const DataBaseInfo = await getDbInfo();
        const nameFilter = DataBaseInfo.filter(x => x.name.include(name));
        return nameFilter;
    }catch(error){
        console.error(error);
        return ("error")
    };
};

const getAllInfoByName = async(name)=>{
    try{
        const apyName = await getApiByName(name);
        const dbName = await getDBName(name);
        const allInfo = [...apyName, dbName];
        return allInfo;
    }catch(error){
        console.error(error);
        return ("error");
    }
};

router.get("/", async (req,res,next)=>{
    try{
        const {name} = req.query;
        if(name){
            const dataByName = await getAllInfoByName(name);
            if(dataByName !== "error" && dataByName.length > 0){
                res.status(200).json(dataByName);
            }else{
                res.status(400).json({msg:"error!not found any recipes"});
            };
        }else{
            const allData = await getAllInfo();
            if(allData !== "error"){
                res.json(allData);
            }else{
                res.status(404).json({msg: "Data search error" })
            };
        };
    }catch(error){
        next(error)
    }
});

router.get("/:id", async(req,res,next)=>{
    try{
        let {id} = req.params;
        if(id.length > 11){
            const dbData = await Recipe.findByPk(id,{
                include:{
                    model: Diet,
                    attributes:["name"],
                    through:{
                        attributes:[],
                    }
                }
            });
            if(dbData){
                const dataId ={
                    id: dbData.id,
                    name: dbData.name,
                    summary: dbData.summary,
                    healthScore: dbData.healthScore,
                    score: dbData.score,
                    diets: dbData.diets?.map(x => x.name),
                    steps: dbData.steps
                }
                res.status(200).json(dataId);
            }else{
                res.status(400).send({msg:"data not found"})
            };
        }else{
            const infoApi = await axios.get(`${spoonacularUrl}/recipes/${id}/information?apiKey=${APY_KEY}&addRecipeInformation=true&number=100`);
            //const {results} = infoApi.data;
            //console.log(infoApi.data)
            let obj ={}
            obj = {
                id: infoApi.data.id,
                name: infoApi.data.title,
                summary: infoApi.data.summary,
                healthScore: infoApi.data.healthScore,
                score: infoApi.data.score,
                dishType: infoApi.data.dishType,
                dietTypes: infoApi.data.dietTypes,
                image: infoApi.data.image,
                vegetarian: infoApi.data.vegetarian,
                vegan: infoApi.data.vegan,
                glutenFree: infoApi.data.glutenFree,
                dairyFree: infoApi.data.dairyFree,
                steps: infoApi.data.analyzedInstructions[0]?.steps.map(stp =>{
                    return{
                        number:stp.number,
                        step: stp.step
                    }
                })
            }
            if(obj){
                
                res.status(200).json(obj);
            }else{
                res.status(400).send({msg:"data not found"});
            }
        }
    }catch(error){
        next(error)
    }
});


module.exports = router;

