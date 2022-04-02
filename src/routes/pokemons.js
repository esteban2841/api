const {Router} = require("express");
const routePokemons = Router();
const fetch = require("cross-fetch")
const {pagData, obtainAllPokemons, obtDbInfo} = require("../controllers/dataFunctions.js")


const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"




routePokemons.get("/", async (req, res)=>{

    const page = req.query.page
    const name = req.query.name
    // const dbInfo = obtDbInfo()
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
            img :  respuesta.id<10?`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${respuesta.id}.png`:`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${respuesta.id}.png`,
            types : respuesta.types,
            weight : respuesta.weight,
            stats : respuesta.stats
        })

    }))

    // pokemones.concat(dbInfo)
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
        // const dbInfo = obtDbInfo()
    
        const pokemones = await Promise.all(data.map(async poke=>{
            const data = await fetch(poke.url)
            const respuesta = await data.json()
            
            return({
                id: respuesta.id,
                height: respuesta.height,
                name : respuesta.name,
                img :  respuesta.id<10?`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${respuesta.id}.png`:`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${respuesta.id}.png`,
                types : respuesta.types,
                weight : respuesta.weight,
                stats : respuesta.stats
            })
    
        }))
        // pokemones.concat(dbInfo)
       res.send(pokemones)
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
            where: { name: type }
        })
        newPokemon.addType(typesDb);
        res.json('poke');

    } catch (error) {
        console.log(error);
    }

});


routePokemons.get("/all", async (req, res)=>{

    
    try{
        const data = await obtainAllPokemons()
       
        res.send(data)
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
