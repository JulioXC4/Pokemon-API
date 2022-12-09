import React from 'react'
import { Link } from 'react-router-dom'
import style from './CardDetail.module.css'

export default function CardDetail( {name,img,id,health,attack,defense,speed,height,weight,types}) {
    
  const pokebola = "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
    return (
      <section className={style.pantalla_dividida}>
          <div className={style.img_types}>
          <Link to = '/home'>
            <button className={style.button}>Volver</button>
           </Link>
            <img className={style.imgPokemon} src={img ? img : pokebola} alt='Img Pokemon'/>
            <div className={style.typesContainer}>
            <h3>Types :</h3>
                    {
                        types ? types.map( el => {
                        return(
                            <div className={style.types}>
                                <span className={style.spanTypes}>{el}</span>
                            </div>
                        )}
                                ) :
                <span>Types not found</span>
                    }
            </div>
          </div>
          <div className={style.info}>
            <span>{id}</span>
            <h2>{name}</h2>
            <div className={style.stats}>
              <h3>Health: {health}</h3>
              <h3>Attack: {attack}</h3>
              <h3>Defense: {defense}</h3>
              <h3>Speed: {speed}</h3>
              <h3>Height: {height}</h3>
              <h3>Weight: {weight}</h3>
            </div>
          </div>
        
      </section>
    )
}

