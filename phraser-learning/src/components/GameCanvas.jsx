// GameCanvas.jsx
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import FocusRoom from '../phaser/FocusRoom';
import Hallway from '../phaser/Hallway';
import DiscussionRoom from '../phaser/DiscussionRoom';
import ExplorationRoom from '../phaser/ExplorationRoom';

function GameCanvas() {
  const gameContainer = useRef(null);

  useEffect(() => {
    if (!gameContainer.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      backgroundColor: '#34495e',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [Hallway, FocusRoom, DiscussionRoom, ExplorationRoom] // Hallway first as main scene
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={gameContainer} className="border-2 border-[#34495e] rounded-[10px]" />
      <div className="mt-2.5 p-2.5 bg-black/80 text-white rounded font-normal text-xs">
      </div>
    </div>
  );
}

export default GameCanvas;