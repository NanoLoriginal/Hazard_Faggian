class Menu extends Phaser.Scene {
    constructor() {
        super('menu1');
    }

    //on charge les images
    preload() {
        this.load.image("menu_jeu", "assets/images/menu.png");
        this.load.image("imageBoutonPlay", "assets/images/bouton_play.png");
        this.load.image("imageBoutonQuit", "assets/images/bouton_quit.png");
    }

    create() {
        // on place les éléments de fond
        this.add
            .image(0, 0, "menu_jeu")
            .setOrigin(0)
            .setDepth(0)
            .setAlpha(0.7)
            .setVisible(true);


        let bouton_play = this.add.image(300, 520, "imageBoutonPlay").setDepth(1);
        //let bouton_quit = this.add.image(250, 760, "imageBoutonQuit").setDepth(1);

        bouton_play.setInteractive();
        //bouton_quit.setInteractive();

        bouton_play.on('pointerover',function(){
            bouton_play.setAlpha(1);
        })

        //bouton_quit.on('pointerover',function(){
        //    bouton_quit.setAlpha(1);
        //})

        bouton_play.on('pointerout',function(){
            bouton_play.setAlpha(0.7);
        })

        //bouton_quit.on('pointerout',function(){
        //    bouton_quit.setAlpha(0.7);
        //})

        bouton_play.on("pointerup", () => {
            this.scene.start("level");
            this.scene.start("UIScene");
        });

        //bouton_quit.on("pointerup", () => {
        //    game.destroy()
        //});
    }

}