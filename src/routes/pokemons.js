const {Router} = require("express");
const routePokemons = Router();
const fetch = require("cross-fetch")
const {pagData, obtainAllPokemons} = require("../controllers/dataFunctions.js")

const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"




routePokemons.get("/", async (req, res)=>{

    const page = req.query.page
    const name = req.query.name
    
    if(page){
        const data = await pagData(page)


    const pokemones = await Promise.all(data.map(async poke=>{
        const data = await fetch(poke.url)
        const respuesta = await data.json()
        console.log(respuesta)
        return({
            id: respuesta.id,
            height: respuesta.height,
            name : respuesta.name,
            img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${respuesta.id}.png`,
            types : respuesta.types,
            weight : respuesta.weight,
            stats : respuesta.stats
        })

    }))
    
   res.send(pokemones)
    }else if(name){
        try{
            const data = await obtainAllPokemons()
            const pokeFiletered = data.filter(pokemon=>{
                return pokemon.name == name
            })
    
            res.send(pokeFiletered)
        }catch(error){
            console.log(error)
        }
    }else{

        const data = await pagData(1)
        
    
        const pokemones = await Promise.all(data.map(async poke=>{
            const data = await fetch(poke.url)
            const respuesta = await data.json()
            
            return({
                id: respuesta.id,
                height: respuesta.height,
                name : respuesta.name,
                img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${respuesta.id}.png`,
                types : respuesta.types,
                weight : respuesta.weight,
                stats : respuesta.stats
            })
    
        }))
        
       res.send(pokemones)
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
        console.log(error)
    }
   

})


module.exports = routePokemons
