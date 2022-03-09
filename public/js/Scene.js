import Snake from './Snake.js'

export default class Scene extends Phaser.Scene {
  constructor() {
    super();
  }

  create() {
    this.snake = new Snake(this)
  }

  update(time) {
    this.snake.update(time)
  }
}
