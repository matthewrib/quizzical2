import React from "react"

export default function Question (props) {
    const {item: {question, all_answers, selected_answer, id}} = props;
    
    const answerOptions = all_answers.map((answer) => {
        return (
            <button 
            className="questionAnswer"
            style={{
                background: selected_answer === answer ? "#D6DBF5" : "",
                color: selected_answer === answer ? "#293264" : "black",
                border: selected_answer === answer ? "0px" : "1px solid #4D5B9E"
            }} 
            onClick={() => props.selectAnswer(id, answer)}>
            {answer}
            </button>
        )
    })
    
    return (
        <div className="questionContainer">
            <h2 className="question">{question}</h2>
            {answerOptions}
        </div>
    )
}