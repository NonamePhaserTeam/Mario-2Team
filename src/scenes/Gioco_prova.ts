import { Callbacks, globalEval } from "jquery";
import Phaser, { Game, Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
<<<<<<< HEAD
import { node } from "webpack";
=======
import AnimationKeys from "../consts/AnimationKeys";
>>>>>>> ea47721179562766081a2b3ec86fe0e2c266afc3

export default class Gioco_prova extends Phaser.Scene {
    /* ---------- SCENA ---------- */
    player: Phaser.Physics.Arcade.Sprite;
    colliderplayer: any
    platforms: Phaser.Physics.Arcade.StaticGroup;
    camera: Phaser.Cameras.Scene2D.Camera;
    /* ---------- SCENA ---------- */

    /* ---------- MOVEMENT ---------- */
    W: Phaser.Input.Keyboard.Key; //climb up
    A: Phaser.Input.Keyboard.Key; // sinistra
    S: Phaser.Input.Keyboard.Key; // climb down
    D: Phaser.Input.Keyboard.Key; // destra
    SPACE: Phaser.Input.Keyboard.Key; // salta
    SHIFT: Phaser.Input.Keyboard.Key; //dasha
    X: Phaser.Input.Keyboard.Key; // cade in picchiata
    playerSpeed: number = 750;

    /* ---------- MOVEMENT ---------- */

    /* -------- FLAGS ---------- */
    touching: boolean = false;
    touchingUp: boolean = false;
    touchingDown: boolean = false;
    touchingLeft: boolean = false;
    touchingRight: boolean = false;
    loadingJump: boolean = false;
    isMoving: boolean = false;
    isJumping: boolean = false;
    wastouching: boolean = false;
    /* -------- FLAGS ---------- */
    /* -------- FIONDA --------- */
    colpo: Phaser.Physics.Arcade.Group
    LEFT: Phaser.Input.Keyboard.Key; //mira sinistra
    RIGHT: Phaser.Input.Keyboard.Key; // mira destra
    UP: Phaser.Input.Keyboard.Key; // miira sopra
    DOWN: Phaser.Input.Keyboard.Key; // mira sotto
    /* -------- FIONDA --------- */
    worldBounds = { width: gameSettings.gameWidth, height: gameSettings.gameHeight * 3, }

    y_piattaforme = gameSettings.gameHeight * 5 - 40
    direzione: number = 0;
    ha_sparato: boolean = false;

    constructor() { super(SceneKeys.Game); }
    init() {

        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, false);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, false);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, false);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, false);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);
        this.SHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT, true, false);
        this.X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X, true, false);

        this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, true, false);
        this.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, true, false);
        this.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, true, false);
        this.DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, true, false);

        this.camera = this.cameras.main;

<<<<<<< HEAD

=======
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
>>>>>>> ea47721179562766081a2b3ec86fe0e2c266afc3
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
            0,
            0,
            gameSettings.gameWidth,
            gameSettings.gameHeight * 5,
            true
        )

        this.camera.setBackgroundColor(gameSettings.bgColor);
        this.platforms = this.physics.add.staticGroup();
        this.CreatePlatform(0.5, 3)

        this.y_piattaforme -= gameSettings.gameHeight / 1.3

        for (let i = 0; i < 10; i++) {
            let k = Math.floor(Math.random() * (10 - 2 + 1)) + 1
            switch (k) {
                case 2, 7: //piafforma centrale 2 mini mini piattaforme al lato
                    this.CreatePlatform(0.29, 0.5)  //left 
                    this.CreatePlatform(0.5, 1)  //middle 
                    this.CreatePlatform(0.73, 0.5)  //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 3, 8: // due piattaforme con spacco al centro
                    this.CreatePlatform(0.29, 1) //left 
                    this.CreatePlatform(0.73, 1) //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 4, 9: // due piattaforme con spacco al a sinistra
                    this.CreatePlatform(0.29, 0.7) //left 
                    this.CreatePlatform(0.73, 2.3) //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 5, 10: // due piattaforme con spacco al a destra
                    this.CreatePlatform(0.29, 2.3) //left 
                    this.CreatePlatform(0.73, 0.7) //right
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
            }
        }


        this.player = this.physics.add
<<<<<<< HEAD
            .sprite(this.platforms.getChildren()[0].body.position.x + 100, this.platforms.getChildren()[0].body.position.y - 60, TextureKeys.player)
=======
            .sprite(this.platforms.getChildren()[0].body.position.x + 100, this.platforms.getChildren()[0].body.position.y - 60, TextureKeys.boss)
>>>>>>> ea47721179562766081a2b3ec86fe0e2c266afc3
            .setCollideWorldBounds(true)
            .setDrag(0, 0)
            .setBounce(0, 0)
            .setScale(1.5);

        // this.CreateAnims();
		this.player.play(AnimationKeys.Boss.idle)


        this.colliderplayer = this.physics.world.addCollider(this.player, this.platforms)
        this.camera.startFollow(this.player, true, 1, 1);
        this.colpo = this.physics.add.group()
    }
    CreateAnims() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames(TextureKeys.player, { start: 1, end: 8, zeroPad: 1, prefix: 'walk', suffix: '.png' }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames(TextureKeys.player, { start: 1, end: 5, zeroPad: 1, prefix: 'fermo', suffix: '.png' }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'loadJump',
            frames: this.anims.generateFrameNames(TextureKeys.player, { start: 1, end: 3, zeroPad: 1, prefix: 'jump', suffix: '.png' }),
            frameRate: 8,
            repeat: 0,
        });

        this.anims.create({
            key: 'doJump',
            frames: this.anims.generateFrameNames(TextureKeys.player, { start: 4, end: 6, zeroPad: 1, prefix: 'jump', suffix: '.png' }),
            frameRate: 4,
            repeat: 0,
        });
    }

    // todo wall climbing, wall sliding 

    CreatePlatform(playerX: number, scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * playerX,
            this.y_piattaforme,
            'platform'
        ).setScale(scala_immagine, 1).body.updateFromGameObject();
    }
    Direzione(direzione: string, playerx?: number, playery?: number): Array<number> {
        let x: number, y: number;
        switch (direzione) {
            case "LEFT":
                x = -2000
                y = -1
                break;
            case "RIGHT":
                x = 2000
                y = 1

                break;
            case "UP":
                y = -1500
                x = 0.5
                break;
            case "DOWN":
                y = 1500
                x = 0.5
                break;
            case "LEFT_UP":
                x = -1000
                y = -1000

                break;
            case "LEFT_DOWN":
                x = -1000
                y = 1000

                break;
            case "RIGHT_UP":
                x = 1000
                y = -1000

                break;
            case "RIGHT_DOWN":
                x = 1000
                y = 1000

                break;
        }

        return [x, y];

    }

    Bullets(direzione: string, playerx: number, playery: number) {

        let colpo = this.colpo.create(
            this.player.x,
            this.player.y,
            TextureKeys.player
        ).setScale(0.5);


        colpo.enableBody(true, this.player.x, this.player.y, true, true);
        colpo.setVelocity(
            this.Direzione(direzione)[0],
            this.Direzione(direzione)[1]
        );

        let c = this.colpo.getFirstAlive()
            if (
                c.y >= gameSettings.gameHeight * 5
                || c.x <= 0 || c.y <= 0 ||c.x >= gameSettings.gameWidth
            ) {
                this.colpo.getFirstAlive().destroy(true);
                console.log("distrutto")

            }


    }
    startWalk(walk: boolean) { walk ? this.player.play("walk") : this.player.play("idle") }
    update(time: number, delta: number): void {
<<<<<<< HEAD
        this.isMoving = this.A.isDown || this.D.isDown || this.S.isDown || this.W.isDown;
        this.touchingDown = this.player.body.touching.down || this.player.body.blocked.down;
        this.touchingUp = this.player.body.touching.up || this.player.body.blocked.up;
        this.touchingRight = this.player.body.touching.right || this.player.body.blocked.right;
        this.touchingLeft = this.player.body.touching.left || this.player.body.blocked.left;
        this.touching = this.touchingLeft && this.touchingRight && this.touchingUp && this.touchingDown;
        if (
            this.LEFT.isDown &&
            (!this.UP.isDown && !this.DOWN.isDown && !this.RIGHT.isDown)
            && !this.ha_sparato
        ) {
            setTimeout(() => {
                this.Bullets("LEFT", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);

        }

        if (this.RIGHT.isDown && (!this.UP.isDown && !this.DOWN.isDown && !this.LEFT.isDown)
            && !this.ha_sparato) {
            setTimeout(() => {
                this.Bullets("RIGHT", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);
        }

        if (this.UP.isDown && (!this.LEFT.isDown && !this.RIGHT.isDown && !this.DOWN.isDown)
            && !this.ha_sparato) {
            setTimeout(() => {
                this.Bullets("UP", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);
        }

        if (this.DOWN.isDown &&
            (!this.LEFT.isDown && !this.RIGHT.isDown && !this.UP.isDown)
            && !this.ha_sparato) {
            setTimeout(() => {
                this.Bullets("DOWN", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);
        }

        if (this.DOWN.isDown && this.LEFT.isDown && !this.ha_sparato) {
            setTimeout(() => {
                this.Bullets("LEFT_DOWN", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);
        } else if (this.UP.isDown && this.LEFT.isDown && !this.ha_sparato) {
            setTimeout(() => {
                this.Bullets("LEFT_UP", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);
        }

        if (this.DOWN.isDown && this.RIGHT.isDown && !this.ha_sparato) {
            setTimeout(() => {
                this.Bullets("RIGHT_DOWN", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);
        } else if (
            this.UP.isDown && this.RIGHT.isDown && !this.ha_sparato
        ) {

            setTimeout(() => {
                this.Bullets("RIGHT_UP", this.player.x, this.player.y)
            }, 750);
            this.ha_sparato = true;
            setTimeout(() => {
                this.ha_sparato = false;
            }, 750);
        }










        if (this.touchingUp) {
            this.physics.world.removeCollider(this.colliderplayer);
            setTimeout(() => {
                this.colliderplayer = this.physics.world.addCollider(this.player, this.platforms)
            }, 50);
        }
        this.player.setVelocity(0);
        /* CLIMBING STUFF */
        if (this.touchingRight || this.touchingLeft) {
            this.player.setDrag(0, 10000);
            this.wastouching = true;
            if (this.touchingLeft) {
                this.player.setGravityX(-10);
                this.direzione += 1
            } else if (this.touchingRight) {
                this.player.setGravityX(10);
                this.direzione -= 1
            }
            if (this.W.isDown) { this.player.setVelocityY(-this.playerSpeed); }
        }

        if (this.SHIFT.isDown && this.wastouching) { this.player.setVelocityX(10000 * this.direzione); }
        /* CLIMBING STUFF */

        /* MOVIMENTI ORIZZONTALI */
        if (this.A.isDown) {
            this.player.setFlipX(true);
            this.player.setVelocityX(-this.playerSpeed);
            //this.Bullets += 1
        }
        else if (this.D.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(this.playerSpeed);
        }

        //if (this.A.isUp) { console.log(this.Bullets) }
        /* MOVIMENTI ORIZZONTALI */
=======
        // this.isMoving = this.A.isDown || this.D.isDown || this.S.isDown || this.W.isDown;
        // this.touchingDown = this.resetFlags(this.player.body.touching.down, this.player.body.blocked.down);
        // this.touchingUp = this.resetFlags(this.player.body.touching.up, this.player.body.blocked.up);
        // this.touchingRight = this.resetFlags(this.player.body.touching.right, this.player.body.blocked.right);
        // this.touchingLeft = this.resetFlags(this.player.body.touching.left, this.player.body.blocked.left);
        // this.touching = this.touchingLeft && this.touchingRight && this.touchingUp && this.touchingDown;

        // if (this.touchingUp) {
        //     this.physics.world.removeCollider(this.colliderplayer);
        //     setTimeout(() => {
        //         this.colliderplayer = this.physics.world.addCollider(this.player, this.platforms)
        //     }, 50);
        // }
        // this.player.setVelocity(0);
        // /* CLIMBING STUFF */
        // if (this.touchingRight || this.touchingLeft) {
        //     this.player.setDrag(0, 10000);
        //     this.wastouching= true;
        //     if (this.touchingLeft) {
        //         this.player.setGravityX(-10);
        //         this.direzione += 1
        //     } else if (this.touchingRight) {
        //         this.player.setGravityX(10);
        //         this.direzione -= 1
        //     }
        //     if (this.W.isDown) { this.player.setVelocityY(-this.playerSpeed); }
        // }

        // if (this.SHIFT.isDown && this.wastouching) { this.player.setVelocityX(10000*this.direzione); }
        // /* CLIMBING STUFF */

        // /* MOVIMENTI ORIZZONTALI */
        // if (this.A.isDown) {
        //     this.player.setFlipX(true);
        //     this.player.setVelocityX(-this.playerSpeed);
        // }
        // else if (this.D.isDown) {
        //     this.player.setFlipX(false);
        //     this.player.setVelocityX(this.playerSpeed);
        // }

        // /* MOVIMENTI ORIZZONTALI */
>>>>>>> ea47721179562766081a2b3ec86fe0e2c266afc3

        // /* MOVIMENTI VERTICALI */
        // //if (this.W.isDown) {this.player.setVelocityY(-this.playerSpeed);}
        // //else if (this.S.isDown) {this.player.setVelocityY(this.playerSpeed);}
        // /* MOVIMENTI VERTICALI */

        // /* DASH */
        // if (this.A.isDown && this.SHIFT.isDown) { this.player.setVelocityX(-3000); }
        // if (this.D.isDown && this.SHIFT.isDown) { this.player.setVelocityX(3000); }
        // /* DASH */
        // /* COLPO IN PICCHIATA */ // da implementare un cd
        // if (this.X.isDown && !this.touching) {
        //     this.player.setVelocityY(this.playerSpeed * 5);
        // }
        // /* COLPO IN PICCHIATA */



        // /* JUMP STUFF */
        // this.SPACE.on("down", () => {
        //     this.loadingJump = true;
        // });

<<<<<<< HEAD
        this.SPACE.on("up", () => {
            this.SPACE.enabled = false;
            this.loadingJump = false;
            this.isJumping = true;
            setTimeout(() => {
                this.isJumping = false;
            }, 750)
        });



        if (this.isJumping) {
            this.player.setVelocityY(-this.playerSpeed * 2)
            if (this.player.anims.currentAnim.key !== "doJump") {
                this.player.play("doJump");
            }
        }
=======
        // this.SPACE.on("up", () => {
        //     this.SPACE.enabled = false;
        //     this.loadingJump = false;
        //     this.isJumping = true;
        //     setTimeout(() => {
        //         this.isJumping = false;
        //     }, 500)
        // });



        // if (this.isJumping) {
        //     this.player.setVelocityY(-this.playerSpeed * 5)
        //     if (this.player.anims.currentAnim.key !== "doJump") {
        //         this.player.play("doJump");
        //     }
        // }
>>>>>>> ea47721179562766081a2b3ec86fe0e2c266afc3

        // if (this.touchingDown || this.touchingLeft || this.touchingRight) {
        //     this.SPACE.enabled = true;
        //     if (this.loadingJump) {
        //         if (this.player.anims.currentAnim.key !== "loadJump") {
        //             this.player.play("loadJump");
        //         }
        //     } else if (this.isMoving) {
        //         if (this.player.anims.currentAnim.key !== "walk") {
        //             this.startWalk(true);
        //         }
        //     }
        //     else if (this.player.anims.currentAnim.key !== "idle") {
        //         this.startWalk(false);
        //     }

        // } else {
        //     this.SPACE.enabled = false;
        //     if (!this.player.anims.isPlaying) {
        //         this.player.setFrame("jump6.png");
        //     }
        // }

        // if (!this.touchingLeft && !this.touchingRight) {
        //     this.player.setDrag(0, 0)
        //     this.wastouching = false;
        // }

        // this.direzione = 0;
        /* JUMP STUFF */
    }
}
