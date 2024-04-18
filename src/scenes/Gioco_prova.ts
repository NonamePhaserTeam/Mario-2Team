import Phaser, { Game, Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import { node } from "webpack";
import AnimationKeys from "../consts/AnimationKeys";
import Player from "../game/Player"
import Enemy from "../game/Enemy"

export default class Gioco_prova extends Phaser.Scene {
    /* ---------- SCENA ---------- */
    player: Player;
    enemy: Enemy;
    hp_enemy: number = 5
    nemico_distrutto: boolean = false
    colliderplayer: any
    player2: any
    platforms: Phaser.Physics.Arcade.StaticGroup;
    platforms_senzacollider: Phaser.Physics.Arcade.StaticGroup;
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
    E: Phaser.Input.Keyboard.Key; // colpisce melee
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
            gameSettings.gameWidth-700,
            gameSettings.gameHeight * 5,
            true
        )
        console.log(
            gameSettings.gameWidth/2
        )

        //let k = Math.floor(Math.random() * (10 - 2 + 1)) + 1
        //this.camera.setBackgroundColor(gameSettings.bgColor);
        this.platforms_senzacollider = this.physics.add.staticGroup()
        this.platforms = this.physics.add.staticGroup();
        //this.CreatePlatform(0.5, 3, 1, this.y_piattaforme)

        this.y_piattaforme -= gameSettings.gameHeight / 1.3

        //// due piattaforme con spacco al centro OKAY
        this.CreatePlatform(0.30, 1.2, 1.5, this.y_piattaforme) //left 
        this.CreatePlatform2(0.50, 1.14, 0.8, this.y_piattaforme - 27.5) //centrale
        this.CreatePlatform(0.70, 1.2, 1.5, this.y_piattaforme) //right 
        this.y_piattaforme -= gameSettings.gameHeight / 1.3

        //// due piattaforme con spacco al a sinistra OKAY
        this.CreatePlatform2(0.29, 1.138, 0.8, this.y_piattaforme - 27.5) //left 
        this.CreatePlatform(0.60, 2.46, 1.5, this.y_piattaforme) //right 
        this.y_piattaforme -= gameSettings.gameHeight / 1.3


        this.enemy = new Enemy(
            this,
            1050,
            this.y_piattaforme,
            100,
            50,
            TextureKeys.Texture.SkeletonEnemy,
            AnimationKeys.SkeletonEnemy,
        )
        this.add.existing(this.enemy);

        this.CreatePlatform(0.26, 0.8, 1.5, this.y_piattaforme) //left 
        this.CreatePlatform2(0.405, 0.9, 0.8, this.y_piattaforme - 27.5) //centrale
        this.CreatePlatform(0.576, 1.1, 1.5, this.y_piattaforme) //right 
        this.CreatePlatform2(0.747, 0.9, 0.8, this.y_piattaforme - 27.5) //centrale
        this.y_piattaforme -= gameSettings.gameHeight / 1.3






        //piafforma centrale 2 mini mini piattaforme al lato
        //this.CreatePlatform(0.29, 0.5, 1.8, this.y_piattaforme)  //left 
        //this.CreatePlatform(0.5, 1, 1.8, this.y_piattaforme)  //middle 
        //this.CreatePlatform(0.73, 0.5, 1.8, this.y_piattaforme)  //right 
        //this.y_piattaforme -= gameSettings.gameHeight / 1.3


        //// due piattaforme con spacco al a destra
        //this.CreatePlatform(0.29, 2.3, 1.8, this.y_piattaforme) //left 
        //this.CreatePlatform(0.73, 0.7, 1.8, this.y_piattaforme) //right
        //this.y_piattaforme -= gameSettings.gameHeight / 1.3

        this.player = new Player(
            this,
            1000,
            gameSettings.gameHeight * 5,
            TextureKeys.Texture.player,
        )
        //this.add.existing(this.player);



        this.physics.world.addCollider(this.platforms, this.player)
        this.physics.world.addCollider(this.platforms, this.enemy)
        this.physics.world.addCollider(this.platforms_senzacollider, this.enemy)
        this.physics.world.addCollider(this.player, this.enemy, () => {
            //this.hp_enemy -= 1;
            if (this.hp_enemy === 0) {
                this.enemy.destroy(true)
                this.nemico_distrutto = true
            }
        })
        this.camera.startFollow(this.player, true, 1, 1);
        this.physics.world.addCollider(this.player, this.platforms_senzacollider)
        this.physics.world.addCollider(this.player, this.platforms)
        this.player.setCollisionCategory(3)
        this.player.setCollidesWith(3)
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
    startWalk(walk: boolean) { walk ? this.player.play("walk") : this.player.play("idle") }

    update(time: number, delta: number): void {
        this.player.HandleMovement(this.A, this.SHIFT, this.D)
        this.player.HandleAttack(this.E, this.X, this.S, this.LEFT, this.RIGHT, this.UP, this.DOWN);
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
