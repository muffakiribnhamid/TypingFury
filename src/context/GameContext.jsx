import { createContext, useContext, useState } from "react";


const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [name,setName] = useState('');
    const [startGame,setStartGame] = useState(false);
    const [lifes,setLifes] = useState(3);
    const [isGameStarted,setIsGameStarted] = useState(false);
    const [score,setScore] = useState(0);
    const [topScores,setTopScores] = useState([]);
    const [isGameOver,setIsGameOver] = useState(false);
    const [level,setLevel] = useState(1);
    const [words,setWords] = useState([]);
    const [currentWordIndex,setCurrentWordIndex] = useState(0);
    const [currentWord,setCurrentWord] = useState('');
    const [currentLetterIndex,setCurrentLetterIndex] = useState(0);

    
    return (
        <GameContext.Provider value={{name,setName,isGameStarted,setIsGameStarted,startGame,setStartGame,score,setScore,isGameOver,setIsGameOver,lifes,setLifes,level,setLevel,words,setWords,currentWordIndex,setCurrentWordIndex,currentWord,setCurrentWord,currentLetterIndex,setCurrentLetterIndex,topScores,setTopScores,isLeaderboardOpen,setIsLeaderboardOpen}}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => useContext(GameContext);

