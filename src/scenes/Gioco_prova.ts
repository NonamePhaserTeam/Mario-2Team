import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    camera: Phaser.Cameras.Scene2D.Camera;
    collider_plat_player: Phaser.Physics.Arcade.Collider
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    SHIFT: Phaser.Input.Keyboard.Key;
    playerSpeed = 500;
    y_piattaforme = gameSettings.gameHeight * 5 - 40
    direzione_player: boolean = false;
    constructor() { super(SceneKeys.Game); }
    init() {

        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, false);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, false);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, false);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, false);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);
        this.SHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT, true, false);


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
                gameSettings.gameWidth * 0.90,
                gameSettings.gameHeight * 5 - 70,
                TextureKeys.player
            )
            .setBounce(1, 1)
            .setCollideWorldBounds(true)
            .setDrag(0.2, 0.2)
            .setGravity(
                gameSettings.gravity.x,
                gameSettings.gravity.y,
            )
            .setScale(1);

        this.camera.startFollow(this.player, true, 1, 1);
        this.collider_plat_player = this.physics.add.collider(this.player, this.platforms)
        this.collider_plat_player.active = true;
    }

    // todo wall climbing, wall sliding 

    Wallthings() {
        if (this.player.body.touching.left || this.player.body.touching.right) {
            this.player.setGravityY(gameSettings.gravity.y / 4)
            if (this.W.isDown) {
                this.player.setVelocityY(-this.playerSpeed);
            }
            else if (this.S.isDown) {
                this.player.setVelocityY(this.playerSpeed);
            }

            if (Phaser.Input.Keyboard.JustDown(this.SPACE) && this.player.body.touching.left) {
                this.player.setVelocityY(-500);
                this.player.setVelocityX(500);
            }
        }

        if (!this.player.body.touching.left || !this.player.body.touching.right) {
            this.player.setGravityY(gameSettings.gravity.y)
        }

    }

    CreatePlatform(x_axis: number, scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * x_axis,
            this.y_piattaforme,
            'platform'
        ).setScale(scala_immagine, 1).body.updateFromGameObject();
    }


    update(time: number, delta: number): void {
        this.player.setVelocity(0);
        if (this.A.isDown && !this.player.body.touching.left) {
            console.log("non sta toccando a sinistra ")
            this.player.setVelocityX(-this.playerSpeed);
            this.direzione_player = false;
        }
        else if (this.D.isDown && !this.player.body.touching.right) {
            this.player.setVelocityX(this.playerSpeed);
            this.direzione_player = true;
            console.log("non sta toccando a destra ")
        }

        if (this.player.body.touching.left) {
            this.direzione_player = true;
            console.log("sta toccando a sinistra ")
        }
        else if (this.player.body.touching.right) {
            this.direzione_player = false;
            console.log("sta toccando a destra ")
        }

        if (this.W.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        }
        else if (this.S.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        }

        if (Phaser.Input.Keyboard.JustDown(this.SPACE) && this.player.body.touching.down) {
            this.player.setVelocityY(-1000);
        }

        if (this.SHIFT.isDown && !this.direzione_player) {
            this.player.setVelocityX(-5000);
        }
        if (this.SHIFT.isDown && this.direzione_player) {
            this.player.setVelocityX(5000);
        }

        if (this.player.body.y <= gameSettings.gameHeight) {
            this.player.setY(
                gameSettings.gameHeight * 5 - 70,
            )
        }
    }
}
