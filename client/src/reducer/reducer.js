const initialState = {
    pokemons : [],
    detail: [],
    allPokemons: [],
    types:[],
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case 'POST_POKEMON':
            return {
                ...state,

            }

        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        
        case 'GET_NAME_POKEMONS':
            return{
                ...state,
                pokemons: action.payload
            }   
            
        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons
            const typeFiltered = action.payload === 'all' ? allPokemons : allPokemons.filter(e=> e.type.includes(action.payload) )
            return {
                ...state,
                pokemons: typeFiltered
            }
            
        case 'FILTER_CREATED':
            const allPokes = state.allPokemons
            const createdFilter = action.payload === 'created' ? allPokes.filter(e => e.created === true) : allPokes.filter(e => !e.created)
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons: createdFilter
            }
            
        case 'ORDER_BY_NAME':
            let sortedArray = action.payload === 'asc' ? 
                state.pokemons.sort(function(a,b){
                    if(a.name > b.name) return 1
                    if(b.name > a.name) return -1

                    return 0
                }) :
                state.pokemons.sort(function(a,b){
                    if(a.name > b.name) return -1
                    if(b.name > a.name) return 1

                    return 0
                })

                return {
                    ...state,
                    pokemons: sortedArray
                }
        default:
            return{
                ...state
            }
    }
}

export default rootReducer;