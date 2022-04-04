class Tableau1 extends Phaser.Scene {

    preload(){
        this.load.image("starterpack", "assets/tilesheets/platformPack_tilesheet.png");
        this.load.tilemapTiledJSON("map", "assets/tilemaps/level1.json");
    }

    create(){
        let level1 = this.add.tilemap("map");
        let terrain = level1.addTilesetImage("starterpack", "terrain");

        //layers

        let groundLayer = level1.createLayer("ground", [terrain], 0, 0);
        let backgroundLayer = level1.createLayer("background", [terrain], 0, 0);

    }

    update(){

    }

}
