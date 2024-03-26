import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    platform: Phaser.Physics.Arcade.StaticGroup;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    camera: Phaser.Cameras.Scene2D.Camera;
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    playerSpeed = 500;
    x_prova = 0
    y_prova = gameSettings.gameHeight * 5 - 70
    //background: capire quale namespace usare
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
            this.game.canvas.width / 4,
            this.game.canvas.height * 5,
            true
        );
        this.physics.world.setBounds(
            gameSettings.gameWidth * 0.25,
            0,
            this.game.canvas.width / 2,
            this.game.canvas.height * 5
        );
    }

    create() {
        this.cameras.main.setBackgroundColor(gameSettings.bgColor); //blu
        this.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 12; i++) {
            switch (i) {
                case 1,4,7,10: // piattaforma singola
                    this.CreatePlatform(0.5,2) 
                case 2,5,8,11: //  piafforma centrale 2 mini mini piattaforme al lato
                    this.CreatePlatform(0.3,0.4),  //left 
                    this.CreatePlatform(0.5,0.75),  //middle 
                    this.CreatePlatform(0.7,0.4)  //right 
                case 3,6,9,12: // due piattaforme con spacco al centro
                    this.CreatePlatform(0.3,0.8), //left
                    this.CreatePlatform(0.7,0.8) //right
            }
        }
        this.player = this.physics.add
            .sprite(gameSettings.gameWidth * 0.90, gameSettings.gameHeight * 5 - 70, TextureKeys.player)
            .setBounce(1, 1)
            .setCollideWorldBounds(true)
            .setDrag(0.2, 0.2)
            .setGravity(gameSettings.gravity.x, gameSettings.gravity.y)
            .setScale(0.5);

        this.camera.startFollow(this.player, true, 1, 1);
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.platforms);
    }

    CreatePlatform(x_axis: number,scala_immagine: number) {
        this.platforms.create(
            gameSettings.gameWidth * x_axis,
            this.y_prova,
            'platform'
        ).setScale(scala_immagine)
        .body.updateFromGameObject();
        this.y_prova -= gameSettings.gameHeight /1.3
    }
    update(time: number, delta: number): void {
        this.player.setVelocity(0);
        if (this.player.body.y <= gameSettings.gameHeight) {
            this.player.setY(gameSettings.gameHeight * 10 - 70,)
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
            this.player.setVelocityY(-100000);
        }
    }
}
