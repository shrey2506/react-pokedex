import React,{useState,useEffect} from 'react'
import axios from 'axios'
import PaginationComponent from '../PaginationCpmponent/PaginationComponent'

import './PokemonList.css'
import PokemonCard from '../PokemonCard/PokemonCard'

const PokemonList = () => {
    const [pokemon,setPokemom]=useState([])
    const [currentPageUrl,setCurrentPageUrl]=useState("https://pokeapi.co/api/v2/pokemon?limit=20")
    const [nextPageUrl,setNextPageUrl]=useState()
    const [loading,setLoading]=useState(true)

    const fetchData=async ()=>{
        setPokemom([])
        await axios.get(currentPageUrl).then(res=>{
          setNextPageUrl(res.data.next)
          const createPokemonObject=(result)=>{
            result.forEach(async (pokemon)=>{
              await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              .then(res=>{
                setPokemom(currentList=>[...currentList,res.data])
              })
            })
          }
          createPokemonObject(res.data.results)
          setLoading(false)
        })
        .catch(err=>{
          console.log(err)
        })            
    }

    const filterPokemon=(type)=>{
        setPokemom([])
        axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(res=>{
           
            const createPokemonObject=(result)=>{
                result.forEach(async (pokemon)=>{
                  await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`)
                  .then(res=>{
                      setPokemom(oldArray => [...oldArray,res.data])
                     
                  })
                })
              }
              createPokemonObject(res.data.pokemon)
        })
    }

    useEffect(()=>{
        setLoading(true)
        fetchData()
      },[currentPageUrl])
    
      if(loading) return "Loading ..."
    
      const goToNextPage=()=>{
        setCurrentPageUrl(nextPageUrl)
      }
   
  return (
    <div className='list-container'>
        <div className='row'>
          <button onClick={()=>{filterPokemon('normal')}}>Normal</button>
          <button onClick={()=>{filterPokemon('fire')}}>Fire</button>
          <button onClick={()=>{filterPokemon('water')}}>Water</button>
          <button onClick={()=>{filterPokemon('electric')}}>Electric</button>
          <button onClick={()=>{filterPokemon('grass')}}>Grass</button>
          <button onClick={()=>{filterPokemon('ice')}}>Ice</button>
          <button onClick={()=>{filterPokemon('fighting')}}>Fighting</button>
          <button onClick={()=>{filterPokemon('poison')}}>Poison</button>
          <button onClick={()=>{filterPokemon('ground')}}>Ground</button>
          <button onClick={()=>{filterPokemon('flying')}}>Flying</button>
          <button onClick={()=>{filterPokemon('psychic')}}>Psychic</button>
          <button onClick={()=>{filterPokemon('bug')}}>Bug</button>
          <button onClick={()=>{filterPokemon('rock')}}>Rock</button>
          <button onClick={()=>{filterPokemon('ghost')}}>Ghost</button>
          <button onClick={()=>{filterPokemon('dragon')}}>Dragon</button>
          <button onClick={()=>{filterPokemon('dark')}}>Dark</button>
          <button onClick={()=>{filterPokemon('steel')}}>Steel</button>
          <button onClick={()=>{filterPokemon('fairy')}}>Fairy</button>
          <button onClick={()=>{fetchData()}}>Clear Filter</button>
        </div>
        <div className='grid'>
                {pokemon && pokemon.map((p,i)=>{
                    return(
                       <PokemonCard pokemon={p} key={i}/>
                    )
                })}
        </div>  
        <PaginationComponent  
            goToNextPage={nextPageUrl? goToNextPage: null}
        />
    </div>
 
  )
}

export default PokemonList