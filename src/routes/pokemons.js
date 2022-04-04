const {Router} = require("express");
const routePokemons = Router();
const fetch = require("cross-fetch")
const {pagData, obtainAllPokemons, obtDbInfo} = require("../controllers/dataFunctions.js")
const {Pokemon, Types} = require("../db.js")

const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"




routePokemons.get("/", async (req, res)=>{

    const page = req.query.page
    const name = req.query.name
    const dbInfo = await obtDbInfo()
    if(page){
        const data = await pagData(page)


    const pokemones = await Promise.all(data.map(async poke=>{
        const data = await fetch(poke.url)
        const respuesta = await data.json()
        const types = respuesta.types.map(t=>{
            return t.type.name
        })
        const stats = respuesta.stats.map(t=>{
            return{
                name: t.stat.name,
                value: t.base_stat
            } 
        })
        
        return({
            id: respuesta.id,
            height: respuesta.height,
            name : respuesta.name,
            img :  respuesta.id<10?`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${respuesta.id}.png`:`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${respuesta.id}.png`,
            types : types,
            weight : respuesta.weight,
            stats : stats
        })

    }))

    
   res.send([...dbInfo,...pokemones])
    }else if(name){
        try{
            const data = await obtainAllPokemons()
            const dbInfo = await obtDbInfo()
            const pokeFiletered = data.filter(pokemon=>{
                return pokemon.name == name
            })
            
            res.send([...dbInfo,...pokeFiletered])
        }catch(error){
            console.log(error)
        }
    }else{

        const data = await pagData(1)
        const dbInfo = await obtDbInfo()
    
        const pokemones = await Promise.all(data.map(async poke=>{
            const data = await fetch(poke.url)
            const respuesta = await data.json()
            const types = respuesta.types.map(t=>{
                return t.type.name
            })
            const stats = respuesta.stats.map(t=>{
                return{
                    name: t.stat.name,
                    value: t.base_stat
                } 
            })
            
            return({
                id: respuesta.id,
                height: respuesta.height,
                name : respuesta.name,
                img :  respuesta.id<10?`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${respuesta.id}.png`:`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${respuesta.id}.png`,
                types : types,
                weight : respuesta.weight,
                stats : stats
            })
        }))
        
        res.send([...dbInfo,...pokemones])
    }
    

})

routePokemons.post('/', async (req, res) => {
    const {name, img, height, weight, types } = req.body;

    try {
        //lo creo
        let newPokemon = await Pokemon.create({
            name, img, height, weight, types
        })
        let typesDb = await Types.findAll({
            where: { name: types }
        })
        newPokemon.addType(typesDb);
        res.json(console.log('poke creado'));

    } catch (error) {
        console.log(error);
    }

});


routePokemons.get("/all", async (req, res)=>{

    const dbInfo = await obtDbInfo()
    try{
        const data = await obtainAllPokemons()
       
        res.send([...dbInfo,...data])
    }catch(error){
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
        console.log(error)
    }
   

})


module.exports = routePokemons
