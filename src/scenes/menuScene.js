import {Scene} from'phaser';
import * as fnc from '../game.js';
import {cfg} from '../game.js'

export class MenuScene extends Scene {
  constructor() {
    super('MenuScene')
  }
  init() {
    console.log('MenuScene was loading...')
  }

  preload() {
    //------------------------------load AUDIO
    this.load.audio('btnClick', '/assets/sounds/effects/btnClick/click0.wav')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
    // this.load.audio('menuMusic', '/assets/sounds/bgMusic/menuMusic.mp3')
    
    //-------------------------------load IMAGES
    //buttons Sprite
     this.load.spritesheet('allButtons', '/assets/images/buttons/longBtn.png', { frameWidth: 500, frameHeight: 194, })
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    //---lockImg
    this.load.image('lock', '/assets/images/lock/lock.png')
  }
 
  create() {
    //-------------------------------add AUDIO
    this.soundBtnClick = () => fnc.createAudio(this,'btnClick').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClick').play()
    
    //-------------------------------add TEXT
    //---title
    const titleText = fnc.createText(this, 30, 50, 'Make You Choice...', '46px')
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    //---start game label
    const creditsText = fnc.createText(this, 30, 170, 'Press button to show credits', '28px').setShadow(1, 1, "#FFA500", 1, true, true)
    const learnGameText = fnc.createText(this, 50, 350, 'Press button to learning...', '28px').setShadow(1, 1, "#0000ff", 1, true, true)
    const proGameText = fnc.createText(this, 16, 530, 'Press button to start Pro game', '28px').setShadow(1, 1, "#ff0000", 1, true, true)
    const startGameText = fnc.createText(this, 20, 730, 'Press button to start game...', '28px').setShadow(1, 1, "#00ff00", 1, true, true)
    

    //-------------------------------add IMAGES
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35 , 37, 'btnExit').setScale(0.5)
    //-----------buttons from sprite
    //---btn credits
    this.btnCredits = this.add.sprite(cfg.width / 2, 280, 'allButtons', 0).setScale(0.4, 0.5)
    //-learn btn label
    fnc.createText(this, cfg.width / 2 - 60, 256, 'CREDITS','28px',null,null,'bold',)

    //---btn learning
    this.btnLearn = this.add.sprite(cfg.width / 2, 450, 'allButtons', 2).setScale(0.4, 0.5)
    //-learn btn label
    fnc.createText(this, cfg.width / 2 - 50, 436, 'LEARN','28px',null,null,'bold')
    
    //---btn start Pro Game
    this.btnProGame = this.add.sprite(cfg.width / 2 - 10, 650, 'allButtons', 1).setScale(0.4, 0.5)
    //-learn btn label
    fnc.createText(this, cfg.width / 2 - 66, 630, 'Play PRO','28px',null,null,'bold')

    //---btn start Play Game
    this.btnPlayGame = this.add.sprite(cfg.width / 2 - 10, 820, 'allButtons', 5).setScale(0.4, 0.5)
    //-learn btn label
    fnc.createText(this, cfg.width / 2 - 40, 820, 'PLAY','28px',null,null,'bold')

    //--------lock Pro Game
    this.lock = this.add.image(cfg.width / 2 + 65, 622, 'lock').setScale(0.3)
    cfg.global.unlockedProScene ? this.lock.setVisible(false) : null 
    
    //---------------------------add interactive btn options
    Array.from([this.btnExit, this.btnCredits, this.btnLearn, this.btnProGame, this.btnPlayGame, ])
      .forEach((btn, index) => { btn.setInteractive({ cursor: 'pointer', index })
        .on('pointerover', () => btn.setTint(0xc0c0c0))
        .on('pointerout', () =>  btn.setTint(0xffffff)) 
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          const currentScene = this.scene.scene;
          this.scene.stop(currentScene);

          if(index == 0) this.scene.start('IntroScene')
          if(index == 1) this.scene.start('CreditsScene')
          if(index == 2) this.scene.start('GameLearningScene')
          if(index == 4) this.scene.start('GameScene')
          if (index == 3) {
            if (cfg.global.unlockedProScene)  this.scene.start('GameScenePro')
            else this.scene.start('MenuScene')
          }
         
           // play sound btn click
          if (index == 0) this.soundBtnExitClick()
          else  this.soundBtnClick()

         }) 
       })


    //-------------------------------Tween Animations

    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, creditsText, 40,250)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, learnGameText, 30)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, proGameText, 30, 1000)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, startGameText)
   
   
  }

  update() {
  
  }


}