/* globals game, Phaser */

let game = new Phaser.Game(800, 400, Phaser.AUTO)

game.state.add('boot', bootState)
game.state.add('load', loadState)
game.state.add('menu', menuState)
game.state.add('play', playState)

game.state.start('boot')
