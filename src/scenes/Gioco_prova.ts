import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    camera: Phaser.Cameras.Scene2D.Camera;
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    playerSpeed = 500;
    y_piattaforme = gameSettings.gameHeight * 5 - 40
    constructor() { super(SceneKeys.Game); }
    init() {
        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, false);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, false);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, false);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, false);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);
        //this.add.image(gameSettings.gameWidth * 0.5, gameSettings.gameHeight, "tilemap").setScale(3);
        this.camera = this.cameras.main;
        this.camera.setBounds(
            0,
            0,
            gameSettings.gameWidth / 4,
            gameSettings.gameHeight * 5,
            true
        );
        this.physics.world.setBounds(
            gameSettings.gameWidth * 0.25,
            0,
            gameSettings.gameWidth / 2,
            gameSettings.gameHeight * 5,
        );
    }

    create() {
        this.camera.setBackgroundColor(gameSettings.bgColor); //blu
        this.platforms = this.physics.add.staticGroup();
        this.CreatePlatform(
            0.5,
            3
        ) //3.5
        this.y_piattaforme -= gameSettings.gameHeight / 1.3
        for (let i = 0; i < 10; i++) {
            let k = Math.floor(Math.random() * (10 - 2 + 1)) + 1
            //0 + Math.floor(Math.random() * ((( - 0) / 0.01) + 1)) * 0.01,
            switch (k) {
                case 2, 7: //piafforma centrale 2 mini mini piattaforme al lato
                    this.CreatePlatform(0.29, 0.5)  //left 
                    this.CreatePlatform(0.5, 1)  //middle distanza 0.5
                    this.CreatePlatform(0.73, 0.5)  //right 

                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 3, 8: // due piattaforme con spacco al centro
                    this.CreatePlatform(
                        0.29,
                        1
                    ) //left 
                    this.CreatePlatform(
                        0.73,
                        1
                    ) //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 4, 9: // due piattaforme con spacco al a sinistra
                    this.CreatePlatform(
                        0.29,
                        0.7
                    ) //left 
                    this.CreatePlatform(
                        0.73,
                        2.3
                    ) //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 5, 10: // due piattaforme con spacco al a destra
                    this.CreatePlatform(
                        0.29,
                        2.3
                    ) //left 
                    this.CreatePlatform(
                        0.73,
                        0.7
                    ) //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
            }
        }

        this.player = this.physics.add
            .sprite(
                gameSettings.gameWidth * 0.90,
                gameSettings.gameHeight * 5 - 70,
                TextureKeys.player
            )
            .setBounce(1, 1)
            .setCollideWorldBounds(true)
            .setDrag(0.2, 0.2)
            .setGravity(
                gameSettings.gravity.x,
                gameSettings.gravity.y
            )
            .setScale(0.2);

        this.camera.startFollow(this.player, true, 1, 1);
    }


    CreatePlatform(x_axis: number, scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * x_axis,
            this.y_piattaforme,
            'platform'
        ).setScale(scala_immagine, 1).body.updateFromGameObject();
		// this.physics.add.overlap(this.player, this.platforms, () => {
		// 	if (this.player.body.velocity.y >= 0) this.physics.add.collider(this.player, this.platforms)
		// })
    }


    update(time: number, delta: number): void {
        this.player.setVelocity(0);
        if (this.player.body.y <= gameSettings.gameHeight) {
            this.player.setY(gameSettings.gameHeight * 5 - 70,)
        }
        if (this.A.isDown) {
            this.player.setFlipX(true); this.player.setVelocityX(-this.playerSpeed);
        } else if (this.D.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(this.playerSpeed);
        }
        if (this.W.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        } else if (this.S.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        }
        if (Phaser.Input.Keyboard.JustDown(this.SPACE) && this.player.body.touching.down) {
            this.player.setVelocityY(-1000);
        }
    }
}