import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import AlignGrid from "../utilities/alignGrid";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Jumper extends Phaser.Scene {
   
	/* ---------- SCENA ---------- */
	player: Phaser.Physics.Arcade.Sprite;
    platforms: Phaser.Physics.Arcade.Group;
    camera: Phaser.Cameras.Scene2D.Camera;
	aGrid: AlignGrid;
	/* ---------- SCENA ---------- */
	
	/* ---------- MOVEMENT ---------- */
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    playerSpeed = 250;
	/* ---------- MOVEMENT ---------- */
	
	/* -------- FLAGS ---------- */
	touchingDown: boolean = true;
	loadingJump: boolean = false;
	isMoving: boolean = false;
	isJumping: boolean = false;
	/* -------- FLAGS ---------- */
	
	worldBounds = {
		width: gameSettings.gameWidth,
		height: gameSettings.gameHeight * 3,
	}

	constructor() { super(SceneKeys.Jumper); }

    init() {
        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //this.add.image(gameSettings.gameWidth * 0.5, gameSettings.gameHeight, "tilemap").setScale(3);
        this.camera = this.cameras.main;
        this.camera.setBounds(
            0,
            0,
            this.worldBounds.width,
            this.worldBounds.height,
        );
        this.physics.world.setBounds(
            0,
            0,
			this.worldBounds.width,
            this.worldBounds.height,
        ); 
    }

    create() {

		/* this.cameras.main.setZoom(.4);
		this.cameras.main.centerOn(0, 0);

		this.input.on('pointerdown', () => {
			this.camera = this.cameras.main;
			this.camera.pan(500, 500, 2000, 'Power2');
			this.camera.zoomTo(4, 3000);
		}); */

		this.aGrid = new AlignGrid({
			scene: this,
			rows: 22,
			cols: 11,
			width: this.worldBounds.width,
			height: this.worldBounds.height,
		});
		// this.aGrid.showNumbers();

        this.platforms = this.physics.add.group();
		this.loopPlatforms(this.platforms)
		console.log(this.platforms.getChildren()[0].body.position.x, this.platforms.getChildren()[0].body.position.y);
        this.player = this.physics.add
            .sprite(
                this.platforms.getChildren()[0].body.position.x + 100,
                this.platforms.getChildren()[0].body.position.y - 60,
                TextureKeys.player,
            )
            .setCollideWorldBounds(true)
			.setScale(1.4);
				
		// this.aGrid.placeAtIndex(236, this.player);
		
		this.CreateAnims();

		this.player.play("idle");

		this.SPACE.on("down", () => {
			// console.log("down")
			this.loadingJump = true;
		});
		this.SPACE.on("up", () => {
			// console.log("released")
			this.SPACE.enabled = false;
			this.loadingJump = false;
			this.isJumping = true;
			setTimeout(() => {
				this.isJumping = false;
			}, 1000)
		});
		
		this.camera.startFollow(this.player, true);
		this.physics.add.collider(this.player, this.platforms);
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
	}

	private loopPlatforms(parent: Phaser.Physics.Arcade.Group) {
		let index = 236;
		console.log("ada");
		this.generatePlatform(index, parent);
		/* for(var i = this.aGrid.config.rows; i > this.aGrid.config.rows / 2; i--) {
			console.log(i)
			index += (-2 + Math.random() * (2 - (-2)) - 22);
			this.generatePlatform(index, parent);
		} */
	}

	private generatePlatform(index: number, parent: Phaser.Physics.Arcade.Group): void {
		let platform = this.physics.add
			.sprite(
				0,
				0,
				TextureKeys.platform,
			)
		// platform.setBodySize()
		// platform.setFlipY(true)
		parent.add(platform)
		this.aGrid.placeAtIndex(index, platform);
		platform.body.updateFromGameObject();
		
		platform.setImmovable();
		index !== 236 ? platform.setScale(1 + Math.random() * (2 - 1)) : platform.setScale(1.4);
		platform.body.setAllowGravity(false)
	}

	startWalk(walk: boolean) {
		walk ? this.player.play("walk") : this.player.play("idle")
	}

    update(time: number, delta: number): void {
        this.player.setVelocity(0);

		this.isMoving = this.A.isDown || this.D.isDown || this.S.isDown || this.W.isDown;
		this.touchingDown = this.player.body.touching.down || this.player.body.blocked.down;
		// console.log("touching: " + this.touchingDown);


        if (this.A.isDown) {
            this.player.setFlipX(true);
			this.player.setVelocityX(-this.playerSpeed);
        } else if (this.D.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(this.playerSpeed);
        }
		if (this.W.isDown) {
			this.player.setVelocityY(-this.playerSpeed);
		}
		else if (this.S.isDown) {
			this.player.setVelocityY(this.playerSpeed);
		}
		
		if(this.isJumping) {
			this.player.setVelocityY(-this.playerSpeed * 500);
			if(this.player.anims.currentAnim.key !== "doJump") {
				this.player.play("doJump");
			}
		}

		// console.log(this.player.anims.isPlaying)

		if(this.touchingDown) {
			this.SPACE.enabled = true;
			if(this.loadingJump) {
				if(this.player.anims.currentAnim.key !== "loadJump") {
					this.player.play("loadJump");
				}
			} else if(this.isMoving) {
				if(this.player.anims.currentAnim.key !== "walk")
					this.startWalk(true);
			}
			else if(this.player.anims.currentAnim.key !== "idle") {
					this.startWalk(false);
			}	

		} else if(!this.player.anims.isPlaying) {
			this.player.setFrame("jump6.png");
		}
		
		

		/* if (this.isJumping) {
			if(this.player.anims.currentAnim.key !== "loadJump" && !this.spaceBarReleased) {
				this.player.anims.stop()
				this.player.play("loadJump");	
			}
			if(this.spaceBarReleased ) {
				this.player.setVelocityY(-this.playerSpeed * 5);
				if(this.player.anims.currentAnim.key !== "doJump") {
					this.player.play("doJump");
				}
			} 
		}
		else if(!this.isJumping) {
			if((this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) ) {
				if(this.player.anims.currentAnim.key === "idle" || (this.player.anims.currentAnim.key === "loadJump" || this.player.anims.currentAnim.key === "doJump")) {
					this.startWalk(true);
				}
			}
			else if(this.player.anims.currentAnim.key === "walk" || (this.player.anims.currentAnim.key === "loadJump" || this.player.anims.currentAnim.key === "doJump")) {
				this.startWalk(false);
			}
		} */




		this.player.body.velocity.normalize().scale(this.playerSpeed);
    }
}
