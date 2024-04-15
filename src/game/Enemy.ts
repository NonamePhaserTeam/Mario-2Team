import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";

interface EnemyClass {
	Idle: string,
	Walk: string,
}

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	private speed = 100;
	private damage: number;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		EnemyClass: EnemyClass,
		frame?: string,
	) {
		super(scene, x, y, texture, frame);

		scene.physics.world.enable(this);
		this.setCollideWorldBounds(true)
		this.anims.play(EnemyClass.Idle);
		this.create();
		this.scene.add.existing(this);

		this.setScale(1.7);
	}

	create() {

	}

	HandleMovement() {
		let k = 1.2 + ( Math.random() * 0.8);

		
	}

} 