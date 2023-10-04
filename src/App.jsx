import { useEffect, useState, useRef } from 'react'
import './App.css'
import uniqid from 'uniqid'
import usePokemon from './components/usePokemon'
//import selectedCard from './components/selectedCard'


// const MemoryCardGrid = function(props){
//   let pokemon_array = props.array
//   //console.log(pokemon_array)
//   return(
//     <div className='memoryCardGrid'>
//         {pokemon_array.map((poke, i) =>
//     <Card key={i} name={poke.name} id={poke.id} image={poke.image} onClick={selectedCard({poke})}/>
//   )}
//     </div>
//   )
// }

// const Card = function(props){
//   return(
//     <div className='card' >
//       <img src = {props.image}></img>
//       <div>{props.name}</div>
//     </div>
//   )
// }

function App() {
  const [count, setCount] = useState(0)
  const [best_score, setBestScore]=useState(0)
  //const [game_status, getGameStatus]=useState('start')
  const { pokemon, shufflePokemon, setPokemon, getTwelvePokemon } = usePokemon();
  const [previously_clicked, changeHistory] = useState([]);
  
  
  
  useEffect(()=>{
    async function initial_setup(){
      await getTwelvePokemon()
      }
      initial_setup()
  },[])


  const addCardToHistory=function(item){
    if(previously_clicked.length==0){
      console.log("entered empty array")
      changeHistory([item])
    }
    else{
      changeHistory([...previously_clicked,item])
    }

  }
  const clearHistory=function(){
    changeHistory([])
  }
  const resetPokemon= function(){
    setPokemon([])
    getTwelvePokemon()
  }

  const updateScores=function(){
    if(count>best_score){
      setBestScore(count)
    }
    setCount(0)
  }

  const selectedCard= function(item){
      console.log(item)
        const poke = item
        let found_duplicate= false
        for(let i=0; i<previously_clicked.length;i++){
          if(JSON.stringify(poke.name) == JSON.stringify(previously_clicked[i].name)){
            console.log("contains a previously added item")
            found_duplicate = true
          }
        }
        if(found_duplicate == true){
            clearHistory()
            resetPokemon()
            updateScores()
            console.log("Reset")
            alert(`Wow! You made it ${count} cards in a row! Would you like to try again?`)

        }

        else{
          
          addCardToHistory(item)
          shufflePokemon()
          setCount(count+1)
          if(count==12){
          alert("You won! Congradulations!")
          clearHistory()
          resetPokemon()
          setBestScore(0)
          setCount(0)
        }
        }

        
  }

  

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <p> Get points by clicking on a pokemon, but do not click that pokemon more than once! Can you get all 12?</p>
      <div id='scores'>
        <div className='scoreboard'> Current Score: {count}</div>
        <div className='best_score'> Best Score: {best_score}</div>
      </div>
      <div className='memoryCardContainer'>
         <div className='memoryCardGrid'>
          {pokemon.map((poke) => {
            return(
              <div key={poke.name} className='card' onClick={()=>{
                selectedCard(poke)
              }}>
                <img src = {poke.image}></img>
                <div>{poke.name}</div>
              </div>
            )})}
        </div>

      </div>
    </div>

  )
}

export default App
