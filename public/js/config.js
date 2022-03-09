import Scene from './Scene.js'

const config = {
  width: 600,
  height: 600,
  type: Phaser.AUTO,
  parent: 'canvas',
  scene: [Scene]
}

new Phaser.Game(config);
