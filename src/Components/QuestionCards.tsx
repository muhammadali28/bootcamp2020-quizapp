import React from 'react';
import { questiontypeProps } from './../Types/quiz_types';


const QuestionCard: React.FC<questiontypeProps> =({ question, choice , callback }) => {

    return(
        <div className="question-container">
            <div className="question"> 
               <h4> {question} </h4>
            </div>

            <form onSubmit={callback}>
                {
                    choice.map(( opt :string ,  ind: number) => {
                        return (
                            <div key={ind}>
                            <label>
                                <input
                                type="radio" 
                                name="opt"
                                value={opt}
                                />
                                {opt}
                            </label>
                            </div>
                        )
                    })

                };
            <input type="submit" />
            </form>    
        </div>
    )
}

export default QuestionCard;