'use client'
import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from 'react-icons/fa';
import { useTheme } from 'next-themes'
import Loading from './loading';

const page = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [browserSupportsRecognition, setBrowserSupportsRecognition] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const load = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    load();
    setBrowserSupportsRecognition(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleAddTodo = () => {
    if (transcript.trim() !== '') {
      setTodos([...todos, transcript]);
      resetTranscript();
    } else if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const splitTodo = (todo) => {
    const regex = new RegExp(`.{1,100}`, 'g');
    return todo.match(regex);
  };

  return (
    <>
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        {isLoading ? (
          <Loading />
        ) : browserSupportsRecognition ? null : (
          <span>Browser doesn't support speech recognition.</span>
        )}



        {!isLoading ? (
          <form onSubmit={handleFormSubmit} className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded">
            <input
              type="text"
              value={inputValue ? inputValue : transcript}
              onChange={handleInputChange}
              placeholder="Add a new todo"
              className="flex-1 mr-2 py-1 px-2 rounded"
            />
            <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Add
            </button>
            <button
              className={`flex items-center justify-center h-8 w-8 rounded-full bg-gray-300 focus:bg-gray-300 ml-2`}
              onClick={() => {
                if (listening) {
                  SpeechRecognition.stopListening();
                } else {
                  SpeechRecognition.startListening();
                }
              }}
            >
              <FaMicrophone className={`h-6 w-6 ${listening ? 'text-red-500' : 'text-green-500'}`} />
            </button>
          </form>
        ) : null}



        <ul className="mt-4">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center justify-between py-2 px-4 bg-gray-100 text-black rounded mt-2">
              <span style={{ wordBreak: 'break-all' }}>
                {splitTodo(todo).map((substring, i) => (
                  <React.Fragment key={i}>
                    {substring}
                    <br />
                  </React.Fragment>
                ))}
              </span>



              <button onClick={() => handleDeleteTodo(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
