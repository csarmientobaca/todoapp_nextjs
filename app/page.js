'use client' // 👈 use it here
import React, { useState } from 'react'
import Logo from '../public/logo.png'
import Logo2 from '../public/logo2.png'
import Image from 'next/image'
import { FaMoon } from 'react-icons/fa';

const TodoListHeader = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    const body = document.querySelector('body');
    if (isNightMode) {
      body.style.backgroundColor = 'white';
    } else {
      body.style.backgroundColor = 'black';
    }
  }

  return (
    <header className={`flex items-center justify-between py-6 px-10 mx-auto rounded ${isNightMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-black'}`} style={{ margin: '0 auto', maxWidth: '600px' }}>
      <div className="flex items-center flex-1">
        <Image src={isNightMode ? Logo2 : Logo} alt="Logo" width={70} height={70} className="mr-4" />
        <h1 className="text-lg font-bold flex-1 text-center">My Todo List</h1>
      </div>
      <button className={`flex items-center justify-center h-8 w-8 rounded-full ${isNightMode ? 'bg-gray-700 hover:bg-gray-900 focus:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300'}`} onClick={toggleNightMode}>
        <span className="sr-only">Toggle night mode</span>
        <FaMoon className={`h-6 w-6 ${isNightMode ? 'text-white' : 'text-black'}`} />
      </button>
    </header>
  )
}

export default TodoListHeader
