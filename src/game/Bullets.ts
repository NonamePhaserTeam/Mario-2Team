import Phaser, { Game, Physics } from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import { gameSettings } from "../consts/GameSettings";

export default class Bullets extends Phaser.Physics.Arcade.Sprite {

    private colpo: Phaser.Physics.Arcade.Group
    private y: number
    private x: number
    private direzione_shot: string
    
    constructor(
        scene: Phaser.Scene,
        playerx: number,
        playery: number,
        //texture: string,
        direzione:string
    ) {
        super(scene, playerx, playery, direzione);

        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)
        this.create();
        this.scene.add.existing(this);
        this.x = playerx
        this.y = playery
        this.direzione_shot = direzione

    }

    create() {

        this.colpo = this.scene.physics.add.group()
    }

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
    }
    Direzione(dir: string): Array<number> {
        let x: number, y: number;
        switch (dir) {
            case "LEFT":
                x = -2000
                y = -1.5
                break;
            case "RIGHT":
                x = 2000
                y = 1.5
                break;
            case "UP":
                y = -1500
                x = 0.5
                break;
            case "DOWN":
                y = 1500
                x = 0.5
                break;
            case "LEFT_UP":
                x = -1000
                y = -1000
                break;
            case "LEFT_DOWN":
                x = -1000
                y = 1000
                break;
            case "RIGHT_UP":
                x = 1000
                y = -1000
                break;
            case "RIGHT_DOWN":
                x = 1000
                y = 1000
                break;
        }
        return [x, y];
    }

    Bullets(direzione: string) {

        let colpo = this.colpo.create(
            this.x,
            this.y,
            TextureKeys.player
        ).setScale(0.5);
        colpo.setGravity(0, -500);


        colpo.enableBody(true, this.x, this.y, true, true);
        colpo.setVelocity(
            this.Direzione(this.direzione_shot)[0],
            this.Direzione(this.direzione_shot)[1]
        );

        let c = this.colpo.getFirstAlive()
        if (c.y >= gameSettings.gameHeight * 5 || c.x <= 0 || c.y <= 0 || c.x >= gameSettings.gameWidth) {
            this.colpo.getFirstAlive().destroy(true);
        }
    }


}
