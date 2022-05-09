class Player {

    get s() {
        return this._player;
    }


    constructor(scene) {

        this.scene=scene
        this.cameras=scene

        this._player = this.scene.physics.add.sprite(50, 100, 'player');

        this._player.setBounce(0.1);
        this._player.setCollideWorldBounds(false);

        this.playerVelocityX = 300
        this.playerVelocityY = 420

        this.ActualForm = 0;

        this.scene.input.on('pointerdown', (pointer)=> {
                new Projectile(this.scene,pointer.worldX,pointer.worldY);
        });


        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'robo_player_0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 'robo_player_1'}],
            frameRate: 10,
            repeat:-1,

        });
    }

    jump(){
        this._player.setVelocityY(-this.playerVelocityY);
        this._player.play('jump', true);
    }
    moveRight(){
        this._player.setVelocityX(this.playerVelocityX);
        this._player.setFlipX(false);
        if (this._player.body.onFloor()) {
            this._player.play('walk', true)}
    }
    moveLeft(){
        this._player.setVelocityX(-this.playerVelocityX);
        if (this._player.body.onFloor()) {
            this._player.play('walk', true)}
        this._player.setFlipX(true);
    }
    moveDown(){
        this._player.setVelocityY(this.playerVelocityY)
        this._player.play('jump', true);
    }

    stop(){
        this._player.setVelocityX(0);
        if (this._player.body.onFloor()) {
            this._player.play('idle',true)
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
            this.playerVelocityX = 420;



            this.allVentSprite.forEach(sprite=>{
                sprite.body.enable=false
                //sprite.
                //sprite.body.disableBody(true,true)
            })

            this.ActualForm = 1;
        }
        else{
            this._player.body.setAllowGravity(true);
            this.playerVelocityX = 300;
            this.allVentSprite.forEach(sprite=>{
                sprite.body.enable=true
                //sprite.body.enableBody()
            })
            this.ActualForm = 0;
        }
    }
}