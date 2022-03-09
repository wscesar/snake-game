export default class Snake {
  constructor(scene) {
    this.body = []
    this.size = 20
    this.scene = scene
    this.lastMoveTime = 0
    this.moveInterval = 100
    this.direction = Phaser.Math.Vector2.RIGHT

    this.body.push(
      this.scene.add
        .rectangle(0, 0, this.size, this.size, 0xff0000)
        .setOrigin(0)
    )

    this.bait = this.scene.add
      .rectangle(0, 0, this.size, this.size, 0x00ff00)
      .setOrigin(0)

    this.newBaitPosition()

    scene.input.keyboard.on('keydown', event => {
      this.keydown(event)
    })
  }

  newBaitPosition() {
    const size = this.size
    const { random, floor } = Math
    const { width, height } = this.scene.game.config

    this.bait.x = floor(
      (random() * width) / size
    ) * size

    this.bait.y = floor(
      (random() * height) / size
    ) * size
  }

  keydown(event) {
    switch (event.keyCode) {
      case 37: this.direction = Phaser.Math.Vector2.LEFT
        break
      case 38: this.direction = Phaser.Math.Vector2.UP
        break
      case 39: this.direction = Phaser.Math.Vector2.RIGHT
        break
      case 40: this.direction = Phaser.Math.Vector2.DOWN
        break
    }
  }

  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time
      this.move()
    }
  }

  takeTheBait() {
    this.body.push(
      this.scene.add
        .rectangle(0, 0, this.size, this.size, 0x00ff00)
        .setOrigin(0)
    )
    this.newBaitPosition()
  }

  move() {
    let bait = this.bait
    let x = this.body[0].x + this.direction.x * this.size
    let y = this.body[0].y + this.direction.y * this.size

    if (bait.x === x && bait.y === y) {
      this.takeTheBait()
    }

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }

    this.body[0].x = x
    this.body[0].y = y
  }
}
