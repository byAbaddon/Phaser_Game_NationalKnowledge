import { Scene} from 'phaser'
import { cfg} from '../game.js'
import * as fnc from '../game.js';

export class GameScenePro extends Scene {
  constructor() {
    super('GameScenePro');
    this.counterFlagsGame = 0
    this.correctCountPoints = 0
    this.incorrectCountPoints = 0
    this.counterAnimation = 0
    this.toFindCountry = ''
    this.toFindCapital = ''
    this.toFindCode = ''
    this.toFindContinent = ''
    this.toFindPopulation = ''
    this.isWarnText = false
  }

  init() {
    console.log('Welcome to GameScenePro Play...');
    this.correctCountPoints = 0
    this.incorrectCountPoints = 0
  }

  preload() {
    //------------------------------LOAD HTML elements
    this.load.html('sectionsHTML', '/assets/html/sections.html');
       
    //----------------LOAD JSON data
    this.load.json('data', '/assets/images/flags/country.json')

    //------------------------------load audio
    // this.load.audio('menuMusic', '/assets/sounds/bgMusic/menuMusic.mp3')
    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('correctAnswerSound', '/assets/sounds/effects/answers/correctAnswer.wav')
    this.load.audio('incorrectAnswerSound', '../assets/sounds/effects/answers/incorrectAnswer.wav')

    //-----------------------------load IMAGES
    //---like
    this.load.image('like', '/assets/images/likes/1.png')

    //----------------------- buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    //---btnStart
    this.load.image('btnStart', '/assets/images/buttons/btnStart.png')
    this.load.image('btnYes', '/assets/images/buttons/btnYes.png')
    this.load.image('btnNo', '/assets/images/buttons/btnNo.png')    
  }

  create() {
    // create Arrays form data
    this.array = this.cache.json.get('data')
      .filter(x => x.continent && x.country && x.capital && x.code && x.population && x.flag_4x3)
    this.allFlagsLength = this.array.length - 1
    //console.log(this.allFlagsLength, this.array);
    this.flagsArrayAll = this.array.map(x => x.flag_4x3)
    this.continentArrayAll = this.array.map(x => x.continent ? x.continent : null).filter(x => x != null).sort()
    this.continentArrayAll.push(['zero'], ['zero'], )

    this.countryArrayAll = this.array.map(x => x.country ? x.country : null).filter(x => x != null).sort()
    this.capitalArrayAll = this.array.map(x => x.capital ? x.capital : null).filter(x => x != null).sort()
    this.codeArrayAll = this.array.map(x => x.code ? x.code : null).filter(x => x != null).sort()
    // console.log(flagsArrayAll, '\n', continentArrayAll, '\n', countryArrayAll, '\n', capitalArrayAll, '\n', codeArrayAll);


    // Load the images dynamically
    // let flagsArrayAll = this.array
    //   .filter(x => x.flag_4x3)
    //   .map(x => {
    //     let flagName = x.flag_4x3.split('/')[2].slice(0, -4)
    //     this.load.svg(flagName, `/assets/images/flags${x.flag_4x3}`, { width: 400, height: 400 })
    //     return flagName;
    //   })

    //   // Index of the currently displayed image
    //   var currentImageIndex = 0

    //   // Callback function once all images are loaded
    //   this.load.on('complete', () => {
    //   // Create an array to store the loaded images
    //   let images = flagsArrayAll.map(flag => this.add.image(20, 100, flag).setOrigin(0, 0).setVisible(false));

    //   // Assume you have an array of images called 'images' containing Phaser.Image objects
    //   // Register touch events on the game scene
    //   this.input.on('pointerdown', handlePointerDown)
    //   this.input.on('pointerup', handlePointerUp)

    //   // Variables to track touch input
    //   let startX = 0
    //   let startY = 0

    //   function handlePointerDown(pointer) {
    //     startX = pointer.x
    //     startY = pointer.y
    //   }

    //   function handlePointerUp(pointer) {
    //     const deltaX = pointer.x - startX
    //     const deltaY = pointer.y - startY
    
    //     // Check if swipe is horizontal and long enough
    //     if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    //       // Swipe left
    //       if (deltaX < 0) {
    //         currentImageIndex = showNextImage()
    //       }
    //       // Swipe right
    //       else {
    //         currentImageIndex = showPreviousImage()
    //       }
    //     }
    //   }
 
    //  function showNextImage() {
    //     currentImageIndex = (currentImageIndex + 1) % images.length
    //    displayCurrentImage()
    //    return currentImageIndex
    //   }

    //   function showPreviousImage() {
    //     currentImageIndex = (currentImageIndex - 1 + images.length) % images.length
    //     displayCurrentImage()
    //     return currentImageIndex
    //   }
 
  
    //   function displayCurrentImage() {
    //     // Hide all images
    //     images.forEach(image => {
    //       image.visible = false
    //     })

    //     // Show the current image
    //     images[currentImageIndex].visible = true
    //   }
    //  // Initial display of the first image
    //  displayCurrentImage()
    // })



    //-------------------------------end scroll phone



    //----------------audio
    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundCorrectAnswer = () => fnc.createAudio(this, 'correctAnswerSound',).play()
    this.soundIncorrectAnswer = () => fnc.createAudio(this, 'incorrectAnswerSound', 0.5).play()

    //----------------TEXT
    fnc.createText(this, cfg.width / 2 - 100, 30, 'PLAY PRO', 46, 'white')
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    //---correctAnswer
    let correct = fnc.createText(this, 30, 100, `Correct: ${this.correctCountPoints}`, 30, 'green')
    //---incorrectAnswer
    let incorrect = fnc.createText(this, 240, 100, `Incorrect: ${this.incorrectCountPoints}`, 30, 'brown')
    //frame
    const frame = this.add.graphics().lineStyle(3, 0xffffff).strokeRect(19, 150, 402, 301)

    
    //----------------all images form directory
    this.flagsArrayPro = this.cache.json.get('data')
    //-----generate random data 
    this.randomData = Phaser.Math.Between(0, this.allFlagsLength)
    const { country, capital, code, continent, population, flag_4x3 } = this.flagsArrayPro[this.randomData]
    
    //file data to values....
    this.toFindContinent = continent
    this.toFindCountry = country
    this.toFindCapital = capital
    this.toFindPopulation = population
    this.toFindCode = code

   // console.log(this.toFindCode);
    this.load.svg(code, `/assets/images/flags${flag_4x3}`, { width: 400, height: 400 })
    this.load.on('complete', () => {
    this.currentFlag = this.add.image(20, 100, code).setOrigin(0, 0)
        .setVisible(false)
    }).start()


    //----like
    this.like = this.add.image(140, cfg.height - 86, 'like').setScale(0.4)
    this.like.setVisible(false)
    //------------------------------ buttons
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)
    //---btnStart
    this.btnStart = this.add.image(220, cfg.height - 86, 'btnStart', 0).setScale(0.5)


    //---btnYes
    this.btnYes = this.add.image(140, cfg.height - 86, 'btnYes', 0).setScale(0.5)
    this.btnYes.setVisible(false)
    //---btnNo
    this.btnNo = this.add.image(cfg.width - 150, cfg.height - 86, 'btnNo', 1).setScale(0.55)
    this.btnNo.setVisible(false)

   
    //---------------------------add interactive btn options
    Array.from([this.btnExit, this.btnStart, this.btnYes, this.btnNo,]).forEach((btn, index) => {
      btn.setInteractive({ cursor: 'pointer', index })
        .on('pointerover', () => btn.setTint(0xe0e0e0))
        .on('pointerout', () => btn.setTint(0xffffff))
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) {
            const currentScene = this.scene.scene
            this.scene.stop(currentScene)
            this.scene.start('MenuScene')
          }
          if (index == 1) { //btn Start
            frameRect.setVisible(false)
            textContainer.setVisible(false)
            this.btnStart.setVisible(false)
            this.btnYes.setVisible(true)
            this.btnNo.setVisible(true)
            this.like.setVisible(true)
            this.currentFlag.setVisible(true)
            this.addHTMLtoNode()
          }

          if (index == 2) { //btn Yes   Correct Answer
            if (true) {
               //---GET Html element data   
              const [htmlContinent, htmlCountry, htmlCapital, htmlCode] =
                Array.from(document.getElementsByClassName('wrap')[0].children)
                  .map(x => x.querySelector('span').textContent)

              const htmlHiddenDivPopulation =  document.getElementsByClassName('hide-population')[0]
              // console.log(htmlContinent, htmlCountry, htmlCapital, htmlCode);
              console.log(this.toFindContinent ,  this.toFindCountry, this.toFindCapital ,this.toFindCode );
              //---------check is math data correct
              if (this.toFindContinent == htmlContinent &&
                this.toFindCountry == htmlCountry &&
                this.toFindCapital == htmlCapital &&
                this.toFindCode == htmlCode) {  //all data match  Correct Answer
                // show population
                htmlHiddenDivPopulation.style.display = 'none'
                
                //add points and play sound
                correct.setText(`Correct: ${++this.correctCountPoints}`)
                this.soundCorrectAnswer()

                //---- generate new data
                this.randomData = Phaser.Math.Between(0, this.allFlagsLength)
                const { country, capital, code, continent, population, flag_4x3 } = this.flagsArrayPro[this.randomData]
                
                //file data to values....
                this.toFindContinent = continent
                this.toFindCountry = country
                this.toFindCapital = capital
                this.toFindPopulation = population
                this.toFindCode = code

                this.btnYes.setVisible(false);
                //start animation
                setTimeout(() => {
                    //add new flag image
                this.load.svg(code, `/assets/images/flags${flag_4x3}`, { width: 400, height: 400 })
                this.load.once('complete', () => this.currentFlag.setTexture(code).setVisible(true)).start()
                  this.clearHTMLFields()
                  this.btnYes.setVisible(true);
                }, 3000);
                
           
              }
              else { //incorrect or not fill all fields
                if (this.checkIsHtmlAnimationActive() && !this.isWarnText) {
                  this.warnText = fnc.createText(this, 74, cfg.height - 36, 'You must fill all fields!', '30px', 'red')  
                  this.isWarnText = true
                  setTimeout(() => {
                    this.warnText.text = ''
                    this.isWarnText = false
                  }, 1000);
                } else if(!this.isWarnText) {
                    this.soundIncorrectAnswer()
                    incorrect.setText(`Incorrect: ${++this.incorrectCountPoints}`)
                    if (this.incorrectCountPoints >= 10) {
                      this.scene.start('GameOverScene')
                      }
                    } 
                }
              }
          }

          if (index == 3) { 
            this.clearHTMLFields()
          }
         
              
          //---------play sound btn click
          if (index == 0) this.soundBtnExitClick()
          else this.soundBtnClick()
        })
    })


    //------------------------add text

    //---continent
    fnc.createText(this, 16, cfg.height / 2, `Continent:`, '3.6em', '#fff')
    this.textContinent = fnc.createText(this, 200, cfg.height / 2 + 5, continent, '3.3em', '#42A5F5')

    //---country
    fnc.createText(this, 16, cfg.height / 2 + 50, `Country:`, '3.6em', '#fff')
    this.textCountry = fnc.createText(this, 20, cfg.height / 2 + 90, country, '3.3em', '#FFD600')

    //---capital
    fnc.createText(this, 16, cfg.height / 2 + 130, `Capital:`, '3.6em', '#fff')
    this.textCapital = fnc.createText(this, 20, cfg.height / 2 + 170, capital, '3.3em', '#FF8F00')

    //---population
    fnc.createText(this, 16, cfg.height / 2 + 210, `Population:`, '3.6em', '#fff')
    this.textPopulation = fnc.createText(this, 210, cfg.height / 2 + 215, population, '3.3em', '#539350')

    //---code
    fnc.createText(this, 16, cfg.height / 2 + 260, `Code:`, '3.6em', '#fff')
    this.textCode = fnc.createText(this, 124, cfg.height / 2 + 265, code, '3.3em', '#E53935')

    //---------------frame rect hide playground field
    const frameRect = this.add.rectangle(10, 140, 440, 660, 0x000a32).setOrigin(0, 0)
    //-----------Container

    const labelOne = fnc.createText(this, 15, 240, 'Choose correctly: continent,\n country, capital and code\n according to the flag.', '3em')
    const labelTwo = fnc.createText(this, 10, 420, 'Confirm with the green button.', '2.8em', 'green')
    const labelTwoInfo = fnc.createText(this, 10, 460, '(get ten correct answers to unlock\n PlayPro)', '2.4em', 'green')
    const labelOr = fnc.createText(this, 190, 540, 'or', '3em', 'yellow')
    const labelThree = fnc.createText(this, 15, 600, 'Reject with the red button.', '3em', 'red')
    const labelThreeInfo = fnc.createText(this, 15, 640, '(if you get more ten wrong answer\n Game Over)', '2.4em', 'red')
    let textContainer = this.add.container(10)
    textContainer.add([labelOne, labelTwo, labelTwoInfo, labelOr, labelThree, labelThreeInfo])



    //--------GET HTML and ADD element to Scene   
   


  }

update() {}
//========================Custom Functions==============================
  
//----------------Load and add HTML elements to Node
  addHTMLtoNode() {
    //---parent element
    let element = this.add.dom(100, cfg.height / 2 + 110).createFromCache('sectionsHTML').setOrigin(0, 0)
    //element.setPosition(cfg.width / 2, 300);


    //---GET children form parent element   
    const [htmlContinent, htmlCountry, htmlCapital, htmlCode] = document.getElementsByClassName('wrap')[0].children
  

    //----------------ADD options data to  select elements
    //---continents    
    const continentsData = [...new Set(this.continentArrayAll)].sort() //["Option 1", "Option 2", "Option 3"];
    this.fillOptionsData(htmlContinent, continentsData)
    //---countries
    this.fillOptionsData(htmlCountry, this.countryArrayAll)
    //---capitals
    this.fillOptionsData(htmlCapital, this.capitalArrayAll)
    //---codes
    this.fillOptionsData(htmlCode, this.codeArrayAll)



    const select = document.getElementsByClassName("select")
    const optionsList = document.getElementsByClassName("options-list")
    const span = document.getElementsByTagName("span")
   
    // Add new target select  and  change icon to up;
    Array.from(select).forEach(el => {
      el.addEventListener('click', event => {
        event.preventDefault()
        event.currentTarget.parentNode.children[1].classList.toggle("active")
        // event.currentTarget.children[1].style = 'transform: rotate(180deg); color: tomato'
         
        let t = 0
        let r = 0
        let currentClass = event.currentTarget.parentNode.className.split(' ')[1]
        
        switch (event.currentTarget.parentNode.className.split(' ')[1]) {
          case 'continent': t = -0 , r = 213 ; break
          case 'country': t = -90 , r = 33 ; break
          case 'capital': t = -173 , r = 33 ; break
          case 'code': t = -259 , r = 137 ; break
        }
        //block position
        event.currentTarget.parentNode.children[1].style = `top: ${t}px;  right: ${r}px ; z-index: 2;  position: absolute `
        //stop i animation   animation-iteration-count:1
        event.currentTarget.parentNode.children[0].children[1].style.setProperty('animation-iteration-count', '1')

      })
    })

    //---select option
    Array.from(optionsList).forEach(div => {
      div.addEventListener("click", option => {  
        option.preventDefault()
      //---remove class selected form all options 
      Array.from(option.target.parentNode.children).forEach(el => el.classList.remove('selected'))
      //--- add new choice to spanElement
        try {
          let spanText = option.target.textContent.length < 50 ?  option.target.textContent : null 
          let size = 2
          spanText.length > 26 ? size = 1.2 : 2
          spanText == 'South America' ? size = 1.9 : 2
        
          option.target.parentNode.parentNode.children[0].children[0].textContent = spanText
          option.target.parentNode.previousElementSibling.children[0].style = `font-size : ${size}em`
       
        // option.target.parentNode.previousElementSibling.children[0].textContent = spanText 
         
          //---add class selected to new choice  
            option.target.classList.add("selected")
          //--- add class active
          option.target.parentNode.classList.toggle("active");
        } catch (error) {}
      })
    })
  }    

// ---------------------------------Add options to the select element
fillOptionsData(selectElement, data) {
    data.forEach(optionText => {
      const optionElement = document.createElement("div")
      optionElement.classList.add('option');
      optionElement.textContent = optionText;   
      selectElement.children[1].appendChild(optionElement);
    })
} 

//---------------------------------Clear html fields  
clearHTMLFields() {
  //clear html fields 
  const [htmlContinent, htmlCountry, htmlCapital, htmlCode] = [...document.getElementsByTagName('span')]
  htmlContinent.textContent = 'Select C-ent'
  htmlCountry.textContent = 'Select Country'
  htmlCapital.textContent = 'Select Capital'
  htmlCode.textContent = 'Select Code'

  // hidePopulation
  document.getElementsByClassName("hide-population")[0].style.display = 'block'
  // activate animations
  Array.from(document.getElementsByTagName('i'))
    .map(children => children.style.setProperty('animation-iteration-count', 'infinite'))
}
  
checkIsHtmlAnimationActive() {
  return  Array.from(document.getElementsByTagName('i'))
    .map(children => children.style.getPropertyValue('animation-iteration-count'))
    .some(x => x != 1)  
 } 

}