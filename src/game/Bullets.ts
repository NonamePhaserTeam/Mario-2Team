import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import { gameSettings } from "../consts/GameSettings";
import { World } from "matter";

export default class Bullets extends Phaser.Physics.Arcade.Sprite {

    private colpo: Phaser.Physics.Arcade.Group
    y: number
    x: number
    private direzione_shot: string

    constructor(
        scene: Phaser.Scene,
        playerx: number,
        playery: number,
        direzione: string,
        dacollidere?: number,
        // texture: string,
    ) {
        super(scene, playerx, playery, TextureKeys.player);

        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)
        this.scene.add.existing(this);
        this.x = playerx
        this.y = playery
        this.direzione_shot = direzione
        this.setVelocity(
            this.Direzione(this.direzione_shot)[0],
            this.Direzione(this.direzione_shot)[1]
        );
        this.setCollisionCategory(dacollidere)
        this.setCollidesWith(dacollidere)
        setTimeout(() => {
            this.destroy(true);
            console.log("autodistruzione")
        }, 1200);
        this.create();
    }
    Direzione(dir: string): Array<number> {
        let xp: number, yp: number;
        switch (dir) {
            case "LEFT":
                xp = -2000
                yp = -0.5
                break;
            case "RIGHT":
                xp = 2000
                yp = 0.5
                break;
            case "UP":
                yp = -1500
                xp = 0.5
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

    create() {
    }

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
    }

}
