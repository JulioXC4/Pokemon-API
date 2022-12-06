import React from 'react'
import { Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../actions/actions.js'
import { useEffect } from 'react'

export default function Details(props) {

    const dispatch = useDispatch()
    let {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const pokemon = useSelector((state) => state.detail)

     return (
        <div>
           {
            pokemon.length > 0 ?
            <div>
                <h1>Pokemon: {pokemon[0].name}</h1>
                <img src = {pokemon[0].img} alt= "pokeimg"/>
                <h2>Vida: {pokemon[0].health}</h2>
                <h2>Ataque: {pokemon[0].attack}</h2>
                <h2>Defensa: {pokemon[0].defense}</h2>
                <h2>Velocidad: {pokemon[0].speed}</h2>
                <h2>Altura: {pokemon[0].height}</h2>
                <h2>Peso: {pokemon[0].weight}</h2>
                <h3>Tipos: {pokemon[0].type.map(e => e + (' '))}</h3>
            </div> : <p> ... Cargando</p>
           }
           <Link to = '/home'>
            <button>Volver</button>
           </Link>
        </div>
    ) 

   
}