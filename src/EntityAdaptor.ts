/**
 * Created by rockyl on 2020-03-08.
 */

import {EntityAdaptorBase} from 'qunity'
import {DisplayObject, interaction} from 'pixi.js'
import InteractionEvent = interaction.InteractionEvent;

const interactionEvents = {
	pointertap: 'click',
	pointerdown: 'mouseDown',
	pointermove: 'mouseMove',
	pointerup: 'mouseUp',
	pointerupoutside: 'mouseUpOutside',

	/*'pointerout',
	'pointerover',
	'pointercancel',*/
};

export class EntityAdaptor extends EntityAdaptorBase {
	protected readonly _entity: DisplayObject;

	getActive(): boolean {
		return super.getActive() && this._entity.visible;
	}

	setActive(v: boolean) {
		super.setActive(v);
		this._entity.visible = v;
	}

	constructor(entity: DisplayObject, app) {
		super(entity, app);

		entity.interactive = true;

		for (let event in interactionEvents) {
			entity.on(event, this._onInteractionEvent, this);
		}
	}

	private _onInteractionEvent(e: InteractionEvent) {
		if (e.target || e.type === 'pointerupoutside') {
			let interactEvent = interactionEvents[e.type];
			this.invokeInteractionEvent(interactEvent, e);
		}
	}
}
