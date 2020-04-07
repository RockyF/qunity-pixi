/**
 * Created by rockyl on 2020-03-16.
 */
import Graphics = PIXI.Graphics;
import ObservablePoint = PIXI.ObservablePoint;
/**
 * 图形基类
 */
export declare abstract class ShapeBase extends Graphics {
    protected __fieldDirty: boolean;
    private _t;
    fillColor: any;
    fillAlpha: number;
    strokeColor: any;
    strokeAlpha: number;
    strokeWidth: number;
    strokeAlignment: number;
    shapeWidth: number;
    shapeHeight: number;
    directionLineWidth: number;
    protected _anchor: ObservablePoint;
    get anchor(): ObservablePoint;
    set anchor(value: ObservablePoint);
    get anchorOffset(): {
        x: number;
        y: number;
    };
    constructor();
    private _onAnchorUpdate;
    private $onModify;
    private nextTick;
    protected abstract redraw(): any;
    protected drawDirectionLine(): void;
}
/**
 * 矩形
 */
export declare class Rect extends ShapeBase {
    borderRadius: number;
    protected redraw(): void;
}
/**
 * 圆形
 */
export declare class Circle extends ShapeBase {
    protected redraw(): void;
}
/**
 * 星型
 */
export declare class Star extends ShapeBase {
    points: number;
    innerRadius: number;
    starRotation: number;
    protected redraw(): void;
}
/**
 * 曲线星型
 */
export declare class StarBezier extends ShapeBase {
    points: number;
    innerRadius: number;
    starRotation: number;
    protected redraw(): void;
}
