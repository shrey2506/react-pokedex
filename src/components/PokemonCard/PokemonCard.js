import React from 'react'
import {colors} from '../../assets/pokemon-type-colours'
import {LightenDarkenColor} from '../../assets/colur-modulation'
import './PokemonCard.css'

const PokemonCard = ({pokemon,filter,exapandCard,expand}) => {

    let style= { background:   LightenDarkenColor( colors[pokemon.types[0].type.name],30)  }
    let src=pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_default
    return (
      <div className='card-element' style={style} onClick={()=>{
          if(expand===true){
            exapandCard()
          }   

          if(expand===false){
            exapandCard(pokemon)
          }  
         }}>
          <div className='pokemon-id'>#{pokemon.id}</div>
          <img className='card-img' src={src} alt={pokemon.name}  />
          <div className='card-heading'>{pokemon.name}</div>
          <div className='type-row'>
            {pokemon.types.map((type,i)=>{
              return(
                <div 
                      style={
                        {borderColor: LightenDarkenColor( colors[type.type.name],-50),
                          background: LightenDarkenColor( colors[type.type.name],-20),
                          cursor: 'pointer'
                        }
                        } className='type' key={i}
                      onClick={()=>{filter(type.type.name)}}
                >
                  {type.type.name}
                </div>
              )
            })}
          </div>
      </div>
    )
}

export default PokemonCard