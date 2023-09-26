import style from "./main.css";
import Phaser, { Game } from 'phaser';
import loadMultiImages from "./functions/loadMultiImages";
import createAudio from "./functions/createAudio";
import createText from "./functions/createText";
import createAnimation from "./functions/createAnimation";
import * as tweenAnimation from "./functions/createTween";

import { LoadScene } from "./scenes/loadScene";
import { IntroScene } from "./scenes/introScene";
import { MenuScene } from "./scenes/menuScene";
import { GameLearningScene } from './scenes/gameLearningScene'
import { GameScene } from "./scenes/gameScene";
import { GameScenePro } from "./scenes/gameScenePro";
import { CreditsScene } from "./scenes/creditsScene";
import { GameOverScene } from "./scenes/gameOverScene";


const cfg = {
  width: 440,  //440
  height: 950, //950
  backgroundColor: 'rgb(0, 10, 50)', //'rgb(0,0,100)'
  backgroundText: (200, 200, 'Loading...', {font: "30px Arial" , fill: 'yellow'}),
  type: Phaser.AUTO,
  // type: Phaser.CANVAS,
  parent: 'game',
  scene: [LoadScene, IntroScene, MenuScene,GameLearningScene, GameScene, GameScenePro,  CreditsScene, GameOverScene,],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, //false default
      gravity: { y: 0 }, // default gravity
    }
  },
  scale: {
    // mode: Phaser.Scale.FIT,
    mode: Phaser.Scale.SHOW_ALL,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH
   
  },
  window: {
    innerWidth :  innerWidth * window.devicePixelRatio,
    innerHeight : innerHeight * window.devicePixelRatio,
  },

  dom: {
    createContainer: true  
  },
  global: {
    unlockedProScene: false // Initial value of the global property for unlock pro scene
  }
};

const game = new Phaser.Game(cfg)


export {
  cfg,
  loadMultiImages,
  createAudio,
  createAnimation,
  createText,
  tweenAnimation,
}
