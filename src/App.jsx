import React, {useState} from 'react';
import Main from './Components/Main';
import './Components/style.css'
import SearchAppBar from './Header';
const App = () =>  {

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  
  const changeUrl = (id)=> {
    setUrl(`https://pokeapi.co/api/v2/pokemon?limit=${id}&offset=0`)
  }
  return (
    <>
      <SearchAppBar changeUrl={changeUrl}/>
      <Main pageUrl={url}/>
    </>
  );
}

export default App;
