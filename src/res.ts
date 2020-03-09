/**
 * Created by rockyl on 2020-03-08.
 */

import PIXI from 'pixi.js'

export function loadResource(configs, onProgress?, onComplete?): void {
	let loader = PIXI.Loader.shared;
	for (let config of configs) {
		loader.add(config);
	}

	let total = configs.length;
	let loaded = 0;
	loader.on("progress", function (e) {
		loaded++;
		onProgress && onProgress(loaded, total);
	});
	loader.load(onComplete);

}

export function getRes(name): any {
	return PIXI.Loader.shared.resources[name];
}
