import React from 'react';
import GameCanvas from './components/GAmeCanvas';

function App() {
  return (
    <div className='h-screen  w-screen bg-black text-white flex items-center justify-center'>
      <h1>Learning Metaverse </h1>
      <GameCanvas />
    </div>
  );
}

export default App;
