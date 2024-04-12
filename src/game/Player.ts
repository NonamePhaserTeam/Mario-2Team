
import Phaser, { Physics } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	private speed = 250;
	private isMoving = false;
	private isAttacking = false;
	private isTouchingDown = true;
	private health = 100;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame);

		this.scene.physics.world.enableBody(this);

		this.anims.play("idle");

		this.scene.add.existing(this);
	}

	create() {}

	preUpdate(t: number, dt: number) {
		// update per tutte le componenti dello sprite compless
		super.preUpdate(t, dt);
	}

	HandleMovement(
		UP: Phaser.Input.Keyboard.Key,
		LEFT: Phaser.Input.Keyboard.Key,
		// DOWN: Phaser.Input.Keyboard.Key,
		RIGHT: Phaser.Input.Keyboard.Key
	) {
		if (this.isAttacking) return;

		this.isMoving = LEFT.isDown || RIGHT.isDown;
		if (LEFT.isDown) {
			this.isMoving = true;
			this.anims.play(AnimationKeys.player.walk, true);
			this.setVelocityX(-this.speed);
		}
		if (RIGHT.isDown) {
			this.isMoving = true;
			this.anims.play(AnimationKeys.player.walk, true);
			this.setVelocityX(this.speed);
		}
		if (UP.isDown) {
			if (this.body.velocity.y == 0) {
			  this.isMoving = true;
			  this.anims.play(AnimationKeys.player.jump, true);
			  this.setVelocityY(-this.speed);
			}
		}
		if (!this.isMoving) {
			this.anims.play(AnimationKeys.player.idle, true);
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
		this.anims.play(AnimationKeys.player.punch);
		} else if (Key2.isDown) {
		this.isAttacking = true;
		this.anims.play(AnimationKeys.player.sword);
		} else if(!this.isTouchingDown && Key3.isDown) {
			this.anims.play(AnimationKeys.player.blow)
		}

		this.on("animationcomplete", () => {
			this.isAttacking = false;
		});
	}

  	HandleJump(
		SPACE: Phaser.Input.Keyboard.Key,
  	)
  	{
		if(this.isAttacking) return;

		if(SPACE.isDown) {

		}
	}
}
