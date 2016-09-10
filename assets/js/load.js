/* globals game */

let loadState = {
  preload () {
    game.load.spritesheet('player', 'assets/images/player.png', 50, 50)
    game.load.spritesheet('explosion', 'assets/images/explosion.png', 70, 70)
    game.load.image('bullet', 'assets/images/bullet.png')
    game.load.image('enemy', 'assets/images/enemy.png')
    // audio assets
    game.load.audio('shoot', ['assets/audio/shoot.mp3', 'assets/audio/shoot.ogg'])
  },
  create () {
    game.state.start('menu')
  }
}
