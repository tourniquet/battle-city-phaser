let gameState = {
  preload () {
    game.load.image('player', 'assets/images/player.png')
    game.load.image('enemy', 'assets/images/enemy.png')
  },
  create () {
    // set game background color
    game.stage.backgroundColor = '#000'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // create player, and set collie player with world margin
    this.player = game.add.sprite(10, 10, 'player')
    game.physics.enable(this.player)
    this.player.body.collideWorldBounds = true

    this.cursors = game.input.keyboard.createCursorKeys()
  },
  update () {
    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -150
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150
    }
  }
}

let game = new Phaser.Game(800, 400, Phaser.AUTO)
game.state.add('gameState', gameState)
game.state.start('gameState')
