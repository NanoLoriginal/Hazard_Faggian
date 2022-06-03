class Ennemi {

    get s() {
        return this._ennemi;
    }

    constructor(scene) {
        this.scene = scene;
        this.cameras = scene;

        this._ennemi = this.scene.physics.add.sprite(1900,1900, 'vert');
        this._ennemi.setImmovable(true);
        this._ennemi.setScale(0.6,0.6);
        this._ennemi.body.setAllowGravity(false);




        this._ennemi.vivant=true;

        this._ennemi.setBounce(0.1);
        this._ennemi.setCollideWorldBounds(false);

        this.ennemiVelocityX = 100;
        this.ennemiVelocityX = 200;
        this.ennemiHealth = 100;
        this.ennemiDamages = 10;

        this.projectile = false;



    }

    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.s.x,this.scene.player.s.y,this._ennemi.x,this._ennemi.y)<800 && this._ennemi.vivant===true){
            this.fire()
        }
    }

    damagePlayer(player){
        playerHealth = playerHealth - this.ennemiDamages;
        console.log(playerHealth);
    }




    fire(){
        if(this.projectile===false){
            this.projectile = true
            this.scene.time.delayedCall(1150,()=>{
                this.boule = this.scene.physics.add.sprite(this._ennemi.x,this._ennemi.y, 'greenP').setSize(400,400).setDisplaySize(60,60);
                this.boule.body.setAllowGravity(false);
                this.scene.physics.moveTo(this.boule, this.scene.player.s.x, this.scene.player.s.y);
                this.boule.setVelocityX(this.boule.body.velocity.x * 8)
                this.boule.setVelocityY(this.boule.body.velocity.y * 8)
                console.log('check')
                const life = this.scene.time.delayedCall(4000, () => {
                    this.boule.destroy()
                    this.projectile = false
                    console.log('yolo')
                })

                this.scene.physics.add.collider(this.boule, this.scene.Collider, (boule) => {
                    boule.destroy()
                    life.destroy()
                    this.projectile = false
                }, null, this);

                this.scene.physics.add.collider(this.boule, this.scene.player.s, (boule) => {
                    playerHealth-=10
                    boule.destroy()
                    life.destroy()
                    //this.emitter.emit("greenP")
                    this.projectile = false
                }, null, this)

            })
        }
    }

}