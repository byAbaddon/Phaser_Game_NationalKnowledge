import { Scene } from 'phaser'
import * as fnc from '../game.js';
import { cfg } from '../game.js'

export class GameScene extends Scene {
  constructor() {
    super('GameScene');
    this.counterFlagsGame = 0
    this.codeToFind = ''
    this.currentCode = ''
    this.correctCountPoints = 0
    this.incorrectCountPoints = 0
    this.counterAnimation = 0
  }

  init() {
    console.log('Welcome to GameScene Play...'); 
    this.correctCountPoints = 0
    this.incorrectCountPoints = 0
  }

  preload() {

    //----------------json data
    this.load.json('data', '/assets/images/flags/country.json')

    //------------------------------load audio
    // this.load.audio('menuMusic', '/assets/sounds/bgMusic/menuMusic.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('correctAnswerSound', '/assets/sounds/effects/answers/correctAnswer.wav')
    this.load.audio('incorrectAnswerSound', '../assets/sounds/effects/answers/incorrectAnswer.wav')
  
    //-----------------------------load IMAGES


    //----------------------- buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    //---btnStart
    this.load.image('btnStart', '/assets/images/buttons/btnStart.png')
    this.load.image('btnYes', '/assets/images/buttons/btnYes.png')
    // this.load.image('btnNo', '/assets/images/buttons/btnNo.png')
    // this.load.image('btnBackTwo', '/assets/images/buttons/btnBack2.png')

    this.load.image('btnGo', '/assets/images/buttons/btnGo.png')
    this.load.image('btnBack', '/assets/images/buttons/btnBack.png')

  }

  create() {
    //----------------audio
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundCorrectAnswer = () => fnc.createAudio(this, 'correctAnswerSound',).play()
    this.soundIncorrectAnswer = () => fnc.createAudio(this, 'incorrectAnswerSound', 0.5).play()

    //----------------TEXT
    fnc.createText(this, cfg.width / 2 - 50, 30, 'PLAY', 46, 'white')
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    //---correctAnswer
    let correct = fnc.createText(this, 30, 100, `Correct: ${this.correctCountPoints}`, 30, 'green')
    //---incorrectAnswer
    let incorrect = fnc.createText(this, 240, 100, `Incorrect: ${this.incorrectCountPoints}`, 30, 'brown')
    //frame
    const frame = this.add.graphics().lineStyle(3, 0xffffff).strokeRect(19, 150, 402, 301)

    //----------------all images form directory
    this.flagsArray = this.cache.json.get('data') 
      .filter(x => x.continent && x.country && x.capital && x.code && x.population && x.flag_4x3)
    this.allFlagsLength = this.flagsArray.length - 1

    //-----generate random flag
    this.randomData = Phaser.Math.Between(0, this.allFlagsLength) 
    const { country, capital, code, continent, population, flag_4x3 } = this.flagsArray[this.randomData]
     //code
    this.codeToFind = code  
    
    this.load.svg(code, `/assets/images/flags${flag_4x3}` , { width: 400, height: 400 });
    this.load.on('complete', () => {
      this.currentFlagGame = this.add.image(20, 100, 'af').setOrigin(0, 0)
    })//.start()
   
    //------------------------------ buttons
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)
    //---btnStart
    this.btnStart = this.add.image(220, cfg.height - 86, 'btnStart', 0).setScale(0.5)

    //---btnBack
    this.btnBack = this.add.image(80, cfg.height - 86, 'btnBack', 0).setScale(0.75) 
    this.btnBack.setVisible(false)
    //---btnYes
    this.btnYes = this.add.image(cfg.width - 220, cfg.height - 86, 'btnYes', 0).setScale(0.5)
    this.btnYes.setVisible(false)
     //---btnGo
    this.btnGo = this.add.image(cfg.width - 80, cfg.height - 86, 'btnGo', 1).setScale(0.75)
    this.btnGo.setVisible(false)

    //---------------------------add interactive btn options
    Array.from([this.btnExit, this.btnStart, this.btnYes, this.btnGo, this.btnBack]).forEach((btn, index) => {
      btn.setInteractive({cursor: 'pointer',index})
        .on('pointerover', () => btn.setTint(0xe0e0e0))
        .on('pointerout', () => btn.setTint(0xffffff))
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) {
            const currentScene = this.scene.scene;
            this.scene.stop(currentScene);
            this.scene.start('MenuScene')
          }
          if (index == 1) { //btn Start
            frameRect.setVisible(false)
            textContainer.setVisible(false)
            this.btnStart.setVisible(false)
            this.btnYes.setVisible(true)
            this.btnGo.setVisible(true)
            this.btnBack.setVisible(true)
          }

          if (index == 2) { //btn Yes   Correct Answer
            if (this.currentCode == this.codeToFind) {
              //set new text points
              correct.setText(`Correct: ${++this.correctCountPoints}`)
              this.soundCorrectAnswer()
              //unlockProSceneGame
              if(this.correctCountPoints >= 5) cfg.global.unlockedProScene = true  //5
              
             //---- generate new data
              this.randomData =  Phaser.Math.Between(0, 265)
              const {country, capital, code, continent, population, flag_4x3 } = this.flagsArray[this.randomData]
              this.codeToFind = code
              this.textContinent.text = continent
              this.textCountry.text = country
              this.textCapital.text = capital
              this.textPopulation.text = population
              this.textCode.text = code


            } else {  //incorrect
              this.soundIncorrectAnswer()
              incorrect.setText(`Incorrect: ${++this.incorrectCountPoints}`)
              if (this.incorrectCountPoints >= 10) {
                this.scene.start('GameOverScene')
              }
            }
          }

          if (index == 3) setTimeout(() => this.counterFlagsGame++, 100)
          if (index == 4) setTimeout(() => this.counterFlagsGame--, 100)
  
          setTimeout(() => {
           // fix flags rotations
            if (this.counterFlagsGame > this.allFlagsLength) this.counterFlagsGame = 0
             if (this.counterFlagsGame < 0) this.counterFlagsGame = this.allFlagsLength
             const { code, flag_4x3 } = this.flagsArray[this.counterFlagsGame]
             this.currentCode = code
             this.load.svg(code, `/assets/images/flags${flag_4x3}`, { width: 400, height: 400 })
            this.load.once('complete', () => this.currentFlagGame.setTexture(code)).start()
         }, 200);
           

          //---------play sound btn click
          if (index == 0) this.soundBtnExitClick()
          else this.soundBtnClick()
        })
    })

 
    //------------------------add text

     //---continent
     fnc.createText(this, 16, cfg.height / 2, `Continent:`, '3.6em','#fff')
     this.textContinent = fnc.createText(this, 200, cfg.height / 2 + 5, continent, '3.3em', '#42A5F5')

     //---country
     fnc.createText(this,16, cfg.height / 2 + 50, `Country:`,'3.6em','#fff')
     this.textCountry =  fnc.createText(this, 20, cfg.height / 2 + 90, country, '3.3em', '#FFD600')  
     
     //---capital
     fnc.createText(this, 16, cfg.height / 2 + 130, `Capital:`, '3.6em', '#fff')
     this.textCapital = fnc.createText(this, 20, cfg.height / 2 + 170, capital,'3.3em', '#FF8F00')
     
     //---population
     fnc.createText(this, 16, cfg.height / 2 + 210, `Population:`,'3.6em', '#fff')
     this.textPopulation = fnc.createText(this, 210, cfg.height / 2 + 215, population, '3.3em', '#539350')
     
     //---code
     fnc.createText(this, 16, cfg.height / 2 + 260 , `Code:`,'3.6em', '#fff')
     this.textCode = fnc.createText(this, 124, cfg.height / 2 + 265, code, '3.3em', '#E53935') 


    //---------------frame rect hide playground field
    const frameRect = this.add.rectangle(10, 140, 440, 660, 0x000a32).setOrigin(0, 0)
    //-----------Container

    const labelOne = fnc.createText(this, 15, 240, 'Select the correct advisory\n flag of the given country.', '3em')
    const labelTwo = fnc.createText(this, 10, 420, 'Confirm with the green button.', '2.8em', 'green')
    const labelTwoInfo = fnc.createText(this, 10, 460, '(get five correct answers to unlock\n PlayPro)', '2.4em', 'green')
    const labelOr = fnc.createText(this, 190, 540, 'or', '3em', 'yellow')
    const labelThree = fnc.createText(this, 15, 600, 'Skip the incorrect ones.', '3em', 'red')
    const labelThreeInfo = fnc.createText(this, 15, 640, '(if you get more ten wrong answer\n Game Over)', '2.4em', 'red')
    let textContainer = this.add.container(10)
    textContainer.add([labelOne, labelTwo, labelTwoInfo, labelOr, labelThree, labelThreeInfo])


  }

  update() {
 
  }


}