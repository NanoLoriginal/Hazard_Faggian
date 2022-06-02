const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1600,
    heigth: 1024,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
        },
    },
    scene: new Tableau1(),
};

const game = new Phaser.Game(config);