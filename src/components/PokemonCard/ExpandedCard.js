import React,{useState} from 'react'
import {colors} from '../../assets/pokemon-type-colours'
import {LightenDarkenColor} from '../../assets/colur-modulation'
import './PokemonCard.css'
const ExpandedCard = ({expandedCardData,setExpand}) => {
   
  return (
   <div>
            <div className='expanded-card' onClick={()=>{setExpand(false)}} style= {{ background:   LightenDarkenColor( colors[expandedCardData.types[0].type.name],30)  }}  >
            <div className='pokemon-id'>#{expandedCardData.id}</div>
            <img className='card-img' src={expandedCardData.sprites.other.dream_world.front_default ? expandedCardData.sprites.other.dream_world.front_default: expandedCardData.sprites.front_default} alt={expandedCardData.name}  />
            <div className='card-heading'>{expandedCardData.name}</div>
            <div className='type-row'>
                {expandedCardData.types.map((type,i)=>{
                return(
                    <div 
                        style={
                            {borderColor: LightenDarkenColor( colors[type.type.name],-50),
                            background: LightenDarkenColor( colors[type.type.name],-20),
                            cursor: 'pointer'
                            }
                            } className='type' key={i}
                    >
                    {type.type.name}
                    </div>
                )
                })}
            </div>
            <h1 className='card-heading'>Moves</h1>
            <div className='row'>
                {expandedCardData.moves.slice(0,4).map((move,i)=>{
                return(
                    <div className='move' key={i}>{move.move.name}</div>
                )
                })}
            </div>
            <h1 className='card-heading'>Stats</h1>
            <div className='row'>
                {expandedCardData.stats.map((stat,i)=>{
                return(
                    <div className='move' key={i}>
                    <div>{stat.stat.name} : {stat.base_stat}</div>
                    </div>
                )
                })}
            </div>
            </div> 
        </div>
  )
}

export default ExpandedCard