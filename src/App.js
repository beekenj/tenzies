import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {        
    const allNewDice = () => {
        // Create a new array of length 10 and fill with random vals between 1 and 6
        return new Array(10).fill({}).map(() => {
            return {
                value: Math.ceil(Math.random()*6),
                isHeld: false,
                id: nanoid(),
            }
        })
    }
    
    const reRoll = () => {
        setDice(oldDice => oldDice.map(die => {
            return !die.isHeld ?
                {...die, value: Math.ceil(Math.random()*6)} :
                die
        }))
    }
    
    const newGame = () => {
        setDice(allNewDice())
        setTenzies(false)
    }
    
    const holdDice = (id) => {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const allSameVal = dice.every(die => die.value === dice[0].value)
        if (allHeld && allSameVal) {
                setTenzies(true)
            }
    }, [dice])   
    
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            clickHandle={() => holdDice(die.id)}
        />
    ))
    
        
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die--container">
                {diceElements}
            </div>
            <button 
                className="roll-dice"
                onClick={() => { tenzies ? newGame() : reRoll() }}
            >
                {tenzies ? "New Game":"Roll"}
            </button>
        </main>
    );
}