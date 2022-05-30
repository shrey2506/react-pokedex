import {  useState } from 'react';
import PokemonList from './components/PokemonList/PokemonList'
import axios from 'axios';
import './App.css';


function App() {
 
  const [searchedName,setSearchName]=useState([])
  
  const searchPokemon=(e)=>{
    let name=e.target.value
    setTimeout(()=>{
       axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res=>{
        setSearchName(res.data)
      })
    },[3000])
   
  }
  return (
    <div>
          <div className="App">
                  <input placeholder='Search Pokemon' type='text' onChange={searchPokemon}/>
                  {searchedName.length!==0 && 
                        <div>
                          Search Result: {searchedName.name}
                        </div>
                  }
                  <PokemonList />
          </div>
    </div>
   
  );
}

export default App;
