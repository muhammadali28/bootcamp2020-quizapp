import  React,{ useEffect, useState } from 'react';
import './App.css';
import {getQuizDetails} from './services/quiz_services';
import {QuestionType} from './Types/quiz_types';
import QuestionCard from './Components/QuestionCards'; 

function App() {

  let [quiz, setquiz]=useState<QuestionType[]>([])
  let [currentStep, setcurrentStep]=useState(0)
  let [score, setscore]=useState(0)
  let [result, setresult]=useState(false)

  useEffect(()=>{
    
    async function fetchdata(){
      const questions: QuestionType[] = await getQuizDetails(5 , 'easy');
      console.log(questions);
      setquiz(questions)
    }

    fetchdata();
  },[]);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string)=>{
    e.preventDefault();

    const currentQuestion:QuestionType =quiz[currentStep];

    console.log("correct: " + currentQuestion.correct_answer+" user: "+userAns );
    if (userAns === currentQuestion.correct_answer){
      setscore(++score);
    }

    if(currentStep !== quiz.length-1)
      setcurrentStep(++currentStep);
    else {
      setresult(true);
    }  
  }

  if(!quiz.length)
  return<h3>Loading...</h3>

  if(result){
    return(
      <div className="question-container result">
        <h3>Result</h3>
        <p >Your Score is {score} out of {quiz.length}</p>
      </div>
    )
  }

  return (
    <div >
      <h1 className="App">Quiz App By Muhammad ALi </h1>
      <QuestionCard 
        choice={quiz[currentStep].option} 
        question={quiz[currentStep].question}
        callback={handleSubmit}
        />
    </div>
  );
}

export default App;
