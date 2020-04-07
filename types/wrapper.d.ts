/**
 * Created by rockyl on 2020-03-08.
 */
import PIXI from 'pixi.js';
import { Application, IEntity, Component as QComponent } from 'qunity';
export declare enum Resolution {
    WIDTH_FIXED = 0,
    HEIGHT_FIXED = 1
}
interface PIXIAppOptions {
    resolution?: Resolution;
    designWidth?: number;
    designHeight?: number;
    antialias?: boolean;
    autoResize?: boolean;
}
export declare function createApp(options?: PIXIAppOptions): Application;
export interface IPixiEntity extends PIXI.Container, IEntity {
    readonly stageSize: {
        width: number;
        height: number;
    };
}
export declare function createEntity(type: string): IPixiEntity;
export declare class Component extends QComponent {
    get entity(): IPixiEntity;
}
export {};
