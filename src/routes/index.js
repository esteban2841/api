const { Router } = require('express');
const routePokemons = require("./pokemons.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use("/pokemons", routePokemons)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
