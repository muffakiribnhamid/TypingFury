import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useGameContext } from '../context/GameContext';

const WelcomeScreen = () => {
  const {name, setName, isGameStarted, setIsGameStarted} = useGameContext();
  
  const handleGameStart = () => {
    if(name.trim() === '') {
      toast.error('Please enter your name');
      return;
    }
    setIsGameStarted(true);
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-white font-thin text-6xl hover:transform cursor-pointer hover:text-red-500 transition-all duration-300'>Keyboard <span className='text-red-500 font-bold hover:text-white cursor-pointer shadow-2xl'>Fury</span></h1>
        <h1 className='text-white font-thin text-2xl mt-10 underline'>Welcome to the game.</h1>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='text-black px-4 py-2 rounded-md mt-10 placeholder:text-black' 
          placeholder='Enter your name' 
        />
        <button onClick={handleGameStart} className='bg-white text-black px-4 py-2 rounded-md mt-10 w-20 hover:bg-red-500 hover:text-white transition-all duration-300'>
          Start
        </button>
    </div>
  )
}

export default WelcomeScreen