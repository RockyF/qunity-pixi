/**
 * Created by rockyl on 2020-03-08.
 */

import PIXI from 'pixi.js'
import {traverse} from "./utils";
import {Application, IEntity, IComponent, Component as QComponent} from 'qunity'
import {EntityAdaptor} from "./EntityAdaptor";
import {getRes, loadResource} from "./res";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
	type = "canvas";
}

PIXI.utils.sayHello(type);

let app: Application;

export function launchApp(): Application {
	app = new Application();
	app.registerEntityDefs({
		sprite: PIXI.Sprite,
	});

	let pixiApp = new PIXI.Application({
		resizeTo: window,
	});
	pixiApp.renderer.view.style.position = "absolute";
	pixiApp.renderer.view.style.display = "block";

	document.body.appendChild(pixiApp.view);

	let mainLoop = app.setupAdaptor({
		stage: pixiApp.stage,
		EntityAdaptor,
		traverseFunc: traverse,
		loadResourceFunc: loadResource,
		getResFunc: getRes,
	});
	pixiApp.ticker.add(mainLoop);

	return app;
}

export interface IPixiEntity extends PIXI.DisplayObject, IEntity {

}

export function createEntity(type: string): IPixiEntity {
	return <IPixiEntity>app.createEntity(type);
}

export class Component extends QComponent implements IComponent {
	get entity(): IPixiEntity {
		return <IPixiEntity>this.entityAdaptor.entity;
	}
}
