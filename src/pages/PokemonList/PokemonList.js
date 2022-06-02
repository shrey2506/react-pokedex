import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {colors} from '../../assets/pokemon-type-colours'
import PaginationComponent from '../../components/PaginationCpmponent/PaginationComponent'
import './PokemonList.css'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import ExpandedCard from '../../components/PokemonCard/ExpandedCard'

const PokemonList = () => {
    const [pokemon,setPokemom]=useState([])
    const [currentPageUrl,setCurrentPageUrl]=useState("https://pokeapi.co/api/v2/pokemon?limit=20")
    const [nextPageUrl,setNextPageUrl]=useState()
    const [prevPageUrl,setPrevPageUrl]=useState()
    const [loading,setLoading]=useState(true)
    const [searchedName,setSearchName]=useState([])
    const [expand,setExpand]=useState(false)
    const [expandedCardData,setExapnadedCardData]=useState([])
    const [colorArr,setColorArr]=useState([])

  
  
    const getPokemon=(pokemon)=>{
      let data=[];

      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res=>{
        data.push(res.data)
      })
      console.log(data)
      return data
     
    }

    const fetchData=async ()=>{
        setPokemom([])
        await axios.get(currentPageUrl).then(res=>{
          setNextPageUrl(res.data.next)
          setPrevPageUrl(res.data.previous)
          const createPokemonObject=(result)=>{
            result.forEach(async (pokemon)=>{
              await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              .then( res=>{
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

    const showFilters=()=>{
      if(colorArr.length===0){
        for(let color in colors){
          setColorArr(oldArray => [...oldArray,color])
        }
      }
      else if(colorArr.length!==0){
        setColorArr([])
      }
     
    }

    useEffect(()=>{
        setLoading(true)
        fetchData()
      },[currentPageUrl])
    
      if(loading) return "Loading ..."
    
      const goToNextPage=()=>{
        setCurrentPageUrl(nextPageUrl)
      }

      const goToPrevPage=()=>{
        setCurrentPageUrl(prevPageUrl)
      }

    
      const exapandCard=async(pokemon)=>{
       if(expand===false){
         try{
          setExapnadedCardData(pokemon)
          setExpand(true)
         }catch(err){
            console.log(err)
         }
       }
       else if(expand===true){
         setExpand(false)
       }
      }


   
  return (
    <div className='list-container'>
        {/* <input placeholder='Search Pokemon' type='text' onChange={searchPokemon}/>
                  {searchedName.length!==0 && 
                        <div>
                          Search Result: {searchedName.name}
                        </div>
                  } */}
         <button  className='filter-button' style={{background: 'black'}} onClick={showFilters}>Filters</button>  
         <div className='filter-grid'>
          {colorArr && colorArr.map((color,i)=>{
            let background=colors[color]
            return(
              <button 
              style={{background: background }}
                className='filter-button' key={i} onClick={()=>{filterPokemon(`${color}`)}} >
                  {color}
              </button>
            )
          })}
          {colorArr.length!==0 && <button  className='filter-button' style={{background: 'black'}} onClick={fetchData}>Clear</button>  }
        </div>
        <div className='grid'>
                {pokemon &&  pokemon.sort((a,b)=>a.id-b.id).map((p,i)=>{
                    return(
                       <PokemonCard pokemon={p} expand={expand} exapandCard={exapandCard} func filter={filterPokemon} key={i}/>
                    )
                })}
        </div>  
        {expand===true && expandedCardData.length!==0 ? <ExpandedCard expandedCardData={expandedCardData} setExpand={setExpand} /> : null}
        <PaginationComponent  
            goToNextPage={nextPageUrl? goToNextPage: null}
            goToPrevPage={prevPageUrl? goToPrevPage:null}
        />
    </div>
 
  )
}

export default PokemonList