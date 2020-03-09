/**
 * Created by rockyl on 2020-03-08.
 */
import { EntityAdaptorBase } from 'qunity';
import { DisplayObject } from 'pixi.js';
export declare class EntityAdaptor extends EntityAdaptorBase {
    get isActive(): boolean;
    constructor(entity: DisplayObject, app: any);
    private _onInteractionEvent;
}
