import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, filterPokemonByType, getPokemons, orderByName } from '../actions/actions.js';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import SearchBar from './SearchBar.jsx';
import Paginado from './Paginado.jsx';

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage* pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getPokemons())    
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }

    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder('Ordenado ' + e.target.value)
    }

    function handleFilterType(e){
        dispatch(filterPokemonByType(e.target.value))
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    return (
        <div>
            <Link to = '/pokemon'>Crear a</Link>
            <h1>ETIQUETA H1</h1>
            <button onClick={e => {handleClick(e)}}>
                VOLVER A CARGAR LOS POKEMONS
            </button>
            <div>
                <select onChange={e => handleFilterType(e)}>
                    <option value = "all">All</option>
                    <option value = "normal">Normal</option>
                    <option value = "fighting">Fighting</option>
                    <option value = "flying">Flying</option>
                    <option value = "poison">Poison</option>
                    <option value = "rock">Rock</option>
                    <option value = "ground">Ground</option>
                    <option value = "bug">Bug</option>
                    <option value = "ghost">Ghost</option>
                    <option value = "steel">Steel</option>
                    <option value = "water">Water</option>
                    <option value = "fire">Fire</option>
                    <option value = "grass">Grass</option>
                    <option value = "electric">Electric</option>
                    <option value = "psychic">Psychic</option>
                    <option value = "ice">Ice</option>
                    <option value = "dragon">Dragon</option>
                    <option value = "dark">Dark</option>
                    <option value = "fairy">Fairy</option>
                    <option value = "shadow">Shadow</option>
                    <option value = "unknown">Unknown</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value = "all">All</option>
                    <option value = "api">API</option>
                    <option value = "created">Created</option>
                </select>
                <select onChange={e => handleSort(e)}>
                    <option value = "asc">Ascendente</option>
                    <option value = "desc">Descendente</option>
                </select>
                <Paginado 
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
                />
                <SearchBar/>
                {currentPokemons?.map((e) => {
                    return(
                    <div>
                        <Link to={`/home/${e.id}`}>
                            <Card name={e.name} img={e.img} types={e.type} key={e.id}/>
                        </Link>
                    </div>
                    )
                })}
                
            </div>
        </div>
    )   
}