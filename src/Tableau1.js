class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('background', 'assets/images/background.png');//image de fond
        //this.load.image('spike', 'assets/images/spike.png');//on charge l'image de l'objet piques
        this.load.image('feu', 'assets/images/feu.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');//on charge le joueur
        //this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');//on charge le tileset qui contient les éléments utilisés dans tiled
        this.load.image('tiles', 'assets/tilesets/tileset1_test.png');//on charge le tileset qui contient les éléments utilisés dans tiled

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Map1_test.json');
    }


    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);

        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('tileset_base', 'tiles');
        this.platforms = map.createLayer('sol', tileset);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.changeFormKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.player = new Player(this);
        this.ennemi1 = new Ennemi(this);

        this.cameras.main.startFollow(this.player.s,true);

        this.projectiles = this.physics.add.group({
            allowGravity : false,
        })


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


        this.physics.add.collider(this.player.s, this.spikes, this.playerHitSpike,null, this);
        this.physics.add.collider(this.player.s, this.Collider);
        this.physics.add.collider(this.player.s, this.ventilations);

        this.physics.add.collider(this.player.s, this.ennemi1.s,this.playerHitEnnemi, null, this);


        this.physics.add.collider(this.ennemi1.s, this.Collider);
        this.physics.add.collider(this.ennemi1.s, this.ventilations);



        this.swordHitBox = this.add.rectangle(0,0,32,64,0xffffff,0);
        this.physics.add.existing(this.swordHitBox);
        console.log(this.swordHitBox.body);
        this.swordHitBox.body.setAllowGravity(false);

        this.swordHitBox.body.enable = false
        this.physics.world.remove(this.swordHitBox.body);

        this.ennemyBox = this.add.rectangle(480,600,64,64,0xffffff,0.5);
        this.physics.add.existing(this.ennemyBox);
        console.log(this.ennemyBox.body);
        this.ennemyBox.body.setAllowGravity(false)

        this.physics.add.overlap(this.swordHitBox, this.ennemi1.s, this.handleCollide, undefined, this);
        this.physics.add.collider(this.projectiles, this.ennemi1.s)

        this.resetBump = 0;
    }

    handleCollide(object1, object2){
        console.log("touché")
        this.player.damageEnnemi(this.ennemi1)
        this.swordHitBox.body.enable = false
        this.physics.world.remove(this.swordHitBox.body);
    }

    playerHitSpike(player, spike) {

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

    playerHitEnnemi(player, ennemi) {
        this.resetBump = 1
        ennemi = this.ennemi1
        console.log(this.player.playerHealth)

        if (this.player.recovery === false){

            if (this.player.s.x< this.ennemi1.s.x){
                player.setVelocity(-300,-300)
            }
            else{
                player.setVelocity(300,-300)
            }



            this.player.playerHealth = this.player.playerHealth - this.ennemi1.ennemiDamages;
            player.setAlpha(0);



            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'linear',
                repeat: 5,
            })
            this.player.recovery = true;

        }

        if (this.player.recovery === true){
            this.playerReset = this.time.addEvent({
                delay: 800,
                callback: ()=>{

                    this.player.recovery=false;
                    this.resetBump = 0;
                },
                loop: false,
            })
        }

        console.log(this.player.playerHealth)
        if (this.player.playerHealth<0){
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

    }




    update() {
        if(this.player.ActualForm==0){
            if (this.cursors.left.isDown)
            {
                if (this.resetBump === 0){
                    this.player.moveLeft();
                }

            }
            else if (this.cursors.right.isDown)
            {
                if (this.resetBump === 0){
                    this.player.moveRight();
                }

            }
            else
            {
                if (this.resetBump === 0){
                    this.player.stop();
                }

            }

            if (this.cursors.up.isDown && this.player.s.body.onFloor())
            {
                this.player.jump();
            }

            if (Phaser.Input.Keyboard.JustDown(this.changeFormKey)){
                console.log("changement de forme")
                this.player.changeForm()
            }

            if(Phaser.Input.Keyboard.JustDown(this.attackKey)){
                console.log("attaque");
                this.player.swordAttack()
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

    }
}

