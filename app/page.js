'use client'
import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; import Logo from '../public/logo.png'
import Logo2 from '../public/logo2.png'
import Image from 'next/image'
import { FaMoon, FaMicrophone } from 'react-icons/fa';



const TodoListHeader = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    const body = document.querySelector('body');
    if (isNightMode) {
      body.style.backgroundColor = 'white';
    } else {
      body.style.backgroundColor = 'black';
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  }

  const handleAddTodo = () => {
    if (transcript.trim() !== '') {
      setTodos([...todos, transcript]);
      resetTranscript();
    } else if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  }

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const splitTodo = (todo) => {
    const regex = new RegExp(`.{1,100}`, 'g');
    return todo.match(regex);
  }

  return (
    <>
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        <header className={`flex items-center justify-between py-6 px-10 mx-auto rounded ${isNightMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-black'}`}>
          <div className="flex items-center flex-1">
            <Image src={isNightMode ? Logo2 : Logo} alt="Logo" width={70} height={70} className="mr-4" />
            <h1 className="text-lg font-bold flex-1 text-center">My Todo List</h1>
          </div>
          <div className="flex items-center">
            <button className={`flex items-center justify-center h-8 w-8 rounded-full ${isNightMode ? 'bg-gray-700 hover:bg-gray-900 focus:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300'}`} onClick={toggleNightMode}>
              <span className="sr-only">Toggle night mode</span>
              <FaMoon className={`h-6 w-6 ${isNightMode ? 'text-white' : 'text-black'}`} />
            </button>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button className={`flex items-center justify-center h-8 w-8 rounded-full ${isNightMode ? 'bg-gray-700 hover:bg-gray-900 focus:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300'} ml-2`}
              onClick={SpeechRecognition.startListening}>
              <span className="sr-only">Add todo with voice</span>
              <FaMicrophone className={`h-6 w-6 ${isNightMode ? 'text-white' : 'text-black'}`} />

            </button>
          </div>
        </header>
        <form onSubmit={handleFormSubmit} className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded">
          <input type="text" value={inputValue ? inputValue : transcript}
            onChange={handleInputChange} placeholder="Add a new todo" className="flex-1 mr-2 py-1 px-2 rounded" />
          <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add</button>
        </form>
        <ul className="mt-4">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center justify-between py-2 px-4 bg-gray-100 rounded mt-2">
              <span style={{ wordBreak: 'break-all' }}>
                {splitTodo(todo).map((substring, i) => (
                  <React.Fragment key={i}>
                    {substring}
                    <br />
                  </React.Fragment>
                ))}
              </span>
              <button onClick={() => handleDeleteTodo(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default TodoListHeader
