import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const KeyBoard = () => {
  const [pressedKey, setPressedKey] = useState(null);

  const handleKeyPress = (key) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 200);
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);

      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getKeyClass = (key) => {
    return `keyboard-key ${pressedKey === key ? 'animate-glow' : ''}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-10 gap-1 mb-2">
          <button onClick={() => handleKeyPress('Q')} className={getKeyClass('Q')}>Q</button>
          <button onClick={() => handleKeyPress('W')} className={getKeyClass('W')}>W</button>
          <button onClick={() => handleKeyPress('E')} className={getKeyClass('E')}>E</button>
          <button onClick={() => handleKeyPress('R')} className={getKeyClass('R')}>R</button>
          <button onClick={() => handleKeyPress('T')} className={getKeyClass('T')}>T</button>
          <button onClick={() => handleKeyPress('Y')} className={getKeyClass('Y')}>Y</button>
          <button onClick={() => handleKeyPress('U')} className={getKeyClass('U')}>U</button>
          <button onClick={() => handleKeyPress('I')} className={getKeyClass('I')}>I</button>
          <button onClick={() => handleKeyPress('O')} className={getKeyClass('O')}>O</button>
          <button onClick={() => handleKeyPress('P')} className={getKeyClass('P')}>P</button>
        </div>
        <div className="grid grid-cols-9 gap-1 mb-2 ml-4">
          <button onClick={() => handleKeyPress('A')} className={getKeyClass('A')}>A</button>
          <button onClick={() => handleKeyPress('S')} className={getKeyClass('S')}>S</button>
          <button onClick={() => handleKeyPress('D')} className={getKeyClass('D')}>D</button>
          <button onClick={() => handleKeyPress('F')} className={getKeyClass('F')}>F</button>
          <button onClick={() => handleKeyPress('G')} className={getKeyClass('G')}>G</button>
          <button onClick={() => handleKeyPress('H')} className={getKeyClass('H')}>H</button>
          <button onClick={() => handleKeyPress('J')} className={getKeyClass('J')}>J</button>
          <button onClick={() => handleKeyPress('K')} className={getKeyClass('K')}>K</button>
          <button onClick={() => handleKeyPress('L')} className={getKeyClass('L')}>L</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 ml-8">
          <button onClick={() => handleKeyPress('Z')} className={getKeyClass('Z')}>Z</button>
          <button onClick={() => handleKeyPress('X')} className={getKeyClass('X')}>X</button>
          <button onClick={() => handleKeyPress('C')} className={getKeyClass('C')}>C</button>
          <button onClick={() => handleKeyPress('V')} className={getKeyClass('V')}>V</button>
          <button onClick={() => handleKeyPress('B')} className={getKeyClass('B')}>B</button>
          <button onClick={() => handleKeyPress('N')} className={getKeyClass('N')}>N</button>
          <button onClick={() => handleKeyPress('M')} className={getKeyClass('M')}>M</button>
        </div>
      </div>
    </div>
  )
}

export default KeyBoard