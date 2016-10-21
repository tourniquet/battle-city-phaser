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

    // create tilemap
    this.map = game.add.tilemap('level')
    // add tileset
    this.map.addTilesetImage('tiles')
    // create layer
    this.layer = this.map.createLayer('Tile Layer 1')

    this.bricks = game.add.group()
    this.map.createFromTiles(1, 2, 'brick', this.layer.index, this.bricks)
    game.physics.enable(this.bricks)
    this.bricks.setAll('body.immovable', true)

    // create enemy
    this.enemy = game.add.sprite(250, 250, 'enemy')
    game.physics.enable(this.enemy)
    this.enemy.anchor.setTo(0.5, 0.5)
    this.enemy.body.moves = false

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
    // collide player with enemy
    game.physics.arcade.collide(this.player, this.enemy)
    // collide enemy with walls
    game.physics.arcade.collide(this.player, this.bricks)
    // kill enemy on collide
    game.physics.arcade.collide(this.bullet, this.enemy, this.killEnemy, null, this)
    // destroy bricks on collide
    game.physics.arcade.collide(this.bullet, this.bricks, this.killBrick, null, this)

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
  createExplosion () {
    // create explosion animation
    this.explosion = game.add.sprite(this.bullet.x, this.bullet.y, 'explosion')
    this.explosion.anchor.setTo(0.5, 0.5)
    this.explosion.animations.add('explode', [0, 1, 2, 1, 0], 20, false)
    // http://phaser.io/docs/2.6.2/Phaser.Animation.html#play
    // play(animation, frameRate, loop, killOnComplete)
    this.explosion.animations.play('explode', 20, false, true)
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
  },
  killEnemy () {
    // play explosion when bullet hit enemy

    this.createExplosion()
    // destroy enemy object
    this.enemy.kill()
    // destroy bullet
    this.killBullet()
  },
  killBrick (bullet, brick) {
    this.createExplosion()
    // destroy bullet
    this.killBullet()
    // destroy brick
    brick.kill()
  }
  // ,
  // render () {
  //   game.debug.spriteInfo(this.player, 250, 500)
  // }
}
