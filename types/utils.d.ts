/**
 * Created by rockyl on 2020-03-08.
 */
import PIXI from 'pixi.js';
/**
 * 先序遍历
 * @param node
 * @param hit
 */
export declare function traverse(node: any, hit: (node: PIXI.DisplayObject) => boolean | void): boolean | void;
/**
 * 冒泡遍历
 * @param node
 * @param hit
 */
export declare function bubbling(node: any, hit: (node: PIXI.DisplayObject) => boolean | void): void;
