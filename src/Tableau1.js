class Tableau1 extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');//image de fond
        this.load.image('spike', 'assets/images/spike.png');//on charge l'image de l'objet piques
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');//on charge le joueur
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');//on charge le tileset qui contient les éléments utilisés dans tiled

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
    }


    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('tileset_base', 'tiles');
        this.platforms = map.createLayer('Platforms', tileset);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.changeFormKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)


        this.player = new Player(this)

        this.cameras.main.startFollow(this.player.s,true);

        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        })

        this.Collider = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        })
        /**
         *
         * @type {Phaser.Physics.Arcade.Group}
         */
        this.ventilations = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        })



        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.add.rectangle(spike.x + spike.width*0.5, spike.y + spike.height*0.5, spike.width, spike.height)
            this.spikes.add(spikeSprite);
        });

        map.getObjectLayer('Collider').objects.forEach((obj) =>{
            const collider = this.add.rectangle(obj.x + obj.width*0.5, obj.y + obj.height*0.5, obj.width, obj.height)
            this.Collider.add(collider);
        })
        map.getObjectLayer('Ventilations').objects.forEach((vent)=>{
            this.ventSprite = this.add.rectangle(vent.x+vent.width*0.5,vent.y+vent.height*0.5, vent.width, vent.height)
            this.ventilations.add(this.ventSprite);
            this.ventSprite.name="ventSprite";
        })

        console.log("test ici",this.ventilations.getChildren().filter(toto=>toto.name==="ventSprite"))


        this.physics.add.collider(this.player.s, this.spikes, this.playerHit,null, this);
        this.physics.add.collider(this.player.s, this.Collider);
        this.physics.add.collider(this.player.s, this.ventilations);
    }

    playerHit(player, spike) {
        player.setVelocity(0, 0);
        player.setX(50);
        player.setY(100);
        player.play('idle', true);
        player.setAlpha(0);
        let tw = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'linear',
            repeat: 5,
        });
    }




    update() {

        if(this.player.ActualForm==0){
            if (this.cursors.left.isDown)
            {
                this.player.moveLeft();
            }
            else if (this.cursors.right.isDown)
            {
                this.player.moveRight();
            }
            else
            {
                this.player.stop();
            }

            if (this.cursors.up.isDown && this.player.s.body.onFloor())
            {
                this.player.jump();
            }

            if (Phaser.Input.Keyboard.JustDown(this.changeFormKey)){
                console.log("changement de forme")
                this.player.changeForm()
            }
        }
        else{
            if (this.cursors.left.isDown)
            {
                this.player.moveLeft();
            }
            else if (this.cursors.right.isDown)
            {
                this.player.moveRight();
            }
            else
            {
                this.player.stop();
            }

            if (this.cursors.up.isDown)
            {
                this.player.jump();
            }
            else if(this.cursors.down.isDown){
                this.player.moveDown();
            }
            else{
                this.player.s.setVelocityY(0);
            }

            if (Phaser.Input.Keyboard.JustDown(this.changeFormKey)){
                console.log("changement de forme")
                this.player.changeForm()
            }
        }




        /**
        if (this.player.ActualForm == 0){

            switch (true) {

                case Phaser.Input.Keyboard.JustDown(this.changeFormKey):
                    this.player.ChangeForm();
                    break;

                case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.s.body.onFloor():
                    this.player.jump()
                    console.log("oui")
                    break;

                case this.cursors.left.isDown:
                    this.player.moveLeft()
                    break;
                case this.cursors.right.isDown:
                    this.player.moveRight();
                    break;
                default:
                    this.player.stop();
            }
        }

        else{

            switch (){
                case Phaser.Input.Keyboard.JustDown(this.changeFormKey):
                    this.player.ChangeForm();
                    break;

                case (this.cursors.space.isDown || this.cursors.up.isDown) :
                    this.player.jump()
                    break;

                case (this.cursors.down.isDown):
                    this.player.moveDown()
                    break;

                case this.cursors.left.isDown:
                    this.player.moveLeft()
                    break;

                case this.cursors.right.isDown:
                    this.player.moveRight();
                    break;

                default:
                    this.player.s.setVelocity(0);
            }
        }
        **/
    }
}

