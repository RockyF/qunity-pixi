/**
 * Created by rockyl on 2020-03-08.
 */
import PIXI from 'pixi.js';
import { Application, IEntity, Component as QComponent } from 'qunity';
export declare function launchApp(): Application;
export interface IPixiEntity extends PIXI.DisplayObject, IEntity {
}
export declare function createEntity(type: string): IPixiEntity;
export declare class Component extends QComponent {
    get entity(): IPixiEntity;
}
