import React, { useEffect, useState } from 'react';

const Quiz = ({ setSlidesData, slideId, contentId , slidesData }) => {
  const initialQuestion = {
    question: '',
    options: ['', '', ''],
    correctAnswer: '', // applicable for multiple choice questions
  };

  let initialQuestions = slidesData.slides; 

  const [questions, setQuestions] = useState([initialQuestion]);

  //below useEffect runs only when the parent re-renders so we can get the data which was stored in parent 
  useEffect(()=>{
    const currentSlideIndex = slidesData.slides.findIndex(slide => slide.id === slideId);
    const contentIndex = slidesData.slides[currentSlideIndex].content.findIndex(contentObj => contentObj.id === contentId);

   const data = slidesData.slides[currentSlideIndex].content[contentIndex].data;
   if(data){
    setQuestions(data);
   }else{
    setQuestions([initialQuestion]);
   }
  },[slideId])

  //below useEffect updates the changes of the childs state into the parents state
  useEffect(() => {
    setSlidesData((slidesdata) => {
      const newSlidesData = {
        ...slidesdata, slides: [...slidesdata.slides.map((slide) => {
          if (slide.id === slideId) {
            console.log("slide.slideId: ", slide.id);
            return {
              id: slide.id,
              content: [...slide.content.map((contentObject) => {
                if (contentObject.id === contentId) {
                  return {
                    id: contentObject.id,
                    type: contentObject.type,
                    data: questions
                  }
                }
                return {
                  ...contentObject
                }
              })]
            }
          } else {
            return { ...slide }
          }
        })]
      }
      return newSlidesData;
    })
  }, [questions])

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...initialQuestion }]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // ... (previous code)

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  // ... (rest of the component)


  const renderQuestion = (q, index) => {
    return (
      <div key={index}>
        <span>{`Q${index+1}`}</span>
        <input
          type="text"
          placeholder="Multiple Choice Question"
          value={q.question}
          onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
          style={{ width: '100%', border: 'none', marginBottom: '10px' , outline:"none" }}
        />
        {q.options.map((option, optIndex) => (
          <div key={optIndex}>
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            />
            <input
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={option}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].options[optIndex] = e.target.value;
                setQuestions(updatedQuestions);
              }}
              style={{
                width: '90%',
                border: 'none',
                marginBottom: '5px',
              }}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleRemoveQuestion(index)}>
          Remove Question
        </button>
        <button type="button" onClick={() => handleAddOption(index)}>
          Add Option
        </button>
      </div>
    );
  };


  return (
    <div>
      {questions.map((q, index) => renderQuestion(q, index))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default Quiz;
