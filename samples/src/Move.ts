/**
 * Created by rockyl on 2020-03-08.
 */

import {Component} from 'qunity-core';

export class Move extends Component {
	o = 0;

	onAwake(){
		const {width, height} = this.entity;
		this.entity.pivot.set(width / 2, height / 2);
		this.entity.position.set(100, 100);
	}

	onUpdate(delta) {
		//console.log(this.entity, delta);

		//this.entity.x = Math.abs(Math.sin((this.o++) / 100)) * 100;
		this.entity.rotation += 0.05;
	}
}
