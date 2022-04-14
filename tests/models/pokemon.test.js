/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { contentType } = require('express/lib/response');
const session = require('supertest');
const server = require('../../src/app.js');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  beforeEach(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  it("GET /pokemons should respond with an state 200", async ()=>{
    const response = await agent
    .get("/pokemons")
    expect(response.status).equal(200)
    expect(response.body).toHaveLength(41)
  })
  //   it("GET /pokemons/:id should be an array with 41 pokemons also to respond with an state 200", async ()=>{
  //   await agent
  //   .get("/pokemons/2")
  //   .expect(200)
  //   .expect(Object.keys()).toHaveLength(1)
  // })
  afterAll(()=>{
    app.close()
  })
})


// describe('Pokemon routes', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));

//   beforeEach(() => Pokemon.sync({ force: true })
//     .then(() => Pokemon.create(pokemon)));

//   describe('GET /pokemons', () => {
//     it('should get 200', () => {
//       agent.get("/pokemons")
//       .expect("Content-Type", /text/)
//       .expect(200)
      
//     }).timeout(3000);
    
//   });
//   describe('GET /pokemons/:id', () => {
//     it("Should get 200 when id is passed by parameters /pokemons/:id", async function(done){
      
//       await agent.get("/pokemons/2")
//       .expect("Content-Type", /text/)
//       .expect(res.status).equal(200)
//    }).timeout(6000)
    
//   });
// });



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


