const { Router } = require('express');
const routePokemons = require("./pokemons.js")
const ruoteTypes = require("./poketypes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use("/pokemons", routePokemons)
router.use("/types", ruoteTypes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
