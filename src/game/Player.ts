
import Phaser, { Physics } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	private speed = 250;
	private isMoving = false;
	private isAttacking = false;
	private isTouchingDown = true;
	private enableDash = true;
	private health = 100;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame);

		scene.physics.world.enable(this);

		this.setCollideWorldBounds(true)
		this.anims.play(AnimationKeys.Player.Idle);

		this.scene.add.existing(this);

		console.log("classe player")
	}

	create() {
		
	}

	preUpdate(t: number, dt: number) {
		// update per tutte le componenti dello sprite compless
		super.preUpdate(t, dt);
	}

	HandleMovement(
		UP: Phaser.Input.Keyboard.Key,
		LEFT: Phaser.Input.Keyboard.Key,
		SHIFT: Phaser.Input.Keyboard.Key,
		RIGHT: Phaser.Input.Keyboard.Key
	) {
		if (this.isAttacking) return;
		
		if(SHIFT.isDown && SHIFT.enabled) {
			// Memorizza il tempo del click del tasto
			this.enableDash = true;
			SHIFT.enabled = false;
			setTimeout(() => {
				SHIFT.enabled = true;
			}, 5000);
			setTimeout(() => {
				this.enableDash = false;
			}, 200);
		}

		this.isMoving = LEFT.isDown || RIGHT.isDown;
		if (LEFT.isDown) {
			this.isMoving = true;
			this.anims.play(AnimationKeys.Player.Walk, true);
			this.setVelocityX(-this.speed);
			if (this.enableDash && this.isTouchingDown) {this.setVelocityX(-this.speed*25)}

		}
		if (RIGHT.isDown) {
			this.isMoving = true;
			this.anims.play(AnimationKeys.Player.Walk, true);
			this.setVelocityX(this.speed);
			if (this.enableDash && this.isTouchingDown) {this.setVelocityX(this.speed*25)}

		}
		if (UP.isDown) {
			if (this.body.velocity.y == 0) {
			  this.isMoving = true;
			  this.anims.play(AnimationKeys.Player.Jump, true);
			  this.setVelocityY(-this.speed);
			}
		}

		if (!this.isMoving) {
			this.anims.play(AnimationKeys.Player.Idle, true);
			this.setAccelerationY(0);
			this.setVelocityX(0);
		}
	}

	HandleAttack(
		Key1: Phaser.Input.Keyboard.Key,
		Key2: Phaser.Input.Keyboard.Key,
		Key3: Phaser.Input.Keyboard.Key,
	) {
		if (Key1.isDown) {
			this.isAttacking = true;
			this.anims.play(AnimationKeys.Player.Punch, true);
		} else if (Key2.isDown) {
			this.isAttacking = true;
			this.anims.play(AnimationKeys.Player.Sword, true);
		} else if(!this.isTouchingDown && Key3.isDown) {
			this.anims.play(AnimationKeys.Player.Blow, true)
		}

		this.on("animationcomplete", () => {
			this.isAttacking = false;
		});
	}
}
