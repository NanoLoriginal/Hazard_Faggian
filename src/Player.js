class Player {

    get s() {
        return this._player;
    }


    constructor(scene) {

        this.scene=scene
        this.cameras=scene

        this._player = this.scene.physics.add.sprite(1700, 1900, 'idle');

        this._player.setBounce(0.1);
        this._player.setCollideWorldBounds(false);

        this.playerVelocityX = 600
        this.playerVelocityY = 640

        this.ActualForm = 0;

        playerHealth = 100;
        this.playerDamages = 20;
        this.recovery = false;




        this.scene.input.on('pointerdown', (pointer)=> {
                new Projectile(this.scene,pointer.worldX,pointer.worldY);
        });


        this._player.setBodySize(150,250);

    }

    damageEnnemi(ennemi){
        ennemi.ennemiHealth = ennemi.ennemiHealth - this.playerDamages;
        console.log(ennemi.ennemiHealth);

        if (ennemi.ennemiHealth <=0){
            ennemi.s.destroy()
            ennemi.s.vivant = false
        }


    }

    swordAttack(){


        this.scene.swordHitBox.x = this._player.flipX
            ? this._player.x - this._player.width * 0.75
            : this._player.x + this._player.width * 0.75
        this.scene.swordHitBox.y = this._player.y;




        this.scene.physics.world.add(this.scene.swordHitBox.body)
        this.scene.swordHitBox.setVisible(true)

        this.scene.time.delayedCall(500,()=>{
            this.scene.physics.world.remove(this.scene.swordHitBox.body)
            this.scene.swordHitBox.setVisible(false)
        })

    }

    jump(){
        this._player.setVelocityY(-this.playerVelocityY);
        this._player.play('idleAnim', true);
    }

    moveRight(){
        this._player.setVelocityX(this.playerVelocityX);
        this._player.setFlipX(false);
        if (this._player.body.onFloor()) {
            this._player.play('running', true)}
    }
    moveLeft(){
        this._player.setVelocityX(-this.playerVelocityX);
        if (this._player.body.onFloor()) {
            this._player.play('running', true)}
        this._player.setFlipX(true);
    }
    moveDown(){
        this._player.setVelocityY(this.playerVelocityY)
        this._player.play('idleAnim', true);
    }

    stop(){
        this._player.setVelocityX(0);
        if (this._player.body.onFloor()) {
            this._player.play('idleAnim',true)
        }
    }

    /**
     * Renvoie tous les ventSprite
     * @return {Phaser.Physics.Arcade.sprite[]}
     */
    get allVentSprite(){
        return this.scene.ventilations.getChildren().filter(toto=>toto.name==="ventSprite")
    }

    fire(){
        if (game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = game.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(sprite.x - 8, sprite.y - 8);

            game.physics.arcade.moveToPointer(bullet, 300);
        }
    }



    changeForm(){
        if (this.ActualForm === 0){
            this._player.setVelocity(0,0)
            this._player.body.setAllowGravity(false);
            this.playerVelocityX = 680;



            this.allVentSprite.forEach(sprite=>{
                sprite.body.enable=false
                //sprite.
                //sprite.body.disableBody(true,true)
            })

            this.ActualForm = 1;
        }
        else{
            this._player.body.setAllowGravity(true);
            this.playerVelocityX = 600;
            this.allVentSprite.forEach(sprite=>{
                sprite.body.enable=true
                //sprite.body.enableBody()
            })
            this.ActualForm = 0;
        }
    }
}