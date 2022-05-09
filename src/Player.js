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
        this.ActualForm = 0;



        //this.scene.physics.add.collider(this._player, this.scene.platforms);


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
        this._player.setVelocityY(-420);
        this._player.play('jump', true);
    }
    moveRight(){
        this._player.setVelocityX(300);
        this._player.setFlipX(false);
        if (this._player.body.onFloor()) {
            this._player.play('walk', true)}
    }
    moveLeft(){
        this._player.setVelocityX(-300);
        if (this._player.body.onFloor()) {
            this._player.play('walk', true)}
        this._player.setFlipX(true);
    }
    moveDown(){
        this._player.setVelocityY(420)
        this._player.play('jump', true);
    }

    stop(){
        this._player.setVelocityX(0);
        if (this._player.body.onFloor()) {
            this._player.play('idle',true)
        }
    }
    storeObj(player, ventilation){
        this.obj= ventilation
    }

    ChangeForm(){
        if (this.ActualForm == 0){
            this.ActualForm = 1;
        }
        else{
            this.ActualForm = 0;

        }
    }
}