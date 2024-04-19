import Phaser, { Game, Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
//import { gameData } from "../consts/GameData";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import { node } from "webpack";
import AnimationKeys from "../consts/AnimationKeys";
import Player from "../game/Player"
import Enemy from "../game/Enemy"

import AlignGrid from "../utilities/alignGrid";
export default class Gioco_prova extends Phaser.Scene {
    /* ---------- SCENA ---------- */
    private player: Player;
    private enemy: Enemy;
    private hp_enemy: number = 10
    private nemico_distrutto: boolean = false
    private last_punch: number = 0;
    private last_sword: number = 0;
    private last_fionda: number = 0;
    private colliderplayer: any
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private colpo: Phaser.Physics.Arcade.Group;
    private platforms_senzacollider: Phaser.Physics.Arcade.StaticGroup;
    private camera: Phaser.Cameras.Scene2D.Camera;
    /* ---------- SCENA ---------- */

    /* ---------- MOVEMENT ---------- */
    private W: Phaser.Input.Keyboard.Key; //climb up
    private A: Phaser.Input.Keyboard.Key; // sinistra
    private S: Phaser.Input.Keyboard.Key; // climb down
    private D: Phaser.Input.Keyboard.Key; // destra
    private SPACE: Phaser.Input.Keyboard.Key; // salta
    private SHIFT: Phaser.Input.Keyboard.Key; //dasha
    private X: Phaser.Input.Keyboard.Key; // cade in picchiata
    private E: Phaser.Input.Keyboard.Key; // colpisce melee
    private playerSpeed: number = 300;
    private enableShooting: boolean = true;
    /* ---------- MOVEMENT ---------- */

    /* -------- FLAGS ---------- */
    private isMoving: boolean = false;
    private isMovingLeft: boolean = false;
    private isMovingRight: boolean = false;
    private isJumping: boolean = false;
    private isAttacking: boolean = false;
    private dirshot: string;
    /* -------- FLAGS ---------- */
    /* -------- FIONDA --------- */
    private LEFT: Phaser.Input.Keyboard.Key; //mira sinistra
    private RIGHT: Phaser.Input.Keyboard.Key; // mira destra
    private UP: Phaser.Input.Keyboard.Key; // miira sopra
    private DOWN: Phaser.Input.Keyboard.Key; // mira sotto
    private ha_sparato: boolean = false;
    /* -------- FIONDA --------- */
    private worldBounds = { width: gameSettings.gameWidth, height: gameSettings.gameHeight * 3, }
    private caterogia_collisioni: number
    private y_piattaforme = gameSettings.gameHeight * 5 - 40


    constructor() { super(SceneKeys.Game); }
    init() {

        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, false);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, false);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, false);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, false);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);
        this.SHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT, true, false);
        this.X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X, true, false);
        this.E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E, true, false);

        this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, true, false);
        this.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, true, false);
        this.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, true, false);
        this.DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, true, false);

        this.camera = this.cameras.main;

        this.camera.setBounds(
            0,
            0,
            this.worldBounds.width,
            this.worldBounds.height,
            true
        );

        this.physics.world.setBounds(
            0,
            0,
            this.worldBounds.width,
            this.worldBounds.height,
        );
    }
    create() {
        this.camera.setBounds(
            0,
            0,
            gameSettings.gameWidth,
            gameSettings.gameHeight * 5,
            true
        );
        this.physics.world.setBounds(
            350,
            0,
            gameSettings.gameWidth - 700,
            gameSettings.gameHeight * 5,
            true
        )

        //let k = Math.floor(Math.random() * (10 - 2 + 1)) + 1
        //this.camera.setBackgroundColor(gameSettings.bgColor);
        this.platforms_senzacollider = this.physics.add.staticGroup()
        this.platforms = this.physics.add.staticGroup();
        //this.CreatePlatform(0.5, 3, 1, this.y_piattaforme)

        this.y_piattaforme -= gameSettings.gameHeight / 3

        //// due piattaforme con spacco al centro OKAY
        this.CreatePlatform(0.30, 1.2, 1.5, this.y_piattaforme) //left 
        this.CreatePlatform2(0.50, 1.14, 0.8, this.y_piattaforme - 27.5) //centrale
        this.CreatePlatform(0.70, 1.2, 1.5, this.y_piattaforme) //right 
        this.y_piattaforme -= gameSettings.gameHeight / 2.3

        //// due piattaforme con spacco al a sinistra OKAY
        this.CreatePlatform2(0.29, 1.138, 0.8, this.y_piattaforme - 27.5) //left 
        this.CreatePlatform(0.60, 2.46, 1.5, this.y_piattaforme) //right 
        this.y_piattaforme -= gameSettings.gameHeight / 2.3



        this.CreatePlatform(0.26, 0.8, 1.5, this.y_piattaforme) //left 
        this.CreatePlatform2(0.405, 0.9, 0.8, this.y_piattaforme - 27.5) //centrale
        this.CreatePlatform(0.576, 1.1, 1.5, this.y_piattaforme) //right 
        this.CreatePlatform2(0.747, 0.9, 0.8, this.y_piattaforme - 27.5) //centrale
        this.y_piattaforme -= gameSettings.gameHeight / 2


        this.enemy = new Enemy(
            this,
            1050,
            gameSettings.gameHeight * 5,
            TextureKeys.Texture.SkeletonEnemy,
            100,
            50,
			10,
            AnimationKeys.SkeletonEnemy,
        )
        // this.add.existing(this.enemy);

        this.player = new Player(
            this,
            1000,
            gameSettings.gameHeight * 5,
            TextureKeys.Texture.player,
			this.enemy,
        )
        //this.add.existing(this.player);


        const aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11,
            width: this.worldBounds.width,
            height: this.worldBounds.height * 5,
        });

        aGrid.showNumbers();

        this.physics.world.addCollider(this.platforms, this.player)
        this.physics.world.addCollider(this.platforms, this.enemy)
        this.physics.world.addCollider(this.platforms_senzacollider, this.enemy)
        this.physics.world.addCollider(this.player, this.enemy)


        this.camera.startFollow(this.player, true, 0.5, 0.5, 1, 1);
        this.physics.world.addCollider(this.player, this.platforms_senzacollider)
        this.physics.world.addCollider(this.player, this.platforms)
        this.player.setCollisionCategory(3)
        this.player.setCollidesWith(3)
        this.colpo = this.physics.add.group();
    }

    CreatePlatform(playerX: number, scala_immagineX: number, scala_immagineY: number, y_piattaforma: number) {
        this.platforms.create(
            gameSettings.gameWidth * playerX,
            y_piattaforma,
            'platform'
        ).setScale(scala_immagineX, scala_immagineY).body.updateFromGameObject();
        this.platforms.setCollisionCategory(3)
        this.platforms.setCollidesWith(3)
    }

    CreatePlatform2(playerX: number, scala_immagineX: number, scala_immagineY: number, y_piattaforma: number) {
        this.platforms_senzacollider.create(
            gameSettings.gameWidth * playerX,
            y_piattaforma,
            'platform'
        ).setScale(scala_immagineX, scala_immagineY).body.updateFromGameObject();
        this.platforms_senzacollider.setCollisionCategory(3)
        this.platforms_senzacollider.setCollidesWith(3)
    }

  

    Direzione(dir: string): Array<number> {
        let xp: number, yp: number;
        switch (dir) {
            case "LEFT":
                xp = -2000
                yp = 0
                break;
            case "RIGHT":
                xp = 2000
                yp = 0
                break;
            case "UP":
                yp = -1500
                xp = -0.5
                break;
            case "DOWN":
                yp = 1500
                xp = 0.5
                break;
            case "LEFT_UP":
                xp = -1000
                yp = -1000
                break;
            case "LEFT_DOWN":
                xp = -1000
                yp = 1000
                break;
            case "RIGHT_UP":
                xp = 1000
                yp = -1000
                break;
            case "RIGHT_DOWN":
                xp = 1000
                yp = 1000
                break;
        }
        return [xp, yp];
    }

    update(time: number, delta: number): void {
        this.player.HandleMovement(this.A, this.SHIFT, this.D)
        this.player.HandleAttack(
            this.E,
            this.X,
            this.S,
            this.LEFT,
            this.RIGHT,
            this.UP,
            this.DOWN
        );


        if (
            this.E.isDown && time > 500 + this.last_punch && (
                (
                    this.player.body.touching.left && this.player.flipX === true
                ) || (
                    this.player.body.touching.right && this.player.flipX === false
                )
            )
        ) {
            this.last_punch = time;
            this.hp_enemy -= 2;

            if (this.hp_enemy == 0) {
                this.enemy.destroy(true);
                this.nemico_distrutto = true;
            }
        }

        if (
            this.S.isDown && time > 500 + this.last_punch && (
                (
                    this.player.body.touching.left && this.player.flipX === true
                ) || (
                    this.player.body.touching.right && this.player.flipX === false
                )
            )
        ) {
            this.last_punch = time;
            this.hp_enemy -= 3;
            console.log(this.hp_enemy)

            if (this.hp_enemy <= 0) {
                this.enemy.destroy(true);
                this.nemico_distrutto = true;
            }
        }

        this.physics.world.addCollider(this.colpo, this.enemy, () => {
            if (
                this.LEFT.isDown || this.RIGHT.isDown || this.UP.isDown || this.DOWN.isDown && time > 500 + this.last_fionda
            ) {
                this.last_fionda = time;
                this.hp_enemy -= 3;
                console.log(this.hp_enemy)
                if (this.hp_enemy <= 0) {
                    this.enemy.destroy(true);
                    this.nemico_distrutto = true;
                }
            }

        })

        //this.isMovingLeft = this.player.Moving().isMovingLeft
        //this.isMovingRight = this.player.Moving().isMovingRight
        //this.isMoving = this.player.Moving().isMoving

        /* ---- SPARO ----- */
        //  if (
        //      this.LEFT.isDown &&
        //      (!this.UP.isDown && !this.DOWN.isDown && !this.RIGHT.isDown)
        //      && !this.ha_sparato
        //  ) {
        //      this.player.setFlipX(true)
        //      setTimeout(() => {
        //          if (!this.LEFT.isUp) {
        //              this.dirshot = "LEFT"

        //              this.CreateBullets()
        //          }
        //      }, 300);
        //      this.ha_sparato = true;
        //      this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //      setTimeout(() => {
        //          this.ha_sparato = false;
        //      }, 300);

        //  } // SINISTRA


        //  if (this.RIGHT.isDown && (!this.UP.isDown && !this.DOWN.isDown && !this.LEFT.isDown)
        //      && !this.ha_sparato) {
        //      this.player.setFlipX(false)
        //      setTimeout(() => {
        //          if (!this.RIGHT.isUp) {
        //              this.dirshot = "RIGHT"
        //              this.CreateBullets()
        //          }
        //      }, 300);
        //      this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //      this.ha_sparato = true;
        //      setTimeout(() => {
        //          this.ha_sparato = false;
        //      }, 300);
        //  } // DESTRA



        //  if (this.DOWN.isDown && this.player.flipX && !this.ha_sparato) {
        //      this.player.setFlipX(true)
        //      setTimeout(() => {
        //          if (!this.DOWN.isUp) {
        //              this.dirshot = "LEFT_DOWN"
        //              this.CreateBullets()
        //          }
        //      }, 300);
        //      this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //      this.ha_sparato = true;
        //      setTimeout(() => {
        //          this.ha_sparato = false;
        //      }, 300);
        //  } // BASSO SINISTRA

        //  else if (this.UP.isDown && this.player.flipX && !this.ha_sparato) {
        //      this.player.setFlipX(true)
        //      setTimeout(() => {
        //          if (!this.UP.isUp) {
        //              this.dirshot = "LEFT_UP"
        //              this.CreateBullets()
        //          }
        //      }, 300);
        //      this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //      this.ha_sparato = true;
        //      setTimeout(() => {
        //          this.ha_sparato = false;
        //      }, 300);
        //  } //ALTO SINISTRA

        //  if (this.DOWN.isDown && !this.player.flipX && !this.ha_sparato) {
        //      this.player.setFlipX(false)
        //      setTimeout(() => {
        //          if (!this.DOWN.isUp) {

        //              this.dirshot = "RIGHT_DOWN"
        //              this.CreateBullets(
        //              )
        //          }

        //      }, 300);
        //      this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //      this.ha_sparato = true;
        //      setTimeout(() => {
        //          this.ha_sparato = false;
        //      }, 300);
        //  } // BASSO DESTRA
        //  else if (this.UP.isDown && !this.player.flipX && !this.ha_sparato) {
        //      this.player.setFlipX(false)
        //      setTimeout(() => {
        //          if (!this.UP.isUp) {
        //              this.dirshot = "RIGHT_UP"

        //              this.CreateBullets()
        //          }
        //      }, 300);
        //      this.player.anims.play(AnimationKeys.Player.Fionda)
        //      this.ha_sparato = true;
        //      setTimeout(() => {
        //          this.ha_sparato = false;
        //          if(this.UP.isUp){
        //              this.player.anims.stop()
        //          }
        //      }, 300);
        //  } // ALTO DESTRA
        //  /* ---- SPARO ----- */



        //if ((this.RIGHT.isDown) &&
        //    (!this.UP.isDown && !this.DOWN.isDown && !this.LEFT.isDown)
        //    && !this.isMovingLeft) {
        //    this.player.setFlipX(false)
        //    setTimeout(() => {
        //        //this.player.handleResetFlag(this.enableShooting, 300);
        //        this.player.anims.play(AnimationKeys.Player.Fionda, true)

        //        this.CreateBullets()
        //    }, 300);
        //} // DESTRA

        //if (this.DOWN.isDown && this.player.flipX) {
        //    this.dirshot = "LEFT_DOWN"
        //    this.player.setFlipX(true)
        //    //this.player.handleResetFlag(this.enableShooting, 300);
        //    setTimeout(() => {
        //        this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //        this.CreateBullets()
        //    }, 300);

        //} // BASSO SINISTRA
        //else if (this.UP.isDown && this.player.flipX) {
        //    this.dirshot = "LEFT_UP"
        //    this.player.setFlipX(true)
        //    //this.player.handleResetFlag(this.enableShooting, 300);
        //    setTimeout(() => {
        //        this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //        this.CreateBullets()
        //    }, 300);

        //} //ALTO SINISTRA

        //if (this.DOWN.isDown && !this.player.flipX) {
        //    this.dirshot = "RIGHT_DOWN"
        //    this.player.setFlipX(false)
        //    //this.player.handleResetFlag(this.enableShooting, 300);
        //    setTimeout(() => {
        //        this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //        this.CreateBullets()
        //    }, 300);
        //} // BASSO DESTRA
        //else if (this.UP.isDown && !this.player.flipX) {
        //    this.dirshot = "RIGHT_UP"
        //    this.player.setFlipX(false)
        //    //this.player.handleResetFlag(this.enableShooting, 300);
        //    setTimeout(() => {
        //        this.player.anims.play(AnimationKeys.Player.Fionda, true)
        //        this.CreateBullets()
        //    }, 300);
        //} // ALTO DESTRA
        ////}





        if (!this.nemico_distrutto) {
                this.enemy.OnGuard(
                    this.player.getXY().x,
                    this.player.getXY().y
                );
            }

            if (this.player.body.touching.up) {
                this.platforms_senzacollider.removeCollidesWith(3)
                setTimeout(() => {
                    this.platforms_senzacollider.setCollidesWith(3)
                }, 50);
            }

            /* MOVIMENTI VERTICALI */
            if (this.W.isDown) { this.player.setVelocityY(-this.playerSpeed); }
            else if (this.S.isDown) { this.player.setVelocityY(this.playerSpeed); }
            /* MOVIMENTI VERTICALI */

        }
    }
