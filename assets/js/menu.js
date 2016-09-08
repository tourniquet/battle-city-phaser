/* globals game, Phaser */

let menuState = {
  create () {
    // display game name
    let gameName = game.add.text(
      game.world.centerX, 200, 'Battle City',
      { font: '50px Arial', fill: '#ffffff' }
    )
    gameName.anchor.setTo(0.5, 0.5)

    // explain how to start the game
    let startGame = game.add.text(
      game.world.centerX, 250, 'press enter to start',
      { font: '20px Arial', fill: '#ffffff' }
    )
    startGame.anchor.setTo(0.5, 0.5)

    // create Phaser keyboard hotkey
    let enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    // start game on press enter
    enterKey.onDown.addOnce(this.startGame, this)
  },
  startGame () {
    game.state.start('play')
  }
}
