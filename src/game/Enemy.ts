import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import {Player} from "../game/components";

interface EnemyClass {
    Idle: string,
    Walk: string,
}

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private speed = 10;
    private damage: number;
    player: Player

    constructor(
        scene: Phaser.Scene,
        xe: number,
        ye: number,
        texture: string,
        EnemyClass: EnemyClass,
        dacollidere?: number,
        frame?: string,
    ) {
        super(scene, xe, ye, texture,frame);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)
        this.anims.play(EnemyClass.Idle);
        this.scene.add.existing(this);
        this.setScale(1.7);
        this.setCollisionCategory(dacollidere)
        this.setCollidesWith(dacollidere)
        //this.create();
    }

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
    }

    OnGuard(playerx:number, playery:number){
        if (this.y === playery && this.x - 50 <= playerx) {
            this.setVelocityX(-this.speed);
        } else if (this.y === playery || this.x + 50 >= playerx) {
            this.setVelocityX(this.speed);
        }
    }

}
