import { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';

const Background = ({ children }) => {
  const { isGameStarted } = useGameContext();
  const words = [
    "Increase typing speed!", 
    "Your typing sucks?", 
    "Practice makes perfect", 
    "Type like a pro", 
    "Speed matters!", 
    "Accuracy is key", 
    "Keep practicing", 
    "Beat your record", 
    "Type faster!", 
    "Challenge yourself", 
    "Keyboard warrior", 
    "Master typing", 
    "Swift fingers", 
    "Level up!", 
    "No looking down", 
    "Focus on speed", 
    "Keep going!", 
    "New high score?", 
    "Getting better!", 
    "Never give up"
  ];

  const [flyingWords, setFlyingWords] = useState([]);

  useEffect(() => {
    if (isGameStarted) {
      setFlyingWords([]);
      return;
    }

    const createWord = () => {
      const word = words[Math.floor(Math.random() * words.length)];
      const startPosition = Math.random() * window.innerWidth;
      const duration = 15 + Math.random() * 20; // Random duration between 15-35s
      const rotation = Math.random() * 360;
      const size = 12 + Math.random() * 20; // Random size between 12-32px

      return {
        id: Date.now() + Math.random(),
        word,
        startPosition,
        duration,
        rotation,
        size
      };
    };

    const addNewWord = () => {
      setFlyingWords(prev => [...prev, createWord()]);
    };

    // Initial words
    for (let i = 0; i < 10; i++) {
      addNewWord();
    }

    // Add new word every 2 seconds
    const interval = setInterval(addNewWord, 2000);

    // Clean up old words every 5 seconds
    const cleanup = setInterval(() => {
      setFlyingWords(prev => prev.slice(-20)); // Keep only last 20 words
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, [isGameStarted]);

  return (
    <div className="background">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {!isGameStarted && flyingWords.map(({ id, word, startPosition, duration, rotation, size }) => (
        <div
          key={id}
          className="flying-word"
          style={{
            left: `${startPosition}px`,
            animation: `flyAcross ${duration}s linear infinite`,
            transform: `rotate(${rotation}deg)`,
            fontSize: `${size}px`
          }}
        >
          {word}
        </div>
      ))}
      <div className="background-content">
        {children}
      </div>
    </div>
  );
};

export default Background;