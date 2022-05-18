const { Router } = require('express');
const {Recipe,Diet} = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", async(req,res,next)=>{

    try{
        const { name,summary,score,healthScore,steps,dietTypes,image,} = req.body;
        const newRecipe = await Recipe.create({
            name,summary,score,healthScore,steps,image
        });
        
         let dietTypesRecipeDb = await Diet.findAll({
             where: {name:dietTypes}
         });
         
         
        newRecipe.addDiet(dietTypesRecipeDb);
        console.log(newRecipe)
        res.send(newRecipe);
    }catch(error){
        next(error)
    };

});


module.exports = router;
