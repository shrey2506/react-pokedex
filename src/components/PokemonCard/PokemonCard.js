import React from 'react'
import {colors} from '../../assets/pokemon-type-colours'
import './PokemonCard.css'

const PokemonCard = ({pokemon}) => {
    let style= { background: colors[pokemon.types[0].type.name]}
    let src=pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_default
    return (
      <div className='card-element' style={style}>
          <div>#{pokemon.id}</div>
          <img className='card-img' src={src}  />
          <div className='card-heading'>{pokemon.name}</div>
          {pokemon.types.map((type,i)=>{
            return(
               <div key={i}>{type.type.name}</div>
            )
          })}
          
      </div>
    )
}

export default PokemonCard