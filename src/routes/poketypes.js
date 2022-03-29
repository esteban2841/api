const {Router} = require("express");
const routerTypes = Router()
const {obtainTypes} = require("../controllers/dataFunctions.js")

routerTypes.get("/", async (req, res)=>{

    const data = await obtainTypes()
    
    res.send(data)
   

})

module.exports = routerTypes;