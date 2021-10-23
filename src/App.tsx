import  React,{ useEffect, useState } from 'react';
import './App.css';
import {getQuizDetails} from './services/quiz_services';
import {QuestionType} from './Types/quiz_types';
import QuestionCard from './Components/QuestionCards'; 

function App() {

  let [quiz, setquiz]=useState<QuestionType[]>([])
  let [currentStep, setcurrentStep]=useState(0)

  useEffect(()=>{
    
    async function fetchdata(){
      const questions: QuestionType[] = await getQuizDetails(5 , 'easy');
      console.log(questions);
      setquiz(questions)
    }

    fetchdata();
  },[]);

  const handleSubmit = (e: React.FormEvent<EventTarget>)=>{
    e.preventDefault();

    if(currentStep !== quiz.length-1)
      setcurrentStep(++currentStep);
    else {
      alert("Quiz Completed!");
      setcurrentStep(0);
    }  
  }

  if(!quiz.length)
  return<h3>Loading...</h3>

  return (
    <div className="App">
      <QuestionCard 
        choice={quiz[currentStep].option} 
        question={quiz[currentStep].question}
        callback={handleSubmit}
        />
    </div>
  );
}

export default App;
