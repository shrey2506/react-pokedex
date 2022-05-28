import { useEffect, useState } from 'react';
import PokemonList from './components/PokemonList/PokemonList'
import axios from 'axios';
import './App.css';
import PaginationComponent from './components/PaginationCpmponent/PaginationComponent';

function App() {
  const [pokemon,setPokemom]=useState([])
  const [searchedName,setSearchName]=useState([])
  const [currentPageUrl,setCurrentPageUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextPageUrl,setNextPageUrl]=useState()
  const [prevPageUrl,setPrevPageUrl]=useState()
  const [loading,setLoading]=useState(true)

  const fetchData=async ()=>{
      await axios.get(currentPageUrl).then(res=>{
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemom(res.data.results)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
      })            
  }

  const searchPokemon=(e)=>{
    let name=e.target.value
    setTimeout(()=>{
       axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res=>{
        setSearchName(res.data)
      })
    },[3000])
   
  }
  console.log(searchedName)
  useEffect(()=>{
    setLoading(true)
    fetchData()
  },[currentPageUrl])

  if(loading) return "Loading ..."

  const goToNextPage=()=>{
    setCurrentPageUrl(nextPageUrl)
  }

  const goToPreviousPage=()=>{
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <div className="App">
        <input placeholder='Search Pokemon' type='text' onChange={searchPokemon}/>
        {searchedName && 
              <div>
                 Search Result: {searchedName.name}
              </div>
        }
         <PokemonList pokemon={pokemon} />
         <PaginationComponent  
            goToNextPage={nextPageUrl? goToNextPage: null}
            goToPreviousPage={prevPageUrl?  goToPreviousPage:null}
         />
    </div>
  );
}

export default App;
