import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
    /* ---------- SCENA ---------- */
    player: Phaser.Physics.Arcade.Sprite;
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
	ENTER: Phaser.Input.Keyboard.Key; //combat
    X: Phaser.Input.Keyboard.Key; // cade in picchiata
    playerSpeed = 500;
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
	activeDash = false;
    /* -------- FLAGS ---------- */

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
            .sprite(
                this.platforms.getChildren()[0].body.position.x + 100,
                this.platforms.getChildren()[0].body.position.y - 60,
                TextureKeys.player
            )
            .setCollideWorldBounds(true)
            .setScale(1.5);

        this.CreateAnims();

        this.player.play("idle");

        this.SPACE.on("down", () => {
            this.loadingJump = true;
        });

        this.SPACE.on("up", () => {
            this.SPACE.enabled = false;
            this.loadingJump = false;
            this.isJumping = true;
            setTimeout(() => {
                this.isJumping = false;
            }, 1000)
        });

        this.camera.startFollow(this.player, true, 1, 1);
	//	this.physics.add.collider(this.player, this.platforms, () => {
	//		const playerBounds = this.player.getBounds();
	//		const platformBounds = this.platforms.getChildren.getBounds();
	//	
	//		if (playerBounds.bottom <= platformBounds.top) {
	//			// Disattiva la collisione dalla parte inferiore del player
	//			player.body.checkCollision.none = true;
	//		}
	//	});
    }

    CreateAnims() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames(TextureKeys.player, {
                start: 1,
                end: 8,
                zeroPad: 1,
                prefix: 'walk',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames(TextureKeys.player, {
                start: 1,
                end: 5,
                zeroPad: 1,
                prefix: 'fermo',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'loadJump',
            frames: this.anims.generateFrameNames(TextureKeys.player, {
                start: 1,
                end: 3,
                zeroPad: 1,
                prefix: 'jump',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: 0,
        });

        this.anims.create({
            key: 'doJump',
            frames: this.anims.generateFrameNames(TextureKeys.player, {
                start: 4,
                end: 6,
                zeroPad: 1,
                prefix: 'jump',
                suffix: '.png'
            }),
            frameRate: 4,
            repeat: 0,
        });

		const fight = this.anims.create({
			key: 'fight',
			frames: this.anims.generateFrameNames(TextureKeys.player, {
				start: 1,
				end: 12,
				zeroPad: 1,
				prefix: 'fight',
				suffix: '.png'
			}),
			frameRate: 6,
			repeat: 0,
		});
		this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			// console.log("sono a")
		})
    }

    // todo wall climbing, wall sliding 

    CreatePlatform(x_axis: number, scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * x_axis,
            this.y_piattaforme,
            'platform'
        ).setScale(scala_immagine, 1).body.updateFromGameObject();
    }

    startWalk(walk: boolean) {
		walk ? this.player.play("walk") : this.player.play("idle")
    }

	resetFlags(touching: boolean, blocked: boolean): boolean {
		if(touching || blocked) return true;
		else setTimeout(() => {
			return false;
		}, 1000); 
	}

	/* checkTimeSinceKeyPress(lastKeyPressTime: number, timeDelay: number): boolean { 
		const currentTime = this.time.now;
		const timeSinceKeyPress = currentTime - lastKeyPressTime; 
		// console.log(lastKeyPressTime, c	urrentTime)
		// Logga il tempo trascorso dal click del tasto
		console.log('Tempo trascorso dal click del tasto:', timeSinceKeyPress);
		if(timeSinceKeyPress >= timeDelay) {
			this.lastKeyPressTime = 0;
			return true 
		}
		else
			return false; 
	} */

    update(time: number, delta: number): void {
        this.player.setVelocity(0);

        this.isMoving = this.A.isDown || this.D.isDown;
        this.touchingDown = this.resetFlags(this.player.body.touching.down, this.player.body.blocked.down);
        this.touchingUp = this.resetFlags(this.player.body.touching.up, this.player.body.blocked.up);
        this.touchingRight = this.resetFlags(this.player.body.touching.right,  this.player.body.blocked.right);
        this.touchingLeft = this.resetFlags(this.player.body.touching.left, this.player.body.blocked.left);
        // this.touching = this.touchingUp && this.touchingDown && this.touchingLeft && this.touchingRight
		
		if(this.SHIFT.isDown && this.SHIFT.enabled) {
			// Memorizza il tempo del click del tasto
			this.activeDash = true;
			this.SHIFT.enabled = false;
			setTimeout(() => {
				this.SHIFT.enabled = true;
			}, 5000);
			setTimeout(() => {
				this.activeDash = false;
			}, 200);
			// console.log(this.lastKeyPressTime);
		}

		console.log(this.activeDash);

        /* MOVIMENTI ORIZZONTALI */
        if (this.A.isDown && !this.touchingLeft) {
			this.player.setFlipX(true);
            this.player.setVelocityX(-this.playerSpeed);
			if (this.activeDash && this.touchingDown) {this.player.setVelocityX(-this.playerSpeed*25)}
        }
		else if (this.D.isDown && !this.touchingRight) {
			this.player.setFlipX(false);
			this.player.setVelocityX(this.playerSpeed);
			if (this.activeDash && this.touchingDown) {this.player.setVelocityX(this.playerSpeed*5)}
		}

        /* MOVIMENTI ORIZZONTALI */

		/* COLPO IN PICCHIATA */
		if(!this.touchingDown) {
			// this.player.setFrame("jump6.png")
			if(this.X.isDown) {
				this.isJumping = false;
				this.player.setVelocityY(this.playerSpeed * 20);
			}
		}
        /* COLPO IN PICCHIATA */
        
        /* JUMP STUFF */
        if (this.isJumping && !this.X.isDown) {
            this.player.setVelocityY(-this.playerSpeed*2);
            if (this.player.anims.currentAnim.key !== "doJump") {this.player.play("doJump");}
        }
        else if (this.touchingDown || this.touchingLeft || this.touchingRight) {
			this.SPACE.enabled = true;
            if (this.loadingJump) {
				if (this.player.anims.currentAnim.key !== "loadJump" && this.player.anims.isPlaying) {this.player.play("loadJump");}
            } else if (this.isMoving) {
				if (this.player.anims.currentAnim.key !== "walk" && this.touchingDown) this.startWalk(true);
            }
            else if (this.player.anims.currentAnim.key !== "idle" && this.touchingDown) {this.startWalk(false);}
			
        } else{
			this.SPACE.enabled = false;
			if (!this.player.anims.isPlaying) {this.player.setFrame("jump6.png");}
		} 
		/* JUMP STUFF */

		/* COMBAT STUFF */
		if(this.ENTER.isDown) {
			if(this.player.anims.currentAnim.key !== "fight") this.player.play("fight");
		}
		/*  */

        /* CLIMBING STUFF */
        if (this.touchingRight || this.touchingLeft) {
            this.player.setGravityY(gameSettings.gravity.y / 4)
            if (this.W.isDown) {
                this.player.setVelocityY(-this.playerSpeed/4);
            }
            else if (this.S.isDown) {
                this.player.setVelocityY(this.playerSpeed/4);
            }
        }
        /* CLIMBING STUFF */
    }
}
