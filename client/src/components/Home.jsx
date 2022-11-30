import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions/actions.js';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';

export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect (() => {
        dispatch(getPokemons())    
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }

    return (
        <div>
            <Link to = '/pokemons'>Crear a</Link>
            <h1>ETIQUETA H1</h1>
            <button onClick={e => {handleClick(e)}}>
                VOLVER A CARGAR LOS POKEMONS
            </button>
            <div>
                <select>
                    <option value = "asc">Ascendente</option>
                    <option value = "desc">Descendente</option>
                </select>
                
                {allPokemons?.map((c) => {
                    return(
                    <Fragment>
                        <Link to = {"/home/ " + c.id}>
                            <Card name={c.name} />
                        </Link>
                    </Fragment>
                    );
                })}
                
            </div>
        </div>
    )   
}