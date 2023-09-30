import { useState } from 'react'
import './App.css'

const MemoryCardGrid = function(){
  return(
    <div className='memoryCardGrid'>
        {[...Array(12)].map((x, i) =>
    <Card key={i} />
  )}
    </div>
  )
}

const Card = function(){
  return(
    <div className='card'>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [best_score, setBestScore]=useState(0)

  
  async function getNeko() {
    const response = await fetch('https://nekos.best/api/v2/neko')
    const json = await response.json()
    console.log(json.results[0].url)
}




// https://nekos.best/api/v2/neko/XXXXXX-XXXXX.png

  return (
    <>
      <div>
        <div className='scoreboard'></div>
        <div className='best_score'></div>

      </div>
      <h1>Memory Card Game</h1>
      <div className='memoryCardContainer'>
      <MemoryCardGrid/>
      </div>
      
      

    </>
  )
}

export default App
