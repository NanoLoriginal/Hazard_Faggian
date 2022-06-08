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
            gravity: { y: 700 },
            debug: false,
        },
    },
    scene: [
        new Menu(),
        new Tableau1(),
        new UI(),


    ],
};

const game = new Phaser.Game(config);
window.playerHealth = 100;
window.playerEnergy = 100;
