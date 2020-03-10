/**
 * Created by rockyl on 2020-03-08.
 */
import { EntityAdaptorBase } from 'qunity';
import { DisplayObject } from 'pixi.js';
export declare class EntityAdaptor extends EntityAdaptorBase {
    protected readonly _entity: DisplayObject;
    getActive(): boolean;
    setActive(v: boolean): void;
    constructor(entity: DisplayObject, app: any);
    private _onInteractionEvent;
}
