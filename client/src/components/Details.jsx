import React from 'react'
import { useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../actions/actions.js'
import { useEffect } from 'react'
import CardDetail from './CardDetail.jsx'

export default function Details() {

    const dispatch = useDispatch()
    let {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch])

    const pokemon = useSelector((state) => state.detail)

     return (
        <div>
           {
            pokemon.length > 0 ?
            pokemon.map(e => {
                return (
                 <CardDetail name={e.name} img={e.img} id={e.id} health={e.health} attack={e.attack} defense={e.defense} speed={e.speed} height={e.height} weight={e.weight} types={e.type}/>
                )
            })
            : <p> ... Cargando</p>
           }
           
        </div>
    ) 

   
}