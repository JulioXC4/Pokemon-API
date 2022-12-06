import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postPokemon,getTypes } from '../actions/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function PokemonCreate() {

    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)

    const [input, setInput] = useState({
        name: "",
        health: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: []
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert("Personaje creado")
        setInput({
            name: "",
            health: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            type: []
        })
        history.push("/home")
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [])


    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input
                    type='text'
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Vida: </label>
                    <input
                    type='text'
                    value={input.health}
                    name="health"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ataque: </label>
                    <input
                    type='text'
                    value={input.attack}
                    name="attack"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Defensa: </label>
                    <input
                    type='text'
                    value={input.defense}
                    name="defense"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Velocidad: </label>
                    <input
                    type='text'
                    value={input.speed}
                    name="speed"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Altura: </label>
                    <input
                    type='text'
                    value={input.height}
                    name="height"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Peso: </label>
                    <input
                    type='text'
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}
                    />
                </div>
                <select onChange={(e) =>handleSelect(e)}>
                    {types.map((e) => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>
                <ul><li>{input.type.map(e => e + " , ")}</li></ul>
                <button type='submit'>Crear Pokemon</button>
            </form>
        </div>
    )
}
