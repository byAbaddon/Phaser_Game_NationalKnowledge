function createAudio(currentScene=null, soundName, volume = 1, loop = false, delay = 0, detune = 50, rate = 1, sek=0) {
  let musicConfig = { 
   volume,                  //default 1
   loop,                    //default false 
   delay,                   //default 0
   detune,                  //default 5
   rate,                    //default 1
   sek,                     //default 0  
   duration: 0
  }
 
let music = currentScene.sound.add(soundName, musicConfig)
 return music //.play()

}

export default createAudio

// 