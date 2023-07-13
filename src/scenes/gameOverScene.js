import {
  Scene
} from 'phaser';
import * as fnc from '../game.js';
import {
  cfg
} from '../game.js';


export class GameOverScene extends Scene {
  constructor() {
    super('GameOverScene')
  }

  init() {
    console.log('Welcome to Game Over Scene')
  }

  preload() {
    //------------------------------load audio
    // this.load.audio('menuMusic', '/assets/sounds/bgMusic/menuMusic.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    //----------------------- buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
  }

  create() {
    //------------------------------ add SOUND
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()


    //------------------------------add TEXT
    this.gameOverText = fnc.createText(this, cfg.width / 2 - 50, 100, 'GAME OVER', '10em').setVisible(false)
    // this.gameOverText.setRotation(Math.PI / 2)




    //------------------------------ add IMAGE
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)

    //----------- setInteractive button
    this.btnExit.setInteractive({
        cursor: 'pointer'
      })
      .on('pointerover', () => this.btnExit.setTint(0xe0e0e0))
      .on('pointerout', () => this.btnExit.setTint(0xffffff))
      .on('pointerdown', () => {
        this.scene.start('IntroScene')
        //play sound
        this.soundBtnExitClick()
      })


    this.time.addEvent({
      delay: 1000,
      callback: this.onEvent,
      args: [],
      callbackScope: this,
      loop: true,
      timeScale: 1,
    });

  }

  onEvent() {
    let x = cfg.width / 2 - 40
    let y = 100
    for (let i = 0; i < this.gameOverText.text.length; i++) {
      // Create a separate text object for each letter
      const letter = this.add.text(x, y, this.gameOverText.text[i], {font: '10em aAblasco'  })
      // Get random colors
      let [a, b, c] = Phaser.Math.FloatBetween(0, 9).toString().split('.')[1].split(/(\d{2})/).filter(Boolean)
      // Colorize each letter individually
      letter.setColor(`#${a}${b}${c}`)
        // .setStroke('#fff', 1)
        // .setShadow(1, 1, "#ff0000", 1, true, true)
      y += 86
    }

  }
}