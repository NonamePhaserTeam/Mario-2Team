import Phaser, { Game, Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import { node } from "webpack";
import AnimationKeys from "../consts/AnimationKeys";
import Player from "../game/Player"
import Enemy from "../game/Enemy"
import Bullets from "../game/Bullets"
import { World } from "matter";

export default class Gioco_prova extends Phaser.Scene {
    /* ---------- SCENA ---------- */
    player: Player;
    enemy: Enemy;
    colliderplayer: any
    player2: any
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
    ENTER: Phaser.Input.Keyboard.Key; // colpisce melee
    playerSpeed: number = 300;
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
    LEFT: Phaser.Input.Keyboard.Key; //mira sinistra
    RIGHT: Phaser.Input.Keyboard.Key; // mira destra
    UP: Phaser.Input.Keyboard.Key; // miira sopra
    DOWN: Phaser.Input.Keyboard.Key; // mira sotto
    ha_sparato: boolean = false;
    /* -------- FIONDA --------- */
    worldBounds = { width: gameSettings.gameWidth, height: gameSettings.gameHeight * 3, }
    caterogia_collisioni: number
    y_piattaforme = gameSettings.gameHeight * 5 - 40
    direzione: number = 0;

    constructor() { super(SceneKeys.Game); }
    init() {

        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, false);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, false);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, false);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, false);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);
        this.SHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT, true, false);
        this.X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X, true, false);
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, true, false);

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
        this.caterogia_collisioni = this.physics.nextCategory()
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
        //this.platforms = this.physics.add.staticGroup();
        //this.CreatePlatform(0.5, 3)

        //this.y_piattaforme -= gameSettings.gameHeight / 1.3

        //for (let i = 0; i < 10; i++) {
        //    let k = Math.floor(Math.random() * (10 - 2 + 1)) + 1
        //    switch (k) {
        //        case 2, 7: //piafforma centrale 2 mini mini piattaforme al lato
        //            this.CreatePlatform(0.29, 0.5)  //left 
        //            this.CreatePlatform(0.5, 1)  //middle 
        //            this.CreatePlatform(0.73, 0.5)  //right 
        //            this.y_piattaforme -= gameSettings.gameHeight / 1.3
        //        case 3, 8: // due piattaforme con spacco al centro
        //            this.CreatePlatform(0.29, 1) //left 
        //            this.CreatePlatform(0.73, 1) //right 
        //            this.y_piattaforme -= gameSettings.gameHeight / 1.3
        //        case 4, 9: // due piattaforme con spacco al a sinistra
        //            this.CreatePlatform(0.29, 0.7) //left 
        //            this.CreatePlatform(0.73, 2.3) //right 
        //            this.y_piattaforme -= gameSettings.gameHeight / 1.3
        //        case 5, 10: // due piattaforme con spacco al a destra
        //            this.CreatePlatform(0.29, 2.3) //left 
        //            this.CreatePlatform(0.73, 0.7) //right
        //            this.y_piattaforme -= gameSettings.gameHeight / 1.3
        //    }
        //}

        this.player = new Player(
            this,
            1000,
            gameSettings.gameHeight*5,
            TextureKeys.player,
        )
        this.add.existing(this.player);

        this.enemy = new Enemy(
            this,
            1050,
            gameSettings.gameHeight*5,
            100,
            50,
            TextureKeys.SkeletonEnemy,
            AnimationKeys.SkeletonEnemy,
        )
        this.add.existing(this.enemy);

        //this.physics.world.addCollider(this.platforms, this.player)
        //this.physics.world.addCollider(this.platforms, this.enemy)
        this.physics.add.collider(this.player, this.enemy)
        this.camera.startFollow(this.player, true, 1, 1);

        
    }

    //CreatePlatform(playerX: number, scala_immagine: number) {
    //    this.platforms.create(
    //        gameSettings.gameWidth * playerX,
    //        this.y_piattaforme,
    //        'platform'
    //    ).setScale(scala_immagine, 1).body.updateFromGameObject();
    //    this.platforms.setCollisionCategory(this.caterogia_collisioni)
    //    this.platforms.setCollidesWith(this.caterogia_collisioni)
    //}
    startWalk(walk: boolean) { walk ? this.player.play("walk") : this.player.play("idle") }

    update(time: number, delta: number): void {
        this.player.HandleMovement(this.A, this.SHIFT, this.D)
        this.player.HandleAttack(this.ENTER, this.X, this.S, this.LEFT, this.RIGHT, this.UP, this.DOWN);
        this.enemy.OnGuard(
            0,
            0,
        );


        //this.isMoving = this.A.isDown || this.D.isDown || this.S.isDown || this.W.isDown;
        //this.touchingDown = this.player.body.touching.down || this.player.body.blocked.down;
        //this.touchingUp = this.player.body.touching.up || this.player.body.blocked.up;
        //this.touchingRight = this.player.body.touching.right || this.player.body.blocked.right;
        //this.touchingLeft = this.player.body.touching.left || this.player.body.blocked.left;
        //this.touching = this.touchingLeft && this.touchingRight && this.touchingUp && this.touchingDown;

        //if (this.touchingUp) {
        //    this.physics.world.removeCollider(this.colliderplayer);
        //    setTimeout(() => {
        //        this.colliderplayer = this.physics.world.addCollider(this.player, this.platforms)
        //    }, 50);
        //}

        //this.player.setVelocity(0);
        ///* CLIMBING STUFF */
        //if (this.touchingRight || this.touchingLeft) {
        //    this.player.setDrag(0, 10000);
        //    this.wastouching = true;
        //    if (this.touchingLeft) {
        //        this.player.setGravityX(-10);
        //        this.direzione += 1
        //    } else if (this.touchingRight) {
        //        this.player.setGravityX(10);
        //        this.direzione -= 1
        //    }
        //    if (this.W.isDown) { this.player.setVelocityY(-this.playerSpeed); }
        //}

        //if (this.SHIFT.isDown && this.wastouching) { this.player.setVelocityX(10000 * this.direzione); }
        ///* CLIMBING STUFF */


        ///* MOVIMENTI ORIZZONTALI */
        //if (this.A.isDown) {
        //    this.player.setFlipX(true);
        //    this.player.setVelocityX(-this.playerSpeed);
        //    //this.Bullets += 1
        //}
        //else if (this.D.isDown) {
        //    this.player.setFlipX(false);
        //    this.player.setVelocityX(this.playerSpeed);
        //}
        /* MOVIMENTI VERTICALI */
        //if (this.W.isDown) {this.player.setVelocityY(-this.playerSpeed);}
        //else if (this.S.isDown) {this.player.setVelocityY(this.playerSpeed);}
        /* MOVIMENTI VERTICALI */

        /* DASH */
        //if (this.A.isDown && this.SHIFT.isDown) { this.player.setVelocityX(-3000); }
        //if (this.D.isDown && this.SHIFT.isDown) { this.player.setVelocityX(3000); }
        /* DASH */
        /* COLPO IN PICCHIATA */ // da implementare un cd
        //if (this.X.isDown && !this.touching) {
        //    this.player.setVelocityY(this.playerSpeed * 5);
        //}
        /* COLPO IN PICCHIATA */

        /* MOVIMENTI ORIZZONTALI */
        /* JUMP STUFF */
        //this.loadingJump = true;
        //this.SPACE.on("down", () => {
        //});

        //this.SPACE.on("up", () => {
        //    this.SPACE.enabled = false;
        //    this.loadingJump = false;
        //    this.isJumping = true;
        //    setTimeout(() => {
        //        this.isJumping = false;
        //    }, 750)
        //});

        //if (this.isJumping) {
        //    this.player.setVelocityY(-this.playerSpeed * 2)
            //    if (this.player.anims.currentAnim.key !== "doJump") {
            //        this.player.play("doJump");
            //    }
        //}
        //if (this.touchingDown || this.touchingLeft || this.touchingRight) {
        //    this.SPACE.enabled = true;
            //if (this.loadingJump) {
            //    if (this.player.anims.currentAnim.key !== "loadJump") {
            //        this.player.play("loadJump");
            //    }
            //} else 
            //if (this.isMoving) {
            //    if (this.player.anims.currentAnim.key !== "walk") {
            //        this.startWalk(true);
            //    }
            //}
            //else if (this.player.anims.currentAnim.key !== "idle") {
            //    this.startWalk(false);
        //}

        //}// else {
        //   this.SPACE.enabled = false;
        //   if (!this.player.anims.isPlaying) {
        //       this.player.setFrame("jump6.png");
        //   }
        //  }

        //if (!this.touchingLeft && !this.touchingRight) {
        //    this.player.setDrag(0, 0)
        //    this.wastouching = false;
        //}
        //this.direzione = 0;
        /* JUMP STUFF */
// >>>>>>> 4e51291 (follow del nemico, mancano animazioni)
    }
}
