import React from 'react'
import style from './Card.module.css'

export default function Card({name, types, img}) {
    const pokebola = "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.img}>
                    <img className={style.imgPokemon} src={img ? img : pokebola} alt='Img Pokemon'/>
                </div>
                <div className={style.content}>
                    <h2>{name}</h2>
                    <h3>Types :</h3>
                    {
                        types ? types.map( el => {
                        return(
                            
                            <div className={style.types}>
                                
                                <span>{el}</span>
                            </div>
                        )}
                                ) :
                <span>Types not found</span>
                    }
                </div>
            </div>
            
        </div>
    )
}

