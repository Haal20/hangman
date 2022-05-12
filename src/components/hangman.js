import React from "react";
import Button from '@mui/material/Button'
import axios from "axios";
import img0 from '../img/img0.png'
import img1 from '../img/img1.png'
import img2 from '../img/img2.png'
import img3 from '../img/img3.png'
import img4 from '../img/img4.png'
import img5 from '../img/img5.png'
import img6 from '../img/img6.png'

/* TODO:    * customise dificulty
            * add more pictures
            * 'Spice up' winning and losing credds
            * change class component to function component
            * move API call to own function and import
            * mage button to own component
            * move render functionality to own function
*/

class Hangman extends React.Component {
    /** CONSTANT PROPS **/
    static defaultProps = {
        maxWrong: 6,
        img: [img0, img1, img2, img3, img4, img5, img6,]
    }
    /** CONSTRUCTOR **/
    constructor(props) {
        super(props)
        this.state = {
            wrongNum: 0,
            guessed: new Set(),
            answer: ''
        }
        this.handleGuess = this.handleGuess.bind(this)
        this.resetGame = this.resetGame.bind(this)
        this.generateAlphabet = this.generateBtnAlphabet.bind(this)
        this.guessedWord = this.guessedWord.bind(this)
        this.getWord = this.getWord.bind(this)
    }

    /* GET RANDOM WORD */
    async getWord() {
        const res = await axios('https://random-word-form.herokuapp.com/random/animal');
        return await res
    }

    async componentDidMount(){
        this.setState({answer: (await this.getWord()).data[0].toUpperCase()})
    }

    /* RESET GAME */
    async resetGame(){
        this.setState({wrongNum: 0,
            guessed: new Set(),
            answer: (await this.getWord()).data[0].toUpperCase()})
    }

    /* HANDLE GUESS */
    handleGuess(e){
        /* handle a guessed letter:
            * add letter to state.guessed
            * if letter is not in state.answer, increase wrongNum
        */
        let ltr = e.target.value
        console.log(ltr)
        this.setState(st => ({
            guessed: st.guessed.add(ltr),
            wrongNum: st.wrongNum + (st.answer.includes(ltr) ? 0 : 1)
        }))
    }

    /* GUESSED WORD */
    guessedWord() {
        /* show current state of word:
            * Show only right guessed letters
            * Use _ as plaseholder for the rest of the letters.
        */
        return this.state.answer.split("").map(ltr => (this.state.guessed.has(ltr) ? ltr : ' _ '))
    }
    
    /* GENERATE BUTTON ALPHABET */
        /* split up alphabet string, then map each to render a alphabet button 
            * When klicked, handle the respons 
            * already guessed: disable 
        */
    generateBtnAlphabet(){
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
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(ltr)}
            >
                {ltr}
            </Button>
        )) 

        return renderBtn
    }

    /* RENDER GAME */
    render () {
        console.log(this.state.answer)
        return (
            <div>
                <h1>Hangman Game</h1>
                <img src={this.props.img[this.state.wrongNum]} ></img>
                {this.state.wrongNum === 1 ? <p>{this.state.wrongNum} wrong answer</p> : <p>{this.state.wrongNum} wrong answers</p>}

                {/* checks if you have guessed the right word. if not, check if you guessed the max amount of guesses
                if you have you lost, else generate the guessed word and alphabet of buttons */}
                {this.state.answer === this.guessedWord().join('') ? <p>You WON!</p> : 
                (this.state.wrongNum === this.props.maxWrong ? <p>You Lose! the right word was {this.state.answer}</p> : 
                (
                    <div>
                        <p>{this.guessedWord()}</p>
                        <p>{this.generateBtnAlphabet()}</p>
                    </div>
                ))}
                
                <br/>
                <Button variant="contained" onClick={this.resetGame}>Reset Game!</Button>
            </div>
        )}
}

export default Hangman