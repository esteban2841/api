const {Router} = require("express");
const routePokemons = Router();
const fetch = require("cross-fetch")
const {pagData, obtainAllPokemons, obtDbInfo} = require("../controllers/dataFunctions.js")
const {Pokemon, Types } = require("../db.js")

const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"


// routePokemons.get("/", async (req, res)=>{

<<<<<<< HEAD
//     const page = req.query.page
//     const name = req.query.name
//     // const dbInfo = await obtDbInfo()
//     if(page){
//         const data = await pagData(page)
=======

// routePokemons.get("/", async (req, res)=>{

//     const page = req.query.page
//     const name = req.query.name
//     // const dbInfo = await obtDbInfo()
//     if(page){
//         try{

//             const data = await pagData(page)
//         }catch(error){
//             console.log(error)
//         }



   // const pokemones = await Promise.all(data.map(async poke=>{
    //     const data = await fetch(poke.url)
    //     const respuesta = await data.json()
    //     const types = respuesta.types.map(t=>{
    //         return {name :t.type.name}
    //     })
    //     const stats = respuesta.stats.map(t=>{
    //         return{
    //             name: t.stat.name,
    //             value: t.base_stat
    //         } 
    //     })
        
    //     return({
    //         id: respuesta.id,
    //         height: respuesta.height,
    //         name : respuesta.name,
    //         img :  respuesta.id<10?`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${respuesta.id}.png`:`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${respuesta.id}.png`,
    //         types : types,
    //         weight : respuesta.weight,
    //         stats : stats
    //     })

    // }))

>>>>>>> 67de17c76718dbfc7000e5e45a8a5955f007c1cf
    
// //    res.send([...dbInfo,...pokemones])
//     res.send(data)
//     }else if(name){
//         try{
//             const data = await obtainAllPokemons()
//             // const dbInfo = await obtDbInfo()
//             // const all = [...dbInfo,...data]
//             const pokeFiletered = data.filter(pokemon=>{
//                 return pokemon.name == name
//             })
            
//             res.send(pokeFiletered)
//         }catch(error){
//             console.log(error)
//         }
//     }else{

//         const data = await pagData(1)
//         // 
//         res.send(data)
//     }
    

// })

routePokemons.get('/', async (req,res)=>{
    const data = await obtainAllPokemons()
    const name = req.query.name
    console.log(name)
    if(name){
        try{
            const data = await obtainAllPokemons()
            const pokeFiletered = data.filter(pokemon=>{
                return pokemon.name == name
            })
            res.sendStatus(200).send(pokeFiletered)
        }catch(error){
            
            console.log(error)
            res.sendStatus(400)
        }
    }else{
        res.send(data)
    }
} )

routePokemons.post('/', async (req, res) => {
    const {name, img, height, weight, type1, type2 } = req.body;
    
    try {
        //lo creo
        let newPokemon = await Pokemon.create({
            name, img, height, weight
        })
        let typesDb1 = await Types.findOne({
            
            where: {name : type1}
        })
        let typesDb2 = await Types.findOne({
            
            where: {name : type2}
        })
        await newPokemon.addType(typesDb1)
        await newPokemon.addType(typesDb2)
        
        res.json((newPokemon.toJSON())).sendStatus(200);
        
    } catch (error) {
        res.sendStatus(400)
        console.log(error);
    }

});


routePokemons.get("/all", async (req, res)=>{

    // const dbInfo = await obtDbInfo()
    try{
        const data = await obtainAllPokemons()
       
        res.send(data).sendStatus(200)
        
    }catch(error){
        res.sendStatus(400)
        console.log(error)
    }
   

})


routePokemons.get("/:id", async (req, res)=>{

    const id = req.params.id


    try{
        const data = await obtainAllPokemons()
        const pokeFiletered = data.filter(pokemon=>{
            return pokemon.id == id
        })
        res.send(pokeFiletered)
    }catch(error){
        res.sendStatus(400)
        console.log(error)
    }
   

})


module.exports = routePokemons
