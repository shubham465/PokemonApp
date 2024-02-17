import React, { useEffect, useState } from "react";
import { DefaultPokemon } from "./DefaultPokeInfo";
import { PropTypes } from "prop-types";

const Pokeinfo = ({ data, header }) => {
   
    const [localData, setLocalData] = useState(
        header ? data : DefaultPokemon
     )

    useEffect(()=> {
        if(data)
         setLocalData(data)
    }, [data])
    return (
        <>
        {
            (!localData) ? "" : (
                <>
                    <h1>{localData.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${localData.id}.svg`} alt="" />
                    <div className="abilities">
                        {
                            localData.abilities.map(poke=>{
                                return(
                                    <>
                                     <div className="group" >
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="base-stat">
                        {
                            localData.stats.map(poke=>{
                                return(
                                    <>
                                        <h3>{poke.stat.name}:{poke.base_stat}</h3>
                                    </>
                                )
                            })
                        }
                    </div>
                </>
            )
        }

        </>
    )
}

Pokeinfo.propTypes = {
    data: PropTypes.object,
    header: PropTypes.bool
}

export default Pokeinfo