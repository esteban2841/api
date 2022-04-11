/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { download } = require('express/lib/response');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons', () => {
    it('should get 200', () => {
      return agent.get('/pokemons').expect(200).done()
    });
    it("Should get 200 when id is passed by parameters /pokemons/:id",function(){
       return agent.get("/pokemons/2").expect(200).done()
    })
  });
});

// const { Pokemon, Type, conn } = require("../../src/db");
// const dataFunctions = require("../../src/controllers/dataFunctions.js")
// const session = require("supertest-session")
// const app = require('../../src/app.js');

// console.log(dataFunctions.obtainAllPokemons())

// const pokemon = {
//     name: "laurachu",
// }
// const agent = session(app)
// describe("Pokemons routes", () => {


//     before(() => conn.authenticate()
//         .catch((err) => {
//         console.error("Can't reach DataBase", err);
//     }));

//     beforeEach(()=> Pokemon.sync({force:true}))
//     .then(()=>Pokemon.create(pokemon))
//     describe("dataFunctions is the main model's function returns more than 40 pokemons combining db and api", function(){
//         it("Returns and array with more than 40 pokemons", function(){
//             return expect(dataFunctions.obtainAllPokemons().toHaveLenght(40))
//         })
//     })
// })


