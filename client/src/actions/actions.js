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