//import React from "react";
import { useState } from 'react'
import uniqid from 'uniqid'

export default function usePokemon(){
    const initialState=[]
    const [pokemon, setPokemon]=useState(initialState)
    async function getPokemon(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const {name, sprites} = await response.json()
        const image = sprites["front_default"]
        return{name, id, image}
      }

      async function getTwelvePokemon(){
        const pokemon_avail = 721;
        const pokemon_staging = []
        const ID_used=[]
        for(let i=0; i<12;i++){
          let pokemonID = Math.floor(Math.random()*pokemon_avail)
          if(ID_used.includes(pokemonID)==false){
            pokemon_staging[i] = await getPokemon(pokemonID)
            ID_used.push(pokemonID)
            
          }
        }
        //console.log(pokemon_staging)
        return setPokemon([...pokemon_staging])
      }

    const shufflePokemon=function(){
        const availableCards = [...pokemon];
        const shuffledPokemon = [];
        while (availableCards.length) {
            const index = Math.floor(Math.random() * availableCards.length);
            const card = availableCards[index];
            card.id = uniqid();
            shuffledPokemon.push(card);
            availableCards.splice(index, 1);
            }
        setPokemon(shuffledPokemon);

    }
    return{
        pokemon,
        setPokemon,
        getTwelvePokemon,
        shufflePokemon
    }
}


