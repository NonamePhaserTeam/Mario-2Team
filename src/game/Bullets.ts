import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import { Player, Enemy } from "../game/components";
export default class Bullets extends Phaser.Physics.Arcade.Sprite {
    private direzione_shot: string;

    constructor(
        scene: Phaser.Scene,
        playerx: number,
        playery: number,
        direzione: string,
        // texture: string,
        dacollidere?: number,
    ) {
        super(scene, playerx, playery, TextureKeys.Texture.player);

        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)
        this.direzione_shot = direzione
        scene.add.existing(this);
		this.scene.physics.world.on('collision', function (object1: any) {
			// Controlla se object1 è un oggetto Sprite
			// if (object1 instanceof Phaser.GameObjects.Sprite) {
			// 	// Distruggi object1
			// 	object1.destroy();
			// }
		
		});
        this.create();
    }

    private create() {
        this.setVelocity(
            this.Direzione(this.direzione_shot)[0],
            this.Direzione(this.direzione_shot)[1]
        );

        setTimeout(() => {this.destroy(true);}, 200);
    }

    Direzione(dir: string): Array<number> {
        let xp: number, yp: number;
        switch (dir) {
            case "LEFT":
                xp = -2000
                yp = 0
                break;
            case "RIGHT":
                xp = 2000
                yp = 0
                break;
            case "UP":
                yp = -1500
                xp = -0.5
                break;
            case "DOWN":
                yp = 1500
                xp = 0.5
                break;
            case "LEFT_UP":
                xp = -1000
                yp = -1000
                break;
            case "LEFT_DOWN":
                xp = -1000
                yp = 1000
                break;
            case "RIGHT_UP":
                xp = 1000
                yp = -1000
                break;
            case "RIGHT_DOWN":
                xp = 1000
                yp = 1000
                break;
        }
        return [xp, yp];
    }
	
	collide() {
		if(this.active == false){return;}
		this.destroy(true);
	}

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
		if(this.active == false){return;}

    }
}
