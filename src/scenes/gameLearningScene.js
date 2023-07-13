import { Scene } from 'phaser';
import { cfg } from '../game.js';
import * as fnc from '../game.js';

export class GameLearningScene extends Scene {
  constructor() {
    super('GameLearningScene');
    this.counterFlags = 0
  }

  init() {
    console.log('Welcome to GameLearningScene')
    this.counterFlags = 0
  }

  preload() {
    //----------------json data
    this.load.json('data', '/assets/images/flags/country.json')

    //------------------------------load audio
    this.load.audio('btnClickArrowLearning', '/assets/sounds/effects/btnClick/clickDouble.wav')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
    // this.load.audio('menuMusic', '/assets/sounds/bgMusic/menuMusic.mp3')
    //------------------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    this.load.image('btnGo', '/assets/images/buttons/btnGo.png')
    this.load.image('btnBack', '/assets/images/buttons/btnBack.png')
  }

  create() {
   //----------------audio
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickArrowLearning', 0.6).play()
    this.soundBtnExitClick = () => fnc.createAudio(this,'btnExitClick').play()
   //frame
    const frame = this.add.graphics().lineStyle(3, 0xffffff).strokeRect(19, 150, 402, 301)

   //----------------all images form directory
    this.dataArray = this.cache.json.get('data')
    const { country, capital, code, continent, population, flag_4x3 } = this.dataArray[this.counterFlags];    
    this.load.svg(code, `/assets/images/flags${flag_4x3}` , { width: 400, height: 400 });

    this.load.on('complete', () => {
     this.currentFlag = this.add.image(20, 100, code).setOrigin(0, 0)
    }).start();
 
    //------------------------------ buttons
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35 , 37, 'btnExit').setScale(0.5)
    //---btnGo
    this.btnGo = this.add.image(cfg.width - 150, cfg.height - 86, 'btnGo', 1).setScale(0.75)
    //---btnBack
    this.btnBack = this.add.image(140, cfg.height - 86, 'btnBack', 0).setScale(0.75)  
      
    //---------------------------add interactive btn options
    Array.from([this.btnExit, this.btnGo, this.btnBack, ]).forEach((btn, index) => {
       btn.setInteractive({ cursor: 'pointer', index })
        .on('pointerover', () => btn.setTint(0xc0c0c0))
        .on('pointerout', () =>  btn.setTint(0xffffff)) 
         .on('pointerdown', () => {
           //  cfg.transitionBetweenScene('MenuScene') // translation between scene
           if (index == 0) {
            const currentScene = this.scene.scene;
             this.scene.stop(currentScene);
             this.scene.start('MenuScene')
            } 
            if (index == 1) this.counterFlags++//increase n flag
            if (index == 2) this.counterFlags-- //decrease n flag
            if (this.counterFlags > 265) this.counterFlags = 0
            if (this.counterFlags < 0) this.counterFlags = 265
           
             const {country, capital, code, continent, population, flag_4x3} = this.dataArray[this.counterFlags]
          
             this.textContinent.text = continent
             this.textCountry.text = country
             this.textCapital.text = capital
             this.textPopulation.text = population
             this.textCode.text = code
             this.load.svg(code, `/assets/images/flags${flag_4x3}` , { width: 400, height: 400 });
             this.load.once('complete', () => this.currentFlag.setTexture(code)).start()
     
             try {
              this.textCountry.setFontSize('3.3em') 
              this.textCapital.setFontSize('3.3em')
              
              if (country.length > 25)  this.textCountry.setFontSize('2.2em') 
              if (capital.length > 25)  this.textCapital.setFontSize('2.2em')
               
               
            } catch { }  // if no country or capital Do nothing
           
             // play sound btn click
            if (index == 0) this.soundBtnExitClick()
            else this.soundBtnClick()
  
      }) 
    })
   
    //------------------------add text
     //---title
    fnc.createText(this, 50, 30, 'Just learning...', '5em').setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    //---continent
    fnc.createText(this, 16, cfg.height / 2, `Continent:`, '3.6em','#fff')
    this.textContinent = fnc.createText(this, 196, cfg.height / 2 + 5, continent, '3.3em' , '#42A5F5') //'3.3em'
    
    //---country
    fnc.createText(this,16, cfg.height / 2 + 50, `Country:`,'3.6em','#fff')
    this.textCountry =  fnc.createText(this, 20, cfg.height / 2 + 90, country, '3.3em', '#FFD600') // '3.3em'
    
    //---capital
    fnc.createText(this, 16, cfg.height / 2 + 130, `Capital:`, '3.6em', '#fff')
    this.textCapital = fnc.createText(this, 20, cfg.height / 2 + 170, capital, '3.3em', '#FF8F00')// '3.3em'
    
    //---population
    fnc.createText(this, 16, cfg.height / 2 + 210, `Population:`,'3.6em', '#fff')
    this.textPopulation = fnc.createText(this, 202, cfg.height / 2 + 215, population, '3.3em', '#539350')
    
    //---code
    fnc.createText(this, 16, cfg.height / 2 + 260 , `Code:`,'3.6em', '#fff')
    this.textCode = fnc.createText(this, 124, cfg.height / 2 + 265, code, '3.3em', '#E53935') 
    

 
  }

  update() {
   
  }

}
