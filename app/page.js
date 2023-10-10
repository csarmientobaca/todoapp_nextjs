'use client'
import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from 'react-icons/fa';
import Loading from './loading';

import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

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

  const [user] = useAuthState(auth);

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
      addTodoToFirestore(inputValue);
      setInputValue('');
    }
  };

  const handleAddTodo = () => {
    if (transcript.trim() !== '') {
      addTodoToFirestore(transcript);
      resetTranscript();
    } else if (inputValue.trim() !== '') {
      addTodoToFirestore(inputValue);
      setInputValue('');
    }
  };

  const handleDeleteTodo = async (index) => {
    const todoToDelete = todos[index];

    // Delete the todo item from Firestore
    try {
      await deleteDoc(doc(db, `user/${user?.uid}/todos/${todoToDelete.id}`));
      alert("Todo Deleted");
    } catch (error) {
      alert("Error deleting todo: " + error.message);
    }

    // Update the local state to reflect the deletion
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const splitTodo = (todo) => {
    const regex = new RegExp(`.{1,100}`, 'g');
    return todo.match(regex);
  };

  const addTodoToFirestore = (todoText) => {
    addDoc(collection(db, `user/${user?.uid}/todos`), {
      todoName: todoText,
      status: false,
      time: serverTimestamp(),
    })
      .then(() => alert("Todo Added"))
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    onSnapshot(
      query(collection(db, `user/${user?.uid}/todos`), orderBy("time", "desc")),
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todoName: doc.data().todoName,
            time: doc.data().time,
            status: doc.data().status,
          }))
        );
      }
    );
  }, [user]);

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
                {splitTodo(todo.todoName).map((substring, i) => (
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
