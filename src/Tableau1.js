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
        this.platforms = map.createStaticLayer('Platforms', tileset);

        this.platforms.setCollisionByExclusion(-1, true);

        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this)

        this.cameras.main.startFollow(this.player.player,false);
    }


    update() {

        switch (true) {
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
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
}