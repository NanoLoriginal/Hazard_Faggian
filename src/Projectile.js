class Projectile {

    constructor(scene, x, y) {

        this.scene = scene;
        const sprite = this.scene.physics.add.sprite(this.scene.player.s.x,this.scene.player.s.y,'feu').setTexture('feu').setDisplaySize(50, 50).setDepth(2000);
        this.scene.projectiles.add(sprite)
        sprite.body.setAllowGravity(false);
        sprite.body.setMaxVelocityX(8000);
        sprite.body.setMaxVelocityX(8000);
        this.scene.physics.moveTo(sprite,x,y);
        sprite.setVelocity(sprite.body.velocity.x*10,sprite.body.velocity.y*10)
        console.log("caca")

    }

    destroy(sprite){
        sprite.destroy()
    }
}