class UI extends Phaser.Scene {

    constructor() {
        super('UIScene');
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

        this.healthAmount = this.add.text(285,72,playerHealth, { font: '48px Arial', fill: '#ffffff' });
        this.healthAmount.setScale(0.6,0.6);

        this.energyAmount = this.add.text(80,45,playerEnergy, { font: '48px Arial', fill: '#ff0606' });
        this.energyAmount.setScale(0.6,0.6);


    }

    update() {
        this.healthAmount.setText(playerHealth);
        this.energyAmount.setText(playerEnergy)
    }
}