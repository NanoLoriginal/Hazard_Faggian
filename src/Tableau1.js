class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('background', 'assets/images/background_test.png');//image de fond
        this.load.image('light_effect', 'assets/images/light_effect.png');//effet de light
        this.load.image('ciel', 'assets/images/ciel_test.jpg');
        this.load.image('enemy', 'assets/images/ennemi1.png');
        this.load.image('fume', 'assets/images/cac.png');
        this.load.image('fumee1', 'assets/images/smoke.png');
        this.load.image('touches', 'assets/images/touches.png');
        this.load.image('tuto1', 'assets/images/tuto1.png');

        this.load.spritesheet('run','photoshop/spritesheet_run.png',{frameWidth: 245, frameHeight: 317});
        this.load.spritesheet('idle','photoshop/spritesheet_idle.png',{frameWidth: 244, frameHeight: 316});


        this.load.image('vert', 'assets/images/particles/green-orb.png');
        this.load.image('greenP', 'assets/images/particles/green.png');
        this.load.image('whiteP', 'assets/images/particles/white.png');


        //this.load.image('spike', 'assets/images/spike.png');//on charge l'image de l'objet piques
        this.load.image('feu', 'assets/images/feu.png');
        // At last image must be loaded with its JSON
        //this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');//on charge le joueur

        //this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');//on charge le tileset qui contient les éléments utilisés dans tiled
        this.load.image('tiles', 'assets/tilesets/tileset1_test.png');//on charge le tileset qui contient les éléments utilisés dans tiled
        this.load.image('tiles_back', 'assets/tilesets/tileset_background.png');//on charge le tileset qui contient les éléments utilisés dans tiled


        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Map1_test.json');

    }


    create() {






        this.anims.create({
            key:'running',
            frames: this.anims.generateFrameNames('run', {

                start: 0,
                end: 6,

            }),
            frameRate: 20,
            repeat: -1,
        });


        this.anims.create({
            key:'idleAnim',
            frames: this.anims.generateFrameNames('idle', {

                start: 0,
                end: 5,

            }),
            frameRate: 6,
            repeat: -1,
        });


        //const cielImage = this.add.image(0, 0, 'ciel').setOrigin(0, 0);
        //cielImage.setScale(30, 30);

        const backgroundImage = this.add.image(1200, 780, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 1.15);

        const backgroundImage2 = this.add.image(6150, 0, 'background').setOrigin(0, 0);
        backgroundImage2.setScale(1.75, 1.7);




        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('tileset1_test', 'tiles');

        const tileset_background = map.addTilesetImage('background_tileset', 'tiles_back');


        this.fond3 = map.createLayer('fond3', tileset_background);
        this.fond2 = map.createLayer('fond2', tileset_background);
        this.fond1 = map.createLayer('fond1', tileset_background);
        this.paralax2 = map.createLayer('paralax2', tileset_background);
        this.paralax1 = map.createLayer('paralax1', tileset_background);

        const lightEffectImage = this.add.image(1200, 780, 'light_effect').setOrigin(0, 0);
        lightEffectImage.setScale(3, 2);
        lightEffectImage.setAlpha(0.4);


        const lightEffectImage2 = this.add.image(6150, 0, 'light_effect').setOrigin(0, 0);
        lightEffectImage2.setScale(2.8, 2.8);
        lightEffectImage2.setAlpha(0.4);


        this.auraLight3 = map.createLayer('aura_lumière3', tileset);
        this.auraLight2 = map.createLayer('aura_lumière2', tileset);
        this.auraLight = map.createLayer('aura_lumière1', tileset);

        this.fumeeFront = map.createLayer('fumée_front1', tileset);
        this.fumeeFront2 = map.createLayer('fumée_front2', tileset);
        this.fumeeFront3 = map.createLayer('fumée_front3', tileset);
        this.decor2 = map.createLayer('décor2', tileset);
        this.decor1 = map.createLayer('décor', tileset);
        this.decor3 = map.createLayer('décor3', tileset);
        this.cables = map.createLayer('cables_opacite', tileset);
        this.fioles = map.createLayer('fioles_opacite', tileset);
        this.platformes = map.createLayer('platformes', tileset);
        this.murs = map.createLayer('murs', tileset);
        this.ventils = map.createLayer('ventils', tileset);
        this.ventils.setAlpha(0.8);
        this.sol = map.createLayer('sol', tileset);



        this.cursors = this.input.keyboard.createCursorKeys();

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.changeFormKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.touches = this.add.image(400,2260,'touches');
        this.tuto1 = this.add.image(1400,2200,'tuto1');

        this.player = new Player(this);
        this.ennemi1 = new Ennemi(this);
        this.ennemi1.s.x = 6920
        this.ennemi1.s.y = 688


        this.cameras.main.startFollow(this.player.s,true);
        this.cameras.main.zoomTo(0.6);

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

        this.allDeathZones = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        })


        /**
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            const spikeSprite = this.add.rectangle(spike.x + spike.width*0.5, spike.y + spike.height*0.5, spike.width, spike.height)
            this.spikes.add(spikeSprite);
        });
        **/

        map.getObjectLayer('Collider').objects.forEach((obj) =>{
            const collider = this.add.rectangle(obj.x + obj.width*0.5, obj.y + obj.height*0.5, obj.width, obj.height)
            this.Collider.add(collider);
        })


        map.getObjectLayer('entree_ventilations').objects.forEach((vent)=>{
            this.ventSprite = this.add.rectangle(vent.x+vent.width*0.5,vent.y+vent.height*0.5, vent.width, vent.height)
            this.ventilations.add(this.ventSprite);
            this.ventSprite.name="ventSprite";
        })

        map.getObjectLayer('dead_zone').objects.forEach((dead)=>{
            this.deathZone = this.add.rectangle(dead.x+dead.width*0.5,dead.y+dead.height*0.5, dead.width, dead.height)
            this.allDeathZones.add(this.deathZone);
        })



        console.log("test ici",this.ventilations.getChildren().filter(toto=>toto.name==="ventSprite"))


        //this.physics.add.collider(this.player.s, this.spikes, this.playerHitSpike,null, this);
        this.physics.add.collider(this.player.s, this.Collider);
        this.physics.add.collider(this.player.s, this.ventilations);

        this.physics.add.collider(this.player.s, this.ennemi1.s,this.playerHitEnnemi, null, this);

        this.physics.add.collider(this.player.s, this.allDeathZones,this.playerHitSpike, null, this);


        this.physics.add.collider(this.ennemi1.s, this.Collider);
        this.physics.add.collider(this.ennemi1.s, this.ventilations);



        this.swordHitBox = this.add.image(0,0,'fume');
        this.physics.add.existing(this.swordHitBox);
        console.log(this.swordHitBox.body);
        this.swordHitBox.body.setAllowGravity(false);

        this.swordHitBox.body.enable = false
        this.physics.world.remove(this.swordHitBox.body);

        /**
        this.ennemyBox = this.add.rectangle(480,600,64,64,0xffffff,0.5);
        this.physics.add.existing(this.ennemyBox);
        console.log(this.ennemyBox.body);
        this.ennemyBox.body.setAllowGravity(false)
         **/

        this.physics.add.overlap(this.swordHitBox, this.ennemi1.s, this.handleCollide, undefined, this);
        this.physics.add.collider(this.projectiles, this.ennemi1.s, this.projectileCollide, undefined, this);
        this.physics.add.collider(this.projectiles, this.Collider, this.projectileDestroy, undefined, this);

        this.resetBump = 0;

        this.hit = this.add.particles('whiteP');
        this.hit.createEmitter({
            lifespan: 300,
            speed: 150,
            quantity: 200,
            scale: { start: 0.2, end: 0 },
            on: false
        });


        this.transfo = this.add.particles('fumee1');
        this.transfo.createEmitter({
            lifespan: 400,
            speed: 2000,
            quantity: 1000,
            scale: { start: 0.5, end: 0 },
            on: false
        });


    }

    handleCollide(object1, object2){
        console.log("touché")
        this.player.damageEnnemi(this.ennemi1)
        this.swordHitBox.body.enable = false
        this.physics.world.remove(this.swordHitBox.body);
    }

    projectileCollide(object1, object2){
        console.log("touché")
        this.player.damageEnnemi(this.ennemi1)
        object2.destroy();

    }

    projectileDestroy(object1, object2){
        console.log("destroy")
        this.hit.emitParticleAt(object1.x,object1.y);
        object1.destroy();
        window.objet_fragment += 25;

    }


    playerHitSpike(player, spike) {
        this.resetBump = 1
        console.log(playerHealth)

        if (this.player.recovery === false){

            if (this.player.s.x< spike.body.x){
                player.setVelocity(-600,-400)
            }
            else{
                player.setVelocity(600,-400)
            }



            playerHealth = playerHealth - this.ennemi1.ennemiDamages;
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

        console.log(playerHealth)
        if (playerHealth<0){
            player.setVelocity(0, 0);
            player.setX(344);
            player.setY(2224);
            player.play('idle', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'linear',
                repeat: 5,
            });
            playerHealth = 100;
        }
    }

    playerHitEnnemi(player, ennemi) {
        this.resetBump = 1
        ennemi = this.ennemi1
        console.log(playerHealth)

        if (this.player.recovery === false){

            if (this.player.s.x< this.ennemi1.s.x){
                player.setVelocity(-600,-400)
            }
            else{
                player.setVelocity(600,-400)
            }



            playerHealth = playerHealth - this.ennemi1.ennemiDamages;
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

        console.log(playerHealth)
        if (playerHealth<0){
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


        this.ennemi1.update()


        if(this.player.ActualForm==0){
            if (playerEnergy<100){
                playerEnergy+=1
            }

            //if (this.cursors.left.isDown)
            if (this.leftKey.isDown)
            {
                if (this.resetBump === 0){
                    this.player.moveLeft();
                }

            }
            else if (this.rightKey.isDown)
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

            if (this.jumpKey.isDown && this.player.s.body.onFloor())
            {
                this.player.jump();
            }

            if (Phaser.Input.Keyboard.JustDown(this.changeFormKey)){
                console.log("changement de forme")
                this.player.changeForm()
                this.player.s.setTint(0);
                this.transfo.emitParticleAt(this.player.s.x,this.player.s.y);
                window.objet_fragment += 100;
            }

            /**
            if(Phaser.Input.Keyboard.JustDown(this.attackKey)){
                console.log("attaque");
                this.player.swordAttack()
            }
             **/
        }

        else{
            if (playerEnergy>0){
                playerEnergy-=2
            }
            else{
                this.player.changeForm()
                this.player.s.setTint(99999999);

            }


            if (this.leftKey.isDown)
            {
                this.player.moveLeft();
            }
            else if (this.rightKey.isDown)
            {
                this.player.moveRight();
            }
            else
            {
                this.player.stop();
            }

            if (this.jumpKey.isDown)
            {
                this.player.jump();
            }
            else if(this.downKey.isDown){
                this.player.moveDown();
            }
            else{
                this.player.s.setVelocityY(0);
            }

            if (Phaser.Input.Keyboard.JustDown(this.changeFormKey)){
                console.log("changement de forme")
                this.player.changeForm()
                this.player.s.setTint(99999999);
            }
        }
    }
}

