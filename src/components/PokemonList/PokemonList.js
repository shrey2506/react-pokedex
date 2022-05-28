import React from 'react'

const PokemonList = ({pokemon}) => {
  return (
    <div>
            {pokemon && pokemon.map((p,i)=>{
                return(
                    <div key={i}>{p.name}</div>
                )
            })}
    </div>  
 
  )
}

export default PokemonList