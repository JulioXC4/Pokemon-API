import React from 'react'
import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={style.container}>
      <div style={{display:'flex', flexFlow:'column'}}>
        <img className={style.img} src='https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg'alt='poke'/>
        <Link to = "/home">
            <button className={style.button}>Home</button>
        </Link>
      </div>
      <img src='https://images.wikidexcdn.net/mwuploads/esssbwiki/c/c0/latest/20210725170725/Entrenador_Pok%C3%A9mon_RojoFuego_y_VerdeHoja.png'alt='poke' width='400px' height='600px'/>
    </div>
  )
}
