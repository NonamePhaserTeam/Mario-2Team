import Phaser, { Game, Physics } from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import { Bullets } from "../game/components";

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
        this.setDrag(0, 0)
        this.setBounce(0, 0)
        this.setScale(1.5);

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
            if (LEFT.isUp) {
                this.isMovingLeft = false
            }
            if (this.enableDash && this.isTouchingDown) { this.setVelocityX(-this.speed * 15) }

        }
        if (RIGHT.isDown) {
            this.anims.play(AnimationKeys.Player.Walk, true);
            this.setVelocityX(this.speed);
            this.setFlipX(false);
            this.isMovingRight = true
            if (RIGHT.isUp) {
                this.isMovingRight = false
            }
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


    HandleAttack(
        Key1?: Phaser.Input.Keyboard.Key,
        Key2?: Phaser.Input.Keyboard.Key,
        Key3?: Phaser.Input.Keyboard.Key,
        Key4?: Phaser.Input.Keyboard.Key, //left
        Key5?: Phaser.Input.Keyboard.Key, //right
        Key6?: Phaser.Input.Keyboard.Key, //up
        Key7?: Phaser.Input.Keyboard.Key, //down
    ) {

        if (Key1.isDown) {
            this.isAttacking = true;
            this.anims.play(AnimationKeys.Player.Punch, true);
        } else if (Key2.isDown) {
            this.isJumping = false;
            this.setVelocityY(this.speed * 5);
            // this.isAttacking = true;
            // this.anims.play(AnimationKeys.Player.Blow, true);
        } else if (!this.isTouchingDown && Key3.isDown) {
            // this.anims.play(AnimationKeys.Player.Sword, true)
        }

        this.on("animationcomplete", () => {
            this.isAttacking = false;
        });

        if ( Key4.isDown &&
            (!Key6.isDown && !Key7.isDown && !Key5.isDown)
            && !this.ha_sparato && !this.isMovingRight) {
            this.setFlipX(true)

            setTimeout(() => {
                if (!Key4.isUp) new Bullets("LEFT", this.x, this.y)
            }, 300);
            this.ha_sparato = true;
            this.anims.play(AnimationKeys.Player.fionda)
            setTimeout(() => {
                this.ha_sparato = false;
                if (Key4.isUp) {
                    this.anims.stop()
                }
            }, 300);

        } // SINISTRA


        if (Key5.isDown && (!Key6.isDown && !Key7.isDown && !Key4.isDown)
            && !this.ha_sparato && !this.isMovingLeft) {
            this.setFlipX(false)
            setTimeout(() => {
                if (!Key5.isUp) new Bullets("RIGHT", this.x, this.y)
            }, 300);
            this.anims.play(AnimationKeys.Player.fionda)
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
                if (Key5.isUp) {
                    this.anims.stop()
                }
            }, 300);
        } // DESTRA



        if (Key7.isDown && this.flipX && !this.ha_sparato) {
            this.setFlipX(true)
            setTimeout(() => {
                if (!Key7.isUp) new Bullets("LEFT_DOWN", this.x, this.y)
            }, 300);
            this.anims.play(AnimationKeys.Player.fionda)
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
                if (Key7.isUp) {
                    this.anims.stop()
                }
            }, 300);
        } // BASSO SINISTRA

        else if (Key6.isDown && this.flipX && !this.ha_sparato) {
            this.setFlipX(true)
            setTimeout(() => {
                if (!Key6.isUp) new Bullets("LEFT_UP", this.x, this.y)
            }, 300);
            this.anims.play(AnimationKeys.Player.fionda)
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
                if (Key6.isUp) {
                    this.anims.stop()
                }
            }, 300);
        } //ALTO SINISTRA

        if (Key7.isDown && !this.flipX && !this.ha_sparato) {
            this.setFlipX(false)
            setTimeout(() => {
                if (!Key7.isUp) new Bullets("RIGHT_DOWN", this.x, this.y)
            }, 300);
            this.anims.play(AnimationKeys.Player.fionda)
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
                if (Key7.isUp) {
                    this.anims.stop()
                }
            }, 300);
        } // BASSO DESTRA
        else if (Key6.isDown && !this.flipX && !this.ha_sparato) {
            this.setFlipX(false)
            setTimeout(() => {
                if (!Key6.isUp) new Bullets("RIGHT_UP", this.x, this.y)
            }, 300);
            this.anims.play(AnimationKeys.Player.fionda)
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
                if (Key6.isUp) {
                    this.anims.stop()
                }
            }, 300);
        } // BASSO SINISTRA

    }
}
