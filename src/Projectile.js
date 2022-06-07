class Projectile {

    constructor(scene, x, y) {

        this.scene = scene;
        const sprite = this.scene.physics.add.sprite(this.scene.player.s.x,this.scene.player.s.y,'whiteP').setTexture('whiteP').setDisplaySize(60, 60).setDepth(2000);
        this.scene.projectiles.add(sprite)
        sprite.body.setAllowGravity(false);
        sprite.body.setMaxVelocityX(8000);
        sprite.body.setMaxVelocityX(8000);
        this.scene.physics.moveTo(sprite,x,y);
        sprite.setVelocity(sprite.body.velocity.x*20,sprite.body.velocity.y*20)


        /**
        let particles = this.scene.add.particles('greenP');

        let emit = particles.createEmitter({
            speed: 100,
            gravity: { x: 0, y: 200 },
            scale: { start: 0.1, end: 0.2 },
            follow: sprite
        });
         **/


    }

    destroy(sprite){
        sprite.destroy()

    }
}