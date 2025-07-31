import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import FocusRoom from '../phaser/FocusRoom';
import Hallway from '../phaser/Hallway';

function GameCanvas() {
  const gameContainer = useRef(null);

  useEffect(() => {
    if (!gameContainer.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [FocusRoom, Hallway]
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} />;
}

export default GameCanvas;
