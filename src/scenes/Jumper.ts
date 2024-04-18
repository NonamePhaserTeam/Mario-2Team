import Phaser, { Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import {Player, Enemy, Bullets} from "../game/components";
import AnimationKeys from "../consts/AnimationKeys";

export default class Jumper extends Phaser.Scene {
    /* ---------- SCENA ---------- */
    player: Player;
	enemy: Enemy;
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
    /* ---------- MOVEMENT ---------- */

	/* ---------- ATTACK ---------- */
	ENTER: Phaser.Input.Keyboard.Key; //PUNCH
    X: Phaser.Input.Keyboard.Key; //PICCHIATA
	LEFT: Phaser.Input.Keyboard.Key; //FIONDA sinistra
    RIGHT: Phaser.Input.Keyboard.Key; //FIONDA destra
    UP: Phaser.Input.Keyboard.Key; //FIONDA sopra
    DOWN: Phaser.Input.Keyboard.Key;
	/* ---------- ATTACK ---------- */

    worldBounds = {
        width: gameSettings.gameWidth,
        height: gameSettings.gameHeight * 3,
    }


    y_piattaforme = gameSettings.gameHeight * 5 - 40

    constructor() { super(SceneKeys.Jumper); }
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

		console.log("create jumper")

		const map = this.make.tilemap({ key: "map" });

		const tileset = map.addTilesetImage("mappa1", "tiles");

		const floor = map.createLayer("pavimento", tileset, 0, 0);
		// console.log(belowLayer.width) 
		const wall = map.createLayer("muro", tileset, 0, 0);

		const portal = this.physics.add.sprite(0, 0, TextureKeys.portale);
		portal.play(AnimationKeys.Portale.Opening, true);

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
               /*  case 3, 8: // due piattaforme con spacco al centro
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
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3 */
            }
        }
		this.player = new Player(
			this,
			this.platforms.getChildren()[0].body.position.x + 100, 
			this.platforms.getChildren()[0].body.position.y - 60,
			TextureKeys.player,
		)
        this.add.existing(this.player)

		this.enemy = new Enemy(
		    this,
		    0,
		    0,
            100,
            50,
		    TextureKeys.SkeletonEnemy,
		    AnimationKeys.SkeletonEnemy
		);
		this.add.existing(this.enemy);
        
        this.camera.startFollow(this.player, true, 1, 1);
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.player, this.enemy);
		this.physics.add.collider(this.platforms, this.enemy);

	}
    // todo wall climbing, wall sliding 

    CreatePlatform(x_axis: number, scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * x_axis,
            this.y_piattaforme,
            'platform'
        ).setScale(scala_immagine, 1).body.updateFromGameObject();
	}

    update(time: number, delta: number): void {
		this.player.HandleMovement(this.A, this.SHIFT, this.D)
        this.player.HandleAttack(this.ENTER, this.X, this.S, this.LEFT, this.RIGHT, this.UP, this.DOWN);

        // /* CLIMBING STUFF */
        // if (this.touchingRight || this.touchingLeft) {
        //     this.player.setGravityY(gameSettings.gravity.y / 4)
        //     if (this.W.isDown) {
        //         this.player.setVelocityY(-this.playerSpeed/4);
        //     }
        //     else if (this.S.isDown) {
        //         this.player.setVelocityY(this.playerSpeed/4);
        //     }
        // }
        // /* CLIMBING STUFF */
    }
}
