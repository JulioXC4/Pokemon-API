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

const getDbInfo = async() => {
    const pokemonsDB = (await Pokemon.findAll({
       include:{
           model: Type,
           attributes: ['name'],
           through: {
               attributes: [],
           }
       }
   })).map(e => {
    const pokemon = e.toJSON()
    return {
        ...pokemon,
        type: pokemon.types.map(e => e.name)
    }
   })

   return pokemonsDB
}

const getPokemons = async() => {
    const initialData = await getInitialApiInfo()
    const nextData = await getNextInfo(initialData.next,initialData.pokemons)
    
    const pokemons = await nextData.pokemons.map(async (e) => {
        const pokemonUrl = await axios.get(e.url)
        const pokemonStatsData = await pokemonUrl.data
        let stats = []
        let types = []

        await pokemonStatsData.stats.map(e => {
            stats.push(e.base_stat)
        })
        await pokemonStatsData.types.map(e => {
            types.push(e.type.name)
        })

        return {
            id: pokemonStatsData.id,
            name: pokemonStatsData.name,
            img: pokemonStatsData.sprites.other["official-artwork"]["front_default"],
            health: stats[0],
            attack: stats[1],
            defense: stats[2],
            speed: stats[5],
            height: pokemonStatsData.height,
            weight: pokemonStatsData.weight,
            type: types,
            created: false
        }
        
    })

    return Promise.all(pokemons)
}

const getAllPokemons = async() => {
    const apiPokemons = await getPokemons()
    const dbPokemons = await getDbInfo()
    const allPokemons = apiPokemons.concat(dbPokemons)

    return allPokemons
}

const getTypes = async() => {
    const urlTypes = await axios.get('https://pokeapi.co/api/v2/type')
    const data = await urlTypes.data
    const types = []

    await data.results.map(e => {
        types.push(e.name)
    })

    return types
}

router.get('/pokemons', async(req, res) => {
    const {name} = req.query
    const totalPokemons = await getAllPokemons()

    try {
        if(name){
            //Si existe el nombre devuelvo:
            let pokemon = await totalPokemons.filter((e) => 
                e.name.toLowerCase().includes(name.toLowerCase())
                )
            pokemon.length
                ? res.status(200).send(pokemon)
                :res.status(404).send("El pokemon ingresado no existe")
        }else{
            //Si no existe el nombre, devuelvo todos los pokemons
            return res.json(totalPokemons)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/pokemons/:id', async(req, res) => {
    const {id} = req.params
    const totalPokemons = await getAllPokemons()

    try {
        if(id){
            let pokemon = await totalPokemons.filter(e => 
                e.id == id
                )
            pokemon.length
                ? res.status(200).send(pokemon)
                : res.status(404).send("La id ingresada no coincide con ningun pokemon")
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/types', async(req, res) => {
    const totalTypes = await getTypes()
    const haveTypes = await Type.findAll()

    try {
        if(haveTypes.length === 0){
            await totalTypes.map(async(e) => {
                await Type.findOrCreate({
                    where:{
                        name: e,
                    }
                })
            })
        }else{
            return res.json(haveTypes)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

/* router.get('/test', async(req, res) => {
    Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            throught: {
                attributes: ['name'],
            }
        },
    
    }).then(pokes => res.json(pokes))
})
 */
router.post('/pokemons', async(req, res) => {
    const {name, health, attack, defense, speed, height, weight, type } = req.body

    const createPokemon = await Pokemon.create({
            name: name,
            health: health,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            created: true
    })

    const pokemonType = await Type.findAll({
        where: {
            name: type
        }
    })

    createPokemon.addType(pokemonType)
    res.send('Pokemon creado')
})
module.exports = router;
