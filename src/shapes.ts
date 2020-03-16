/**
 * Created by rockyl on 2020-03-16.
 */

import Graphics = PIXI.Graphics;
import {dirtyFieldTrigger} from "qunity";

/**
 * 图形基类
 */
export abstract class ShapeBase extends Graphics {
	protected __fieldDirty = true;

	private _t;

	@dirtyFieldTrigger
	fillColor: any = '0xffffff';
	@dirtyFieldTrigger
	strokeColor: any = 0;
	@dirtyFieldTrigger
	strokeWidth: number = 0;
	@dirtyFieldTrigger
	shapeWidth: number = 0;
	@dirtyFieldTrigger
	shapeHeight: number = 0;

	constructor() {
		super();

	}

	private onModify(value, key) {
		this.__fieldDirty = true;

		if (this._t) {
			clearTimeout(this._t);
			this._t = null;
		}
		this._t = setTimeout(this.nextTick);
	}

	private nextTick = () => {
		if (this.__fieldDirty) {
			this.__fieldDirty = false;

			const {fillColor, strokeColor, strokeWidth} = this;

			this.clear();
			this.beginFill(fillColor);
			if (strokeWidth > 0) {
				this.lineStyle(strokeWidth, strokeColor);
			}
			this.redraw();
			this.endFill();
		}
	};

	protected abstract redraw()
}

/**
 * 矩形
 */
export class Rect extends ShapeBase {
	@dirtyFieldTrigger
	borderRadius: number = 0;

	protected redraw() {
		const {shapeWidth, shapeHeight, borderRadius,} = this;

		if (borderRadius > 0) {
			this.drawRoundedRect(0, 0, shapeWidth, shapeHeight, borderRadius);
		} else {
			this.drawRect(0, 0, shapeWidth, shapeHeight);
		}
	}
}

/**
 * 圆形
 */
export class Circle extends ShapeBase {
	protected redraw() {

		const {shapeWidth, shapeHeight} = this;
		const radius = Math.min(shapeWidth, shapeHeight) / 2;

		this.drawCircle(radius, radius, radius);
	}
}