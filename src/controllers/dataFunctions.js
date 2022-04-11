const fetch = require("cross-fetch")
const { Pokemon, Types } = require("../db.js")
const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
const urlTypes = "https://pokeapi.co/api/v2/type"

const obtainData = async ()=>{
    const data = await fetch(urlBase)
    const res = await data.json()
    return res.results
}

const obtDbInfo = async ()=>{
    return await Pokemon.findAll({
        include:{
            model: Types,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
}

const obtainAllPokemons = async ()=>{
    const data = await obtainData();
    const dbInfo= await obtDbInfo()
    const dbModified = dbInfo.map(pCreated=>{
        return {
            img: pCreated.img,
            createdInDb: pCreated.createdInDb,
            id: pCreated.id,
            height: pCreated.height,
            name : pCreated.name,
            img :  pCreated.img,
            types : pCreated.types,
            weight : pCreated.weight,
            stats : [{name: "hp" ,value: pCreated.hp},{name: "attack", value: pCreated.attack},{name: "defense",value: pCreated.defense},{name: "speed",value: pCreated.speed}],
            createdInDb: true
        }
    })
    
    const allPokemons = await Promise.all(data.map(async poke=>{
        
        const data = await fetch(poke.url)
        const respuesta = await data.json()
           const types = respuesta.types.map(t=>{
            return {name :t.type.name}
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
            stats : stats,
            createdInDb: false,
        })

    }))

    
    return [...dbModified,...allPokemons]
}

// const pagData = async ( pag )=>{

//     const data = await obtainAllPokemons()
//     if(pag == 1){
//         const dataFilter = data.slice((pag - 1), (pag * 12))
//         return dataFilter
//     }else{
//         const dataFilter = data.slice((pag -1)* 12 , (pag) * 12);
//         return dataFilter
//     }

// }

const obtainTypes = async ()=>{
    const data = await fetch(urlTypes)
    const res = await data.json()
    return res.results
}
// module.exports.pagData = pagData;
module.exports.obtainAllPokemons = obtainAllPokemons;
module.exports.obtainData = obtainData;
module.exports.obtainTypes = obtainTypes;
module.exports.obtDbInfo = obtDbInfo;
