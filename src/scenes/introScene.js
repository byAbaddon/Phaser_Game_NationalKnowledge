import {Scene} from'phaser';
import * as fnc from '../game.js';
import {cfg} from '../game.js'

export class IntroScene extends Scene {
  constructor() {
    super('IntroScene')
  }
  init() {
    console.log('IntroScene was loading...')
  }

  preload() {
    //------------------------------load audio
    this.load.audio('btnStartClick', '/assets/sounds/effects/btnClick/click0.wav')
   
    // this.load.audio('menuMusic', '/assets/sounds/bgMusic/menuMusic.mp3')
    

    //-------------------------------images
    //---logo
    this.load.image('logo', '/assets/images/logo/globus.png')
    //button start
    this.load.spritesheet('btnControls', '/assets/images/buttons/longBtn.png',
      { frameWidth: 500, frameHeight: 194, startFrame: 4, endFrame: 0 });
    
   
  }
 
  create() {
    //----------------audio
    this.soundBtnStartClick = () => fnc.createAudio(this,'btnStartClick').play()
 
    //-------------------------------add IMAGES
    //---logo
   const logo = this.add.image(cfg.width / 4.5, 250,'logo').setOrigin(0, 0).setScale(0.6)
    


    //-------------------------------add TEXT
    //---logo
    const titleText = fnc.createText(this, 30, 100, 'National Knowledge','40px')

    //---start game label
    const subTitleText = fnc.createText(this, 20, cfg.height - 270, 'Press button to Menu game...','28px')
 
    // ------------------------------buttons
    this.btnStart = this.add.image(cfg.width / 2, cfg.height - 150, 'btnControls').setScale(0.4, 0.5)
    //---start btn label
    fnc.createText(this, cfg.width / 2 - 50, cfg.height - 150, 'MENU','28px',null,null,'bold')
    
     
    this.btnStart.setInteractive({ cursor: 'pointer'})                      //    write direct css command  in   setInteractive()
    .on('pointerover', () => this.btnStart.setTint(0xe0e0e0))
    .on('pointerout',  () =>  this.btnStart.setTint(0xffffff))
      .on('pointerdown', () => {
        this.scene.start('MenuScene')
        //play sound
        this.soundBtnStartClick()
      })


    //-------------------------------Tween Animations
    // fnc.tweenAnimation.createRotateAnimation(this, logo)
    // fnc.tweenAnimation.createTextChangeColorAnimation(this,titleText)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, subTitleText)

   
  }

  update() {
  
  }


}
