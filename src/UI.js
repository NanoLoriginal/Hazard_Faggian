class UI extends Phaser.Scene {

    constructor() {
        super({key: 'UIScene', active: true});
    }

    preload() {
        this.load.image('health','assets/images/barre_de_vie.png');
        this.load.image('energie','assets/images/barre_energie.png');


    }

    create() {
        const healthBar = this.add.image(-50,-170,'health').setOrigin(0,0);
        healthBar.setScale(0.5,0.5);

        const energyBar = this.add.image(0,0,'energie').setOrigin(0,0);
        energyBar.setScale(0.3,0.3);

    }

    update() {

    }
}