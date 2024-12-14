import { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import WelcomeScreen from './pages/WelcomeScreen';
import Background from './pages/Background';
import { ToastContainer } from 'react-toastify';
import { GameProvider, useGameContext } from './context/GameContext';
import Game from './pages/Game';
import Navbar from './components/Navbar';

const AppContent = () => {
  const { isGameStarted,isLeaderboardOpen } = useGameContext();

  return (
    <>
      {isGameStarted && <Navbar/>}
      <Background>
        {isGameStarted ? <Game /> : <WelcomeScreen />}
        <ToastContainer/>
      </Background>
    </>
  );
}

const App = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;