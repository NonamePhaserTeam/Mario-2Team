
import Phaser, { Physics } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	private speed = 250;
	private isMoving = false;
	private isAttacking = false;
	private isTouchingDown = true;
	private isJumping = false;
	private enableDash = false;
	private shiftEnabled = true; 
	private health = 100;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		frame?: string | number,
	) {
		super(scene, x, y, texture, frame);

		scene.physics.world.enable(this);
		this.setCollideWorldBounds(true)
		this.anims.play(AnimationKeys.Player.Idle);
		this.create();
		this.scene.add.existing(this);
		
		console.log("classe player")
	}
	
	create() {

		this.scene.input.keyboard.on('keydown-SPACE', () => {
			if(this.isTouchingDown) {
				this.isJumping = true;
				setTimeout(() => {
					this.isJumping = false;
				}, 500);
			}
		});

	}

	preUpdate(t: number, dt: number) {
		// update per tutte le componenti dello sprite compless
		super.preUpdate(t, dt);
	}

	HandleMovement(
		LEFT: Phaser.Input.Keyboard.Key,
		SHIFT: Phaser.Input.Keyboard.Key,
		RIGHT: Phaser.Input.Keyboard.Key,
		// Blow: Phaser.Input.Keyboard.Key,
	) {
		if (this.isAttacking) return;

		this.setVelocity(0);

		this.isMoving = LEFT.isDown || RIGHT.isDown;
		this.isTouchingDown = this.body.touching.down || this.body.blocked.down;
		
		let lastDash;

		if(SHIFT.isDown && this.shiftEnabled) {
			this.enableDash = true;
			setTimeout(() => {
				this.shiftEnabled = true;
			}, 5000);
			setTimeout(() => {
				this.enableDash = false;
				this.shiftEnabled = false;
			}, 150);
		}

		// console.log("this.enableDash: " + this.enableDash, "\nshift.enabled: " + SHIFT.enabled, "\nshift status: " + SHIFT.isDown);

		if (LEFT.isDown) {
			this.anims.play(AnimationKeys.Player.Walk, true);
			this.setVelocityX(-this.speed);
			this.setFlipX(true);
			if (this.enableDash && this.isTouchingDown) {this.setVelocityX(-this.speed*15)}

		}
		if (RIGHT.isDown) {
			this.anims.play(AnimationKeys.Player.Walk, true);
			this.setVelocityX(this.speed);
			this.setFlipX(false);
			if (this.enableDash && this.isTouchingDown) {this.setVelocityX(this.speed*15)}

		}

		if (this.isJumping) {
			this.isMoving = true;
			this.anims.play(AnimationKeys.Player.Jump, true);
			this.setVelocityY(-this.speed*3);
		}
		else if(!this.isTouchingDown){
			// this.setFrame("	");
			this.setVelocityY(this.speed);
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
			this.isJumping = false;
			this.setVelocityY(this.speed * 5);
			// this.isAttacking = true;
			// this.anims.play(AnimationKeys.Player.Blow, true);
		} else if(!this.isTouchingDown && Key3.isDown) {
			// this.anims.play(AnimationKeys.Player.Sword, true)
		}

		this.on("animationcomplete", () => {
			this.isAttacking = false;
		});
	}
}
