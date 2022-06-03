class Ennemi {

    get s() {
        return this._ennemi;
    }

    constructor(scene) {
        this.scene = scene;
        this.cameras = scene;

        this._ennemi = this.scene.physics.add.sprite(1900,1900, 'player');

        this._ennemi.setBounce(0.1);
        this._ennemi.setCollideWorldBounds(false);

        this.ennemiVelocityX = 100;
        this.ennemiVelocityX = 200;
        this.ennemiHealth = 100;
        this.ennemiDamages = 10;



    }

    damagePlayer(player){
        playerHealth = playerHealth - this.ennemiDamages;
        console.log(playerHealth);
    }
}