import usePokemon from './usePokemon'

export default function selectedCard({previously_clicked}){
    const addCardToHistory=function(){
        previously_clicked.push(...previously_clicked, this)
    }
    const whenCardClicked =  function(){
        console.log(this)
        addCardToHistory()

    }
  
    return{
        previously_clicked,
        whenCardClicked
    }
}