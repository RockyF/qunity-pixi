/**
 * Created by rockyl on 2020-03-08.
 */

import PIXI from 'pixi.js'
import {bubbling, traverse} from "./utils";
import {Application, IEntity, Component as QComponent} from 'qunity'
import {EntityAdaptor} from "./EntityAdaptor";
import {getRes, loadResource} from "./res";
import {protocols} from "./protocols";
import {entityProps} from "./entity-props";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
	type = "canvas";
}

PIXI.utils.sayHello(type);

let app: Application;

export function createApp(): Application {

	app = new Application();
	app.registerEntityDefs(entityProps);

	let pixiApp = new PIXI.Application({
		antialias: true,
		resizeTo: window,
	});
	pixiApp.renderer.view.style.position = "absolute";
	pixiApp.renderer.view.style.display = "block";

	document.body.appendChild(pixiApp.view);

	let mainLoop = app.setupAdaptor({
		stage: pixiApp.stage,
		EntityAdaptor,
		addDisplayFunc: function (node: IPixiEntity, parent: IPixiEntity) {
			parent['addChild'](node);
		},
		traverseFunc: traverse,
		bubblingFunc: bubbling,
		loadResourceFunc: loadResource,
		getResFunc: getRes,
		protocols
	});
	PIXI.Ticker.shared.add(function (delta) {
		mainLoop(delta * 1000 / 60);
	});

	return app;
}

export interface IPixiEntity extends PIXI.DisplayObject, IEntity {

}

export function createEntity(type: string): IPixiEntity {
	return <IPixiEntity>app.createEntity(type);
}

export class Component extends QComponent {
	get entity(): IPixiEntity {
		return <IPixiEntity>this.entityAdaptor.entity;
	}
}
