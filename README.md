# Phaser_Game_NationalKnowledge
Create game with Phaser @3.60.0 "Miku"

### A project using:
+ Phaser 3
+ JS
+ Simple - HTML / CSS
+ webpack
+ bable
+ cordova
+ android stuido
+ +

# Game - NationalKnowledge
- Educational game about: flags, continents, capitals, and code of different countries of the planet.

## Playing the game
You control the main character Frog.
Your goal is to cross the carriageway with cars and the sea using the logs.
You have to watch out for cars and enemies that will prevent you from reaching the goal.
You will get points depending on time and bounces.

## Short video intro:
https://youtu.be/30PFMCjRTx0

## Screenshots:
![1](https://github.com/byAbaddon/Phaser_Game_NationalKnowledge/assets/51271834/c3b3057d-5d76-4f16-9a74-0ad2b49e26fd)
![2](https://github.com/byAbaddon/Phaser_Game_NationalKnowledge/assets/51271834/4c713f8a-0e52-4543-92b0-777e32adea35)
![3](https://github.com/byAbaddon/Phaser_Game_NationalKnowledge/assets/51271834/2d57d213-0e1a-44fd-ad6f-6a886d77954f)
![4](https://github.com/byAbaddon/Phaser_Game_NationalKnowledge/assets/51271834/214a36bc-05d4-4fdb-ad57-893865c2d3d8)
![5](https://github.com/byAbaddon/Phaser_Game_NationalKnowledge/assets/51271834/c9dc40e5-960a-41e9-a4a6-d8be32f60350)
![6](https://github.com/byAbaddon/Phaser_Game_NationalKnowledge/assets/51271834/4c541fec-bf0f-47c7-837c-f09c104d3295)

### Download
#### Created with Phaser 3 and converted for android mobile app.

```diff
- This.
```

### Prerequisites
- [Phaser 3](https://phaser.io)
#### Year:
2023

### Developer
By Abaddon

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
