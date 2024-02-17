import React from "react";
import { PropTypes } from "prop-types";

const Card = ({ pokemon, loading,infoPokemon}) => {

    return (
        <>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => {
                    return (
                        <>
                            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="" />
                                <h2>{item.name}</h2>
                            </div>
                        </>
                    )
                })
        }

        </>
    )
}

Card.propTypes = {
    loading: PropTypes.bool,
    pokemon: PropTypes.array,
    infoPokemon: PropTypes.func
}

export default Card;