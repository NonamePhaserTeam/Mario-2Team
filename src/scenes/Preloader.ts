import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        // preload di tutti gli asset

        //this.load.image(TextureKeys.Logo, 'assets/images/logo.jpg')

		//this.load.image(TextureKeys.tilemap, 'assets/images/tilemap.png')

	    this.load.atlas(TextureKeys.player, 'assets/spritesheets/player/player.png', 'assets/spritesheets/player/player.json');
	    this.load.atlas(TextureKeys.platform, 'assets/images/platform.png', 'assets/images/platform.json');
	    this.load.atlas(TextureKeys.SkeletonEnemy, 'assets/spritesheets/skeleton/skeleton.png', 'assets/spritesheets/skeleton/skeleton.json');
        this.load.atlas(TextureKeys.boss, 'assets/spritesheets/boss.png', '../assets/spritesheets/boss.json');
        this.load.atlas(TextureKeys.boss, 'assets/spritesheets/portal/portali.png', '../assets/spritesheets/portal/portali.json');
	    // this.load.atlas(TextureKeys.fionda, 'assets/spritesheets/fionda.png', '../assets/spritesheets/fionda.json');
    }
	
    create() {
		// creazione di tutte le animazioni
		this.CreatePlayerAnims();
		this.CreateEnemiesAnims();

		this.scene.stop(SceneKeys.Preloader);
        // this.scene.start(SceneKeys.Game);
		this.scene.start(SceneKeys.Jumper)

    }

	CreatePlayerAnims() {
        this.anims.create({
            key: AnimationKeys.Player.Walk,
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
            key: AnimationKeys.Player.Idle,
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
            key: AnimationKeys.Player.Jump,
            frames: this.anims.generateFrameNames(TextureKeys.player, {
                start: 4,
                end: 6,
                zeroPad: 1,
                prefix: 'jump',
                suffix: '.png'
            }),
			frameRate: 8,
            repeat: 0,
        });

		this.anims.create({
			key: AnimationKeys.Player.Punch,
			frames: this.anims.generateFrameNames(TextureKeys.player, {
				start: 1,
				end: 12,
				zeroPad: 1,
				prefix: 'fight',
				suffix: '.png'
			}),
			frameRate: 15,
			repeat: 0,
		});

        /* this.anims.create({
            key: AnimationKeys.Player.fionda,
            frames: this.anims.generateFrameNames(
                TextureKeys.fionda,
                {
                    start: 2,
                    end: 3,
                    zeroPad: 1,
                    prefix: 'sparo fionda',
                    suffix: '.png'
                }
            ),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "loadfionda" ,
            frames: this.anims.generateFrameNames(
                TextureKeys.fionda,
                {
                    start: 2,
                    end: 2,
                    zeroPad: 0,
                    prefix: 'sparo fionda',
                    suffix: '.png'
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "sparofionda" ,
            frames: this.anims.generateFrameNames(
                TextureKeys.fionda,
                {
                    start: 3,
                    end: 3,
                    zeroPad: 0,
                    prefix: 'sparo fionda',
                    suffix: '.png'
                }
            ),
            frameRate: 8,
            repeat: -1
        }); */
    }

	CreateEnemiesAnims() {
		this.anims.create({
			key: AnimationKeys.SkeletonEnemy.Idle,
			frames: this.anims.generateFrameNames(TextureKeys.SkeletonEnemy, {
				start: 1,
				end: 4,
				zeroPad: 1,
				prefix: 'skeleton-idle',
				suffix: '.png',
			}),
			frameRate: 6,
			repeat: -1,
		});

		this.anims.create({
			key: AnimationKeys.SkeletonEnemy.Walk,
			frames: this.anims.generateFrameNames(TextureKeys.SkeletonEnemy, {
				start: 1,
				end: 8,
				zeroPad: 1,
				prefix: 'skeleton-walk',
				suffix: '.png',
			}),
			frameRate: 6,
			repeat: -1,
		});

	}
}
