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
        .rectangle(0, 0, this.size, this.size, 0xffffff)
        .setOrigin(0),
      this.scene.add
        .rectangle(0, 0, this.size, this.size, 0xffffff)
        .setOrigin(0),
      this.scene.add
        .rectangle(0, 0, this.size, this.size, 0xffffff)
        .setOrigin(0),
      this.scene.add
        .rectangle(0, 0, this.size, this.size, 0xffffff)
        .setOrigin(0),
      this.scene.add
        .rectangle(0, 0, this.size, this.size, 0xffffff)
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
    const { LEFT, RIGHT, UP, DOWN } = Phaser.Math.Vector2
    switch (event.keyCode) {
      case 37:
        if (this.direction !== RIGHT)
          this.direction = LEFT
        break
      case 38:
        if (this.direction !== DOWN)
          this.direction = UP
        break
      case 39:
        if (this.direction !== LEFT)
          this.direction = RIGHT
        break
      case 40:
        if (this.direction !== UP)
          this.direction = DOWN
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
        .rectangle(0, 0, this.size, this.size, 0xffffff)
        .setOrigin(0)
    )
    this.newBaitPosition()
  }

  gameOver() {
    this.scene.scene.restart()
  }

  move() {
    let bait = this.bait
    let head = this.body[0]
    const { width, height } = this.scene.game.config
    let x = head.x + this.direction.x * this.size
    let y = head.y + this.direction.y * this.size

    if (bait.x === x && bait.y === y) {
      this.takeTheBait()
    }

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }

    head.x = x
    head.y = y

    if (
      head.x < 0
      || head.y < 0
      || head.x >= width
      || head.y >= height
    ) {
      this.gameOver()
    }

    if (
      this.body.slice(1).some(
        tail => tail.x === head.x && tail.y === head.y
      )
    ) {
      this.gameOver()
    }

  }
}
