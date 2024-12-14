import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import rocketIcon from '../assets/rocket-icon.png';
import keyPressSound from '../assets/keypressed.mp3';


const FallingWords = () => {
    const [words, setWords] = useState([]);
    const [typedWord, setTypedWord] = useState('');
    const { score, setScore } = useGameContext();
    const { level, setLevel } = useGameContext();
    const { lifes, setLifes } = useGameContext();
    const [rockets, setRockets] = useState([]);
    const [audio] = useState(new Audio(keyPressSound));
    
    const wordList = [
        "react", "javascript", "programming", "computer", "keyboard", "mouse", "screen",
        "code", "developer", "web", "application", "software", "design", "interface", "database",
        "frontend", "backend", "fullstack", "debug", "console", "syntax", "bug", "framework",
        "library", "variables", "functions", "loop", "array", "object", "API", "DOM",
        "event", "callback", "promise", "async", "await", "json", "localstorage", "redux",
        "state", "props", "component", "lifecycle", "hooks", "module", "bundle", "webpack",
        "npm", "yarn", "cli", "terminal", "git", "commit", "branch", "merge", "pull",
        "push", "repo", "markdown", "emoji", "meme", "dank", "lol", "rofl", "debugging",
        "stack", "overflow", "github", "functionality", "lint", "eslint", "prettier", "types",
        "typescript", "html", "css", "scss", "sass", "node", "express", "mongoose",
        "schema", "token", "auth", "session", "cookie", "http", "https", "rest", "graphql",
        "server", "client", "testing", "jest", "chai", "mocha", "regex", "pattern",
        "match", "asyncify", "virtual", "npm-init", "fetch", "promise-all", "hoisting"
        ];

    // Fix level increment logic
    useEffect(() => {
        if (score >= level * 100) {
            setLevel(prev => prev + 1);
            setLifes(prev => prev + 1);
        }
    }, [score, level, setLevel]);


    useEffect(() => {
        const maxWords = Math.min(level, 10);
        
        const interval = setInterval(() => {
            setWords(currentWords => {
                // Filter out words that are off screen and handle penalties
                const remainingWords = currentWords.filter(word => {
                    if (word.top > window.innerHeight - 100) {
                        // Deduct score and life when word hits bottom
                        setScore(prev => Math.max(0, prev - 10));
                        setLifes(prev => Math.max(0, prev - 1));
                        return false;
                    }
                    return true;
                });
                
                // Rest of the word movement and spawning logic
                const movedWords = remainingWords.map(word => ({
                    ...word,
                    top: word.top + 5
                }));

                if (movedWords.length < maxWords) {
                    const newWord = {
                        id: Math.random(),
                        text: wordList[Math.floor(Math.random() * wordList.length)],
                        position: Math.random() * (window.innerWidth - 100),
                        top: -20,
                        isError: false
                    };
                    return [...movedWords, newWord];
                }
                
                return movedWords;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [level, setScore, setLifes]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Reset audio to start and play
            audio.currentTime = 0;
            audio.play().catch(err => console.log('Audio play failed:', err));

            if (e.key === 'Backspace') {
                setTypedWord(prev => prev.slice(0, -1));
                return;
            }
            
            if (e.key.length === 1) { // Only single characters
                setTypedWord(prev => prev + e.key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [audio]);

    useEffect(() => {
        if (!typedWord) return;
        
        const matchedWordIndex = words.findIndex(word => word.text === typedWord);
        
        if (matchedWordIndex !== -1) {
            // Word matched completely
            setScore(prev => prev + 10);
            setTypedWord('');
            
            // Create a rocket animation
            const targetWord = words[matchedWordIndex];
            const newRocket = {
                id: Math.random(),
                startX: window.innerWidth / 2,
                startY: window.innerHeight - 100,
                endX: targetWord.position,
                endY: targetWord.top
            };
            setRockets(prev => [...prev, newRocket]);

            setWords(prev => {
                const newWords = [...prev];
                newWords[matchedWordIndex] = { ...newWords[matchedWordIndex], isPop: true };
                return newWords;
            });

            // Remove both rocket and word after animation
            setTimeout(() => {
                setWords(prev => prev.filter((_, index) => index !== matchedWordIndex));
                setRockets(prev => prev.filter(rocket => rocket.id !== newRocket.id));
            }, 500);
        } else {
            const isStartOfAnyWord = words.some(word => word.text.startsWith(typedWord));
            
            if (!isStartOfAnyWord && typedWord.length > 0) {
                setScore(prev => Math.max(0, prev - 5));
                setTypedWord('');
                
                // Mark all words as error and shaking
                setWords(prev => prev.map(word => ({ 
                    ...word, 
                    isError: true,
                    isShaking: true
                })));
                
                // After shake animation, remove the words
                setTimeout(() => {
                    setWords(prev => prev.filter(word => !word.isError));
                }, 500);
            }
        }
    }, [typedWord, setScore]);

    return (
        <>
        {lifes > 0 ? (
         <div className="fixed inset-0 w-full h-full">
            <div className="absolute top-4 right-4 p-10 text-white text-2xl">
                Score: {score} <br />
                Lifes : {lifes} <br />
                Level : {level}
            </div>
            {words.map(word => (
                <div
                    key={word.id}
                    className={`absolute text-2xl transition-all duration-300
                        ${word.isPop ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
                        ${word.isError ? 'text-red-500' : word.text.startsWith(typedWord) ? 'text-green-400' : 'text-white'}
                        ${word.isShaking ? 'animate-shake' : ''}`}
                    style={{
                        left: `${word.position}px`,
                        top: `${word.top}px`,
                    }}
                >
                    {word.text}
                </div>
            ))}

            {rockets.map(rocket => (
                <img
                    key={rocket.id}
                    src={rocketIcon}
                    alt="rocket"
                    className="absolute w-8 h-8 transition-all duration-500"
                    style={{
                        left: rocket.startX,
                        top: rocket.startY,
                        transform: `translate(${rocket.endX - rocket.startX}px, ${rocket.endY - rocket.startY}px)`,
                    }}
                />
            ))}

            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl">
                {typedWord}
            </div>
         </div>
        ) : (
            <div className="fixed flex flex-col inset-0 w-full h-full bg-black  justify-center items-center">
                <h1 className="text-white text-4xl font-bold">Game Over</h1>
                <button className="bg-white text-black px-4 mt-10 py-2 rounded-md hover:bg-red-500 hover:text-white" onClick={() => setLifes(3)}>
                    Restart
                </button>
            </div>
        )}
        </>
       
    );
};

export default FallingWords;
