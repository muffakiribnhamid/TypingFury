import React from 'react';
import { useGameContext } from '../context/GameContext';

const Navbar = () => {
  const {name,setIsLeaderboardOpen} = useGameContext();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className='text-white text-2xl font-thin'>Keyboard <span className='text-red-500 font-bold hover:text-white cursor-pointer '>Fury</span></h1>
        </div>
        <div className="navbar-menu">
            <button className='text-white text-xl hover:text-red-500 ease-in-out duration-300 font-thin'>Welcome {name}!</button>
          {/* Add your navigation items here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;