import Phaser, { Game, Physics } from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import { Bullets } from "../game/components";
import TextureKeys from "../consts/TextureKeys";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private speed = 250;
    private isMoving = false;
    private isMovingLeft = false;
    private isMovingRight = false;
    private isAttacking = false;
    private isTouchingDown = true;
    private isJumping = false;
    private enableDash = false;
    private shiftEnabled = true;
    private health = 100;
    private ha_sparato: boolean = false;
	private enableShooting = true;

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
        this.scene.add.existing(this);
        this.setScale(1.5);
        this.create();
    }

    create() {
        this.scene.input.keyboard.on('keydown-SPACE', () => {
            if (this.isTouchingDown) {
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
        RIGHT: Phaser.Input.Keyboard.Key,
        SHIFT: Phaser.Input.Keyboard.Key,
        // Blow: Phaser.Input.Keyboard.Key,
    ) {
        if (this.isAttacking) {
            this.setVelocity(0);
            return;
        }

        this.setVelocity(0);

        this.isMoving = LEFT.isDown || RIGHT.isDown;
        this.isTouchingDown = this.body.touching.down || this.body.blocked.down;

        if (SHIFT.isDown && this.shiftEnabled) {
            this.enableDash = true;
            setTimeout(() => {
                this.shiftEnabled = true;
            }, 5000);
            setTimeout(() => {
                this.enableDash = false;
                this.shiftEnabled = false;
            }, 150);
        }

        if (LEFT.isDown) {
            this.anims.play(AnimationKeys.Player.Walk, true);
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
            this.isMovingLeft = true
            setTimeout(() => {
                if (LEFT.isUp) {
                    this.isMovingLeft = false
                }
            }, 300);
            if (this.enableDash && this.isTouchingDown) { this.setVelocityX(-this.speed * 15) }

        }
        if (RIGHT.isDown) {
            this.anims.play(AnimationKeys.Player.Walk, true);
            this.setVelocityX(this.speed);
            this.setFlipX(false);
            this.isMovingRight = true
            setTimeout(() => {
                if (RIGHT.isUp) {
                    this.isMovingRight = false
                }
            }, 300);

            if (this.enableDash && this.isTouchingDown) { this.setVelocityX(this.speed * 15) }

        }

        if (this.isJumping) {
            this.isMoving = true;
            this.anims.play(AnimationKeys.Player.Jump, true);
            this.setVelocityY(-this.speed * 3);
        }
        else if (!this.isTouchingDown) {
            this.setFrame("jump6.png");
            this.setVelocityY(this.speed);
        }

        if (!this.isMoving) {
            this.anims.play(AnimationKeys.Player.Idle, true);
            this.setAccelerationY(0);
            this.setVelocityX(0);
        }
    }

    getplayerX() {
        return this.x
    }
    getplayerY() {
        return this.y
    }
    HandleAttack(
        Key1?: Phaser.Input.Keyboard.Key, // cazzotto
        Key2?: Phaser.Input.Keyboard.Key, // blow
        Key3?: Phaser.Input.Keyboard.Key, // spada
        Key4?: Phaser.Input.Keyboard.Key, // left
        Key5?: Phaser.Input.Keyboard.Key, // right
        Key6?: Phaser.Input.Keyboard.Key, // up
        Key7?: Phaser.Input.Keyboard.Key, // down
    ) {

        if (Key1.isDown) {
            this.isAttacking = true;
            this.anims.play(AnimationKeys.Player.Punch, true);
        } else if (Key2.isDown) {
            this.isJumping = false;
            this.setVelocityY(this.speed * 20);
            // this.isAttacking = true;
            // this.anims.play(AnimationKeys.Player.Blow, true);
        } else if (!this.isTouchingDown && Key3.isDown) {
            // this.anims.play(AnimationKeys.Player.Sword, true)
        }


        if ((Key4.isDown && this.enableShooting) &&
            (!Key6.isDown && !Key7.isDown && !Key5.isDown)
            && !this.ha_sparato && !this.isMovingRight) {
            this.setFlipX(true)
			this.isAttacking = true;
			this.anims.play(AnimationKeys.Player.fionda, true)
			
			this.enableShooting = false;
			setTimeout(() => {
				this.enableShooting = true;
			}, 300);
        } // SINISTRA

		this.on("animationcomplete", () => {
            this.isAttacking = false;
			if(this.anims.currentAnim.key === "player-fionda") {
				new Bullets(
					this.scene,
					this.body.x,
					this.body.y,
					"LEFT"
				);
			}
        });

       }
}
