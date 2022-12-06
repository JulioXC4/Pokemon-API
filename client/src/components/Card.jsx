import React from 'react'

export default function Card({name, types, img}) {
    return (
        <div>
            <h2>{name}</h2>
            <img src={img} alt='Img Pokemon'/>
            {
                types ? types.map( el => {
                    return(
                            <h4>{el}</h4>
                    )
                }
                ) :
                <span>Types not found</span>
            }
            
        </div>
    )
}

