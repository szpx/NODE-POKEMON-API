const bodyParser = require('body-parser')
const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const { success, getUniqueId } = require('./helper')
let pokemons = require('./mock-pockemon')

const app = express()
const port = 3000



app.use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(express.json())

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

app.get('/', (req,res) => res.send('Hello, Express la puissance!'))

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon à bien été trouvé'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons/', (req,res) => {
    const message = 'la liste de pokémon à bien été trouvé'
    res.json(success(message, pokemons))
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
});