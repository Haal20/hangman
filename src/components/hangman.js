import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'
import img0 from '../img/img0.png'
import img1 from '../img/img1.png'
import img2 from '../img/img2.png'
import img3 from '../img/img3.png'
import img4 from '../img/img4.png'
import img5 from '../img/img5.png'
import img6 from '../img/img6.png'
import { getWord } from "../data/randomAnimalApi";

/* TODO:    * customise dificulty
            * add more pictures
            * 'Spice up' winning and losing credds
            * mage button to own component
            * move render functionality to own function
            * enable uting keyboarde
*/

const Hangman = (props) => {
    /* DEFINE DEFAULT PROPS */
    let maxWrong = 6
    let img = [img0, img1, img2, img3, img4, img5, img6]

    /* SET STATE */
    const [wrongNum, setWrongNum] = useState(0)
    const [guessed, setGuessed] = useState([])
    const [answer, setAnswer] = useState('')

    useEffect( () => {
        // declare the data fetching function
        const fetchData = async () => {
            setAnswer((await getWord()).data[0].toUpperCase())
        }
        // call the function
        fetchData()
        // make sure to catch any error
        .catch(console.error)
    }, [])

    /* RESET GAME */
    const resetGame = async () => {
        setWrongNum(0)
        setGuessed([])
        setAnswer((await getWord()).data[0].toUpperCase())
    }

    /* HANDLE GUESS */
    const handleGuess = (e) => {
        /* handle a guessed letter:
            * add letter to guessed state
            * if letter is not in answer state, increase wrongNum
        */
        let ltr = e.target.value
        console.log(ltr)
        setGuessed([...guessed,ltr])
        setWrongNum(wrongNum + (answer.includes(ltr) ? 0 : 1))
    }

    /* GUESSED WORD */
    const guessedWord = () => {
        /* show current state of word:
            * Show only right guessed letters
            * Use _ as plaseholder for the rest of the letters.
        */
       return answer.split("").map(ltr => (guessed.includes(ltr) ? ltr : ' _ '))
    }
    
    /* GENERATE BUTTON ALPHABET */
        /* split up alphabet string, then map each to render a alphabet button 
            * When klicked, handle the respons 
            * already guessed: disable 
        */
    const generateBtnAlphabet = () => {
        /* a cool deconstructor thing
        const { guessed } = this.state
        const { handleGuess } = this */
        let alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let alpharr = alph.split('')
        let renderBtn = alpharr.map((ltr, i) => (
            <Button 
            key={i}
            variant='outlined'
            value={ltr}
            onClick={handleGuess}
            disabled={guessed.includes(ltr)}
            >
                {ltr}
            </Button>
        )) 

        return renderBtn
    }

    console.log(answer)
    /* RENDER GAME */
        return (
            <div>
                <h1>Hangman Game</h1>
                <img src={img[wrongNum]} ></img>
                {wrongNum === 1 ? <p>{wrongNum} wrong answer</p> : <p>{wrongNum} wrong answers</p>}

                {/* checks if you have guessed the right word. if not, check if you guessed the max amount of guesses
                if you have, you lost. Else generate the guessed word and alphabet of buttons */}
                {answer === guessedWord().join('') ? <p>You WON!</p> : 
                (wrongNum === maxWrong ? <p>You Lose! the right word was {answer}</p> : 
                (
                    <div>
                        <p>{guessedWord()}</p>
                        <p>{generateBtnAlphabet()}</p>
                    </div>
                ))}
                
                <Button variant="contained" onClick={resetGame}>Reset Game!</Button>
            </div>
        )
}

export default Hangman