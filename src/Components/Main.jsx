import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Button from '@mui/material/Button';
import { PropTypes } from "prop-types";

const Main=({pageUrl})=>{
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();

    const pokeFun=async()=>{
        setLoading(true)
        const res=await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon=(res)=>{
       setPokeData(state=> { 
         state=[]
         return state })
       res.map(async(item)=>{
          const result=await axios.get(item.url)      
          setPokeData(state=>{
              state=[...state,result.data]
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }

    useEffect(()=>{
        pokeFun();
    },[url])

    useEffect(()=> {
        setUrl(pageUrl)
    },[pageUrl])

    console
    return(
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    
                    <div className="btn-group">
                         <Button variant="outlined" disabled={prevUrl ? false : true} onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}>Previous</Button>

                        { <Button variant="outlined"  disabled={nextUrl ? false : true} onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</Button>}

                    </div>
                </div>
                <div className="right-content">
                   <Pokeinfo data={pokeDex}/>
                </div>

            </div>

        </>
    )
}

Main.propTypes = {
    pageUrl: PropTypes.string
}

export default Main;