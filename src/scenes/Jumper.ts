import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import AlignGrid from "../utilities/alignGrid";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Jumper extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    platforms: Phaser.Physics.Arcade.Group;
    camera: Phaser.Cameras.Scene2D.Camera;
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    playerSpeed = 250;
    // y_piattaforme = gameSettings.gameHeight * 5 - 40
	aGrid: AlignGrid;
	touchingDown: boolean = false;
	isJumping: boolean = false;
	spaceBarReleased: boolean = false;
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
		
		this.aGrid = new AlignGrid({
			scene: this,
			rows: 11,
			cols: 11,
			width: this.worldBounds.width,
			height: this.worldBounds.height,
		});
		this.aGrid.show();

        this.platforms = this.physics.add.group();
        this.player = this.physics.add
            .sprite(
                0,
                0,
                TextureKeys.player,
            )
            .setCollideWorldBounds(true)
            .setScale(1.4);

		this.aGrid.placeAtIndex(120, this.player);
		
		this.CreateAnims();

		this.player.play("idle");
	
        this.camera.startFollow(this.player, true);
        this.physics.add.collider(this.player, this.platforms);

		this.SPACE.on("down", () => {
			console.log("down")
			this.isJumping = true
		});
		this.SPACE.on("up", () => {
			console.log("released")
			this.spaceBarReleased = true;
			setTimeout(() => {
				this.isJumping = false;
				this.spaceBarReleased = false;
			}, 500);
		});
		

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
				end: 8,
				zeroPad: 1,
				prefix: 'jump',
				suffix: '.png'
			}),
			frameRate: 6,
			repeat: 0,
		});
	}

    /* CreatePlatform(x_axis: number, scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * x_axis,
            this.y_piattaforme,
            'platform'
        ).setScale(scala_immagine, 1).body.updateFromGameObject();
    } */

	startWalk(walk: boolean) {
		this.player.anims.stop();
		walk ? this.player.play("walk") : this.player.play("idle")
	}

    update(time: number, delta: number): void {
        this.player.setVelocity(0);

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
		if (this.isJumping || (this.player.body.touching.down || this.player.body.blocked.down)) {
			console.log(this.player.anims.currentAnim.key);
			if(this.player.anims.currentAnim.key !== "loadJump" && !this.spaceBarReleased) {
				this.player.anims.stop()
				this.player.play("loadJump");	
			}
			if(this.spaceBarReleased) {
				this.player.setVelocityY(-this.playerSpeed)
				if(this.player.anims.currentAnim.key !== "doJump") {
					console.log("doJump");
					this.player.play("doJump");
				}
			} 
			
		}

		if(!this.isJumping) {
			if((this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) ) {
				// console.log(this.player.anims.currentAnim.key)
				if(this.player.anims.currentAnim.key === "idle" || (this.player.anims.currentAnim.key === "loadJump" || this.player.anims.currentAnim.key === "doJump")) {
					this.startWalk(true);
				}
			}
			else if(this.player.anims.currentAnim.key === "walk" || (this.player.anims.currentAnim.key === "loadJump" || this.player.anims.currentAnim.key === "doJump")) {
				this.startWalk(false);
			}
		}

		this.player.body.velocity.normalize().scale(this.playerSpeed);
    }
}
