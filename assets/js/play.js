/* globals game, Phaser */

let playState = {
  create () {
    // set game background color
    game.stage.backgroundColor = '#000'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // create player, and set collide player with world margin
    this.player = game.add.sprite(10, 10, 'player')
    this.player.anchor.setTo(0.5, 0.5)
    game.physics.enable(this.player)
    this.player.body.collideWorldBounds = true
    // load audio when player shoot
    this.playerShoot = game.add.audio('shoot')

    // player tank angle
    this.tankAngle = 0

    // create a bulletExists variable to check if bullet is 'alive' at the moment
    this.bulletExists = false

    // create move buttons
    this.cursors = game.input.keyboard.createCursorKeys()

    // shoot on spacebar
    this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.spaceBar.onDown.add(this.shoot, this)
  },
  update () {
    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

    // change tank direction
    // also this change bullet angle in same direction with tank
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
      this.player.frame = 3
      this.tankAngle = 270
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
      this.player.frame = 1
      this.tankAngle = 90
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -150
      this.player.frame = 0
      this.tankAngle = 0
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150
      this.player.frame = 2
      this.tankAngle = 180
    }
  },
  // create bullet and set X and Y position
  createBullet () {
    // get player tank coordinates
    let axisX = this.player.x
    let axisY = this.player.y

    this.bullet = game.add.sprite(axisX, axisY, 'bullet')
    this.bullet.anchor.setTo(0.5, 0.5)
    game.physics.enable(this.bullet)
    this.bullet.body.collideWorldBounds = true
    this.bullet.angle = this.tankAngle

    this.bullet.body.onWorldBounds = new Phaser.Signal()
    this.bullet.body.onWorldBounds.add(this.killBullet, this)

    this.bulletExists = true

    if (this.tankAngle === 270) {
      this.bullet.body.velocity.x = -500
    } else if (this.tankAngle === 90) {
      this.bullet.body.velocity.x = 500
    } else if (this.tankAngle === 0) {
      this.bullet.body.velocity.y = -500
    } else if (this.tankAngle === 180) {
      this.bullet.body.velocity.y = 500
    }
  },
  killBullet () {
    this.bullet.kill()
    this.bulletExists = false
  },
  shoot () {
    if (!this.bulletExists) {
      // play sound when shoot
      this.playerShoot.play()
      // create bullet only when user shoot and there's no other bullet already
      this.createBullet()
    }
  }
}
