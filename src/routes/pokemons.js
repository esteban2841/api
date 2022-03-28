const {Router} = require("express");
const routePokemons = Router();
const fetch = require("cross-fetch")


const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"



const obtainData = async ()=>{
    const data = await fetch(urlBase)
    const res = await data.json()
    return res.results
}

const obtainAllPokemons = async ()=>{
    const data = await obtainData();
    const allPokemons = await Promise.all(data.map(async poke=>{
        const data = await fetch(poke.url)
        const respuesta = await data.json()
        
        return({
            id: respuesta.id,
            height: respuesta.height,
            name : respuesta.name,
            img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${respuesta.id}.png`,
            types : respuesta.types
        })
    }))
    return allPokemons
}
const pagData = async ( pag )=>{
    const data = await obtainData()
    if(pag == 1){
        const dataFilter = data.slice((pag - 1), (pag * 12))
        return dataFilter
    }else{
        const dataFilter = data.slice((pag -1)* 12 , (pag) * 12);
        return dataFilter
    }
}

routePokemons.get("/", async (req, res)=>{

    const page = req.query.page
    
    if(page){
        const data = await pagData(page)


    const pokemones = await Promise.all(data.map(async poke=>{
        const data = await fetch(poke.url)
        const respuesta = await data.json()
        
        return({
            id: respuesta.id,
            height: respuesta.height,
            name : respuesta.name,
            img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${respuesta.id}.png`,
            types : respuesta.types
        })

    }))
    
   res.send(pokemones)
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
                types : respuesta.types
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
routePokemons.post("/", async (req, res)=>{


    const data = req.body


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
