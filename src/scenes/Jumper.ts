import { globalEval } from 'jquery'
import Phaser from 'phaser'

import { gameSettings } from '../consts/GameSettings'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Game)
	}

    create()
    {
        this.add.image(gameSettings.gameWidth / 2, gameSettings.gameHeight / 2, TextureKeys.tilemap)
    }
}