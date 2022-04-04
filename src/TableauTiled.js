class TableauTiled extends Tableau1 {
    preload(){
        super.preload();
        this.load.image("starterpack", "assets/tilesheets/platformPack_tilesheet.png");
        this.load.tilemapTiledJSON("map", "assets/tilemaps/level1.json");
    }

    create(){
        super.create();
        let level1 = this.add.tilemap("map");
        let terrain = level1.addTilesetImage("starterpack");
    }

}