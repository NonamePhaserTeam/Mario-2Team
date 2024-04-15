import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import { gameSettings } from "../consts/GameSettings";

export default class Bullets extends Phaser.Physics.Arcade.Sprite {

    private colpo: Phaser.Physics.Arcade.Group
    y: number
    x: number
    private direzione_shot: string
    private texture_proittile: string
    
    constructor(
        scene: Phaser.Scene,
        playerx: number,
        playery: number,
        direzione: string,
        //texture?: string
    ) {
        super(scene, playerx, playery, direzione);

        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)
        this.scene.add.existing(this);
        this.x = playerx
        this.y = playery
        this.direzione_shot = direzione
        //this.texture_proittile = texture
        this.create();
    }
    Direzione(dir: string): Array<number> {
        let xp: number, yp: number;
        switch (dir) {
            case "LEFT":
                xp = -2000
                yp = -1.5
                break;
            case "RIGHT":
                xp= 2000
                yp= 1.5
                break;
            case "UP":
                yp= -1500
                xp= 0.5
                break;
            case "DOWN":
                yp= 1500
                xp= 0.5
                break;
            case "LEFT_UP":
                xp= -1000
                yp= -1000
                break;
            case "LEFT_DOWN":
                xp= -1000
                yp= 1000
                break;
            case "RIGHT_UP":
                xp= 1000
                yp= -1000
                break;
            case "RIGHT_DOWN":
                xp= 1000
                yp= 1000
                break;
        }
        return [xp, yp];
    }

    create() {
        this.colpo = this.scene.physics.add.group()
        let colpo = this.colpo.create(
            this.x,
            this.y,
            TextureKeys.fionda
        ).setScale(0.0);
        colpo.setGravity(0, -500);


        colpo.enableBody(true, this.x, this.y, true, true);
        this.colpo.setVelocity(
            this.Direzione(this.direzione_shot)[0],
            this.Direzione(this.direzione_shot)[1]
        );
        let c = this.colpo.getFirstAlive()
        if (c.y >= gameSettings.gameHeight * 5 || c.x <= 0 || c.y <= 0 || c.x >= gameSettings.gameWidth) {
            this.colpo.getFirstAlive().destroy(true);
        }
    }

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
    }
    
}
