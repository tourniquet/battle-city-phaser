/* globals game, Phaser */

let playState = {
  create () {
    // set game background color
    game.stage.backgroundColor = '#000'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // create player, and set collie player with world margin
    this.player = game.add.sprite(10, 10, 'player')
    game.physics.enable(this.player)
    this.player.body.collideWorldBounds = true
    // load audio when player shoot
    this.playerShoot = game.add.audio('shoot')

    this.cursors = game.input.keyboard.createCursorKeys()
    // shoot on spacebar
    this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.spaceBar.onDown.add(this.shoot, this)
  },
  update () {
    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
      this.player.frame = 3
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
      this.player.frame = 1
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -150
      this.player.frame = 0
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150
      this.player.frame = 2
    }
  },
  shoot () {
    this.playerShoot.play()
  }
}
