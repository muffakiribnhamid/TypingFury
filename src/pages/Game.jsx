// src/pages/Game.jsx
import React, { useState } from 'react'
import { useGameContext } from '../context/GameContext';
import Navbar from '../components/Navbar';
import KeyBoard from '../components/KeyBoard';
import Loader from '../components/Loader';
import FallingWords from '../components/FallingWords';

const Game = () => {
    const {name, startGame, setStartGame} = useGameContext();
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 3000);

    return (
        <>
        {isLoading ? <Loader/> : (
            <div>
                {startGame ? (
                    <div className="relative">
                        <FallingWords />
                        <div className="fixed bottom-0 w-full">
                            <KeyBoard/>
                        </div>
                    </div>
                ) : (
                    <button 
                        className='bg-white text-black px-4 py-2 rounded-md hover:bg-red-500 hover:text-white' 
                        onClick={() => setStartGame(true)}
                    >
                        Do you wanna play?
                    </button>
                )}
            </div>
        )}
        </>
    )    
}

export default Game;