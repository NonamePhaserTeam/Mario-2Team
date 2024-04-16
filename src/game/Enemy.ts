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
        x: number,
        y: number,
        texture: string,
        EnemyClass: EnemyClass,
        frame?: string,
    ) {
        super(scene, x, y, texture,frame);

        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)
        this.anims.play(EnemyClass.Idle);
        this.scene.add.existing(this);
        this.setScale(1.7);
        // this.create();
    }

    //HandleMovement(Player.x:number, Player.y:number) {if(Player.x > 200 from)}

}
