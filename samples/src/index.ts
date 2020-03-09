/**
 * Created by rockyl on 2020-03-08.
 */

import {launchApp, createEntity, IPixiEntity} from 'qunity-pixi';
import {Move} from "./Move";

let app = launchApp();
app.registerComponentDefs({
	Move,
});

app.loadResource([
	{name: '1', url: "images/1.png"},
	{name: '2', url: "images/2.png"},
	{name: '3', url: "images/3.png"},
	{name: 'cat', url: "images/cat.png"},
], function(loaded, total){
	console.log(loaded / total)
}, start);

function start() {
	let entity: IPixiEntity = createEntity('sprite');
	app.stage.addChild(entity);

	entity.texture = app.getRes('1').texture;

	entity.addComponent(Move);

	setTimeout(function(){
		console.log(entity.getComponent(Move));
		entity.removeComponent(Move);
	}, 1000);
}
