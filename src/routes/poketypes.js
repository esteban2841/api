const {Router} = require("express");
const routerTypes = Router()
const {obtainTypes} = require("../controllers/dataFunctions.js")
const { Pokemon, Types } = require("../db");

routerTypes.get("/", async (req, res)=>{

    const data = await obtainTypes()
    
    const types = data.map(async type=>{
        return await Types.findOrCreate({
            where:{ name : type.name }
        })
    })

    const typesToDb = await Promise.all(types);
    const dbTypes = await Types.findAll();


    res.send(dbTypes)
   

})

module.exports = routerTypes;