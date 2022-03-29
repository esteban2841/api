const fetch = require("cross-fetch")

const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
const urlTypes = "https://pokeapi.co/api/v2/type"

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

const obtainTypes = async ()=>{
    const data = await fetch(urlTypes)
    const res = await data.json()
    return res.results
}
module.exports.pagData = pagData;
module.exports.obtainAllPokemons = obtainAllPokemons;
module.exports.obtainData = obtainData;
module.exports.obtainTypes = obtainTypes;
