import React from "react"
import Intro from "./components/Intro.js"
import Question from "./components/Question.js"
import { nanoid } from "nanoid"
import He from "he"

export default function App() {
    const [gameState, setGameState] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [quiz, setQuiz] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [loadQuestions, setLoadQuestions] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
    React.useEffect(() => {
        if(!loadQuestions) return;
        
        setIsLoading(true);
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results.map((currentQuestion) => ({
                    ...currentQuestion,
                    question: He.decode(currentQuestion.question),
                    selected_answer: "",
                    all_answers: randomizeAnswers(currentQuestion.correct_answer, currentQuestion.incorrect_answers),
                    id: nanoid()
                })));
                setIsLoading(false);
                setLoadQuestions(false);
        });
    }, [loadQuestions])
     
    function startGame () {
        setQuestions([]); 
        setGameState(true);
        setQuiz(false);
        setLoadQuestions(true);
        console.log(loadQuestions);
        setCount(0);
    }
    
    function randomizeAnswers(correctAnswer, incorrectAnswer) {
        const questionsArray = [correctAnswer, ...incorrectAnswer];
        for (let i = questionsArray.length - 1; i > 0; i--){
            const swapIndex = Math.floor(Math.random() * (i+1));
            [questionsArray[i], questionsArray[swapIndex]] = [He.decode(questionsArray[swapIndex]), He.decode(questionsArray[i])];
        }
        return questionsArray;
    }
    
    function selectAnswer(id, answer){
        setQuestions((currentQuestions) => currentQuestions.map((question)=> {
            return (question.id === id ? 
            {
                ...question, 
                selected_answer: answer
            } : 
            {
                ...question
            })
        }))
    }
    
    function checkAnswers() {
        questions.map((question) => {
            if(question.selected_answer === question.correct_answer){
                setCount(prevCount => prevCount + 1);
            }
        })
        setQuiz(true);
    }
    
    const questionElements = questions.map((question) => {
        return <Question 
        key={question.id} 
        item={question} 
        id={question.id}
        selectAnswer={selectAnswer}
        />
    })
    
    return ( 
        <div id="container"> 
            {!gameState ? <Intro startGame={startGame}/> :
                ( !isLoading && <div id="game"> 
                    {questionElements}
                    {quiz && 
                    <p>You scored {count}/5 correct answers</p>}
                    <button 
                    id="checkAnswers"
                    onClick={
                        !quiz ? 
                        checkAnswers :
                        startGame
                    }>
                        {!quiz ? 
                        "Check answers" :
                        "Play again"}
                    </button>
                </div> )
            }
        </div>
    )
}