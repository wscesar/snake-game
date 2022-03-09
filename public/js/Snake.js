export default class Snake {
  constructor(scene) {
    this.body = []
    this.scene = scene
    this.direction = Phaser.Math.Vector2.RIGHT
    
    this.body.push(
      this.scene.add.rectangle(0, 0, 20, 20, 0xff0000).setOrigin(0)
    )

    this.body.push(
      this.scene.add.rectangle(0, 0, 20, 20, 0x00ff00).setOrigin(0)
    )

    scene.input.keyboard.on('keydown', event => {
      this.keydown(event)
    })
  }

  keydown(event){
    switch(event.keyCode){
      case 37: // left
        this.direction = Phaser.Math.Vector2.LEFT
        break
      case 38: // up
        this.direction = Phaser.Math.Vector2.UP
        break
      case 39: // right
        this.direction = Phaser.Math.Vector2.RIGHT
        break
      case 40: // down
        this.direction = Phaser.Math.Vector2.DOWN
        break
    }
  }

  update(time) {
    this.body[0].x += this.direction.x
    this.body[0].y += this.direction.y
  }
}
