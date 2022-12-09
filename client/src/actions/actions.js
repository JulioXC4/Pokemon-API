import axios from "axios";

export const getPokemons = () => {
    return async function(dispatch){
        let pokemonsData = await axios.get("http://localhost:3001/pokemons")

        return dispatch({
            type:'GET_POKEMONS',
            payload: pokemonsData.data
        })
    }
}

export const postPokemon = (payload) => {
    return async function(dispatch){
        let response = await axios.post("http://localhost:3001/pokemons", payload)

        return response
    }
}

export const getDetail = (id) => {
    return async function (dispatch){
       
            let pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch ({
                type: 'GET_DETAILS',
                payload: pokemon.data
            })
        
    }
}

export const getNamePokemons = (name) => {
    return async function(dispatch){
       try {
        let pokemon = await axios.get("http://localhost:3001/pokemons?name="+ name)
        return dispatch ({
            type: 'GET_NAME_POKEMONS',
            payload:pokemon.data
        })
       }catch(error){
        console.log(error)
       }
    }
}

export const getTypes = () => {
    return async function(dispatch){
        try {
            let types = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: 'GET_TYPES',
                payload: types.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const filterPokemonByType = (payload) => {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export const filterCreated = (payload) => {
    
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export const orderByAttack = (payload) => {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}