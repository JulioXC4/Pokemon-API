import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemons } from '../actions/actions'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       dispatch(getNamePokemons(name))
    }
    return (
        <div>
            <input
            type='text'
            placeholder='Buscar...'
            onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>
                Buscar
            </button>
        </div>
    )
}
