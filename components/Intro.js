import React from "react"

export default function Intro(props) {
    
    return (
        <div id="introContainer">
            <h1 id="introTitle">Quizzical</h1>
            <h3 id="introDescription">Some description if needed </h3>
            <button id="introStart" onClick={props.startGame}>Start Quiz</button>
        </div> 
    )
}