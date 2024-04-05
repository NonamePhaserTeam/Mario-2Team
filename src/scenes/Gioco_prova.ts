import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import AlignGrid from "../utilities/alignGrid";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    platforms: Phaser.Physics.Arcade.Group;
    camera: Phaser.Cameras.Scene2D.Camera;
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    playerSpeed = 250;
    y_piattaforme = gameSettings.gameHeight * 5 - 40
	aGrid: AlignGrid;
	touchingDown: boolean = false;
	worldBounds = {
		width: gameSettings.gameWidth,
		height: gameSettings.gameHeight * 3,
	}

	constructor() { super(SceneKeys.Game); }

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
        /* for (let i = 0; i < 10; i++) {
            switch (i) {
                case 1, 6: // piattaforma singola
                    this.CreatePlatform(0.5, 3)
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 2, 7: //  piafforma centrale 2 mini mini piattaforme al lato
                    this.CreatePlatform(0.29, 0.5)  //left 
                    this.CreatePlatform(0.5, 1)  //middle 
                    this.CreatePlatform(0.73, 0.5)  //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 3, 8: // due piattaforme con spacco al centro
                    this.CreatePlatform(0.29, 1) //left
                    this.CreatePlatform(0.73, 1) //right
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 4, 9: // due piattaforme con spacco al a sinistra
                    this.CreatePlatform(0.29, 0.8) //left
                    this.CreatePlatform(0.73, 2.5) //right
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 5, 10: // due piattaforme con spacco al a destra
                    this.CreatePlatform(0.29, 2.5) //left
                    this.CreatePlatform(0.73, 0.8) //right
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
            }
        } */

        this.player = this.physics.add
            .sprite(
                0,
                0,
                TextureKeys.player,
            )
            .setCollideWorldBounds(true)
            .setScale(1.2);

		this.aGrid.placeAtIndex(120, this.player);
		
		this.CreateAnims();

		this.player.play("idle");
	
        this.camera.startFollow(this.player, true);
        this.physics.add.collider(this.player, this.platforms);
    }

	CreateAnims() {
		this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames(TextureKeys.player, {
                start: 5,
                end: 12,
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
				start: 0,
				end: 4,
				zeroPad: 1,
				prefix: 'fermo',
				suffix: '.png'
			}),
			frameRate: 10,
			repeat: -1,
		});
	}

    CreatePlatform(x_axis: number, scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * x_axis,
            this.y_piattaforme,
            'platform'
        ).setScale(scala_immagine, 1).body.updateFromGameObject();
    }

	startWalk(walk: boolean) {
		this.player.anims.stop();
		walk ? this.player.play("walk") : this.player.play("idle")
	}

    update(time: number, delta: number): void {
        this.player.setVelocity(0);
		// this.startWalk(false);

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
		if (Phaser.Input.Keyboard.JustDown(this.SPACE) && (this.player.body.touching.down || this.player.body.blocked.down)) {
			this.player.setVelocityY(-gameSettings.gravity.y)
		}

		if((this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0)) {
			if(this.player.anims.currentAnim.key === "idle") {
				this.player.anims.stop();
				this.player.play("walk")
			}
		}
		else if(this.player.anims.currentAnim.key === "walk") {
			this.player.anims.stop();
			this.player.play("idle")
		}

		this.player.body.velocity.normalize().scale(this.playerSpeed);
    }
}
