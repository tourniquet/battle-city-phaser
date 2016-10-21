/* globals game, Phaser */

let loadState = {
  preload () {
    game.load.spritesheet('player', 'assets/images/player.png', 50, 50)
    game.load.spritesheet('explosion', 'assets/images/explosion.png', 70, 70)
    game.load.image('brick', 'assets/images/brick.png')
    game.load.image('bullet', 'assets/images/bullet.png')
    game.load.image('enemy', 'assets/images/enemy.png')

    // load level design
    game.load.image('tiles', 'assets/images/tiles.png')
    game.load.tilemap('level', 'assets/maps/level.json', null, Phaser.Tilemap.TILED_JSON)

    // audio assets
    game.load.audio('shoot', ['assets/audio/shoot.mp3', 'assets/audio/shoot.ogg'])
  },
  create () {
    game.state.start('menu')
  }
}
