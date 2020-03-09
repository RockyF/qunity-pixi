/**
 * Created by rockyl on 2020-03-08.
 */

import PIXI from 'pixi.js'

export function traverse(node, hit: (node: PIXI.DisplayObject) => boolean | void) {
	let interrupt = hit(node);

	if (node.children && node.children.length > 0) {
		for (let child of node.children) {
			let interrupt = traverse(child, hit);
			if (interrupt) {
				break;
			}
		}
	}

	return interrupt;
}
