const { Router } = require('express');
const {Pokemon, Type} = require('../db.js');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getInitialApiInfo = async() => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const apiData = await apiUrl.data
    const pokemons = []

    const data = {
        next: apiData.next,
        pokemons: pokemons
    }

    await apiData.results.map(e => {
        pokemons.push({
            name: e.name,
            url: e.url
        })
    })

    data.pokemons = pokemons

    return data
}

const getNextInfo = async(next, pokemons) => {
    const nextUrl = await axios.get(next)
    const nextData = await nextUrl.data
    const newPokemons = []

    const newData = {
        next: nextData.next,
        pokemons: newPokemons
    }

    await nextData.results.map(e => {
        newPokemons.push({
            name: e.name,
            url: e.url
        })
    })

    newData.pokemons = await pokemons.concat(newPokemons)
    newData.next = nextData.next

    return newData
}

const getAllPokemons = async() => {
    const initialData = await getInitialApiInfo()
    const nextData = await getNextInfo(initialData.next,initialData.pokemons)
    
    const pokemons = await nextData.pokemons.map(async (e) => {
        const pokemonUrl = await axios.get(e.url)
        const pokemonStatsData = await pokemonUrl.data
        let stats = []

        await pokemonStatsData.stats.map(e => {
            stats.push(e.base_stat)
        })

        return {
            name: pokemonStatsData.name,
            health: stats[0],
            attack: stats[1],
            defense: stats[2],
            speed: stats[5],
            height: pokemonStatsData.height,
            weight: pokemonStatsData.weight,
            created: false
        }
        
    })

    return Promise.all(pokemons)
   
}

const getTypes = async() => {
    const urlTypes = await axios.get('https://pokeapi.co/api/v2/type')
    const data = await urlTypes.data
    const types = []

    data.results.map(e => {
        types.push(e.name)
    })

    return types
}

router.get('/pokemons', async(req, res) => {
    const pokemonsTotal = await getAllPokemons()
    const havePokemons = await Pokemon.findAll()
    console.log(havePokemons.length)
    //return res.json(pokemonsTotal)
       try {
        if(havePokemons.length === 0){
            console.log('dentro del if')
            await pokemonsTotal.map(async (e) => {
                await Pokemon.findOrCreate({
                    where:{

                        name: e.name,
                        health: e.health,
                        attack: e.attack,
                        defense: e.defense,
                        speed: e.speed,
                        height: e.height,
                        weight: e.weight,
                        created: e.created
                    }
                })
            })
            console.log('ok')
        }else{
            console.log('pipipi')
            return res.json(havePokemons);
        }
    } catch (error) {
        res.send(error)
    }   
})

router.get('/types', async(req, res) => {
    
})

module.exports = router;
