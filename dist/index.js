(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js'), require('qunity')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pixi.js', 'qunity'], factory) :
    (global = global || self, factory(global['qunity-pixi'] = {}, global.PIXI, global.qunity));
}(this, function (exports, PIXI$1, qunity) { 'use strict';

    PIXI$1 = PIXI$1 && PIXI$1.hasOwnProperty('default') ? PIXI$1['default'] : PIXI$1;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /**
     * Created by rockyl on 2020-03-08.
     */
    /**
     * 先序遍历
     * @param node
     * @param hit
     */
    function traverse(node, hit) {
        var interrupt = hit(node);
        if (!interrupt && node.children && node.children.length > 0) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var interrupt_1 = traverse(child, hit);
                if (interrupt_1) {
                    break;
                }
            }
        }
        return interrupt;
    }
    /**
     * 冒泡遍历
     * @param node
     * @param hit
     */
    function bubbling(node, hit) {
        var interrupt = hit(node);
        while (!interrupt && node.parent) {
            node = node.parent;
            if (node) {
                interrupt = hit(node);
            }
        }
        return interrupt;
    }
    //# sourceMappingURL=utils.js.map

    /**
     * Created by rockyl on 2020-03-08.
     */
    var interactionEvents = {
        pointertap: 'click',
        pointerdown: 'mouseDown',
        pointermove: 'mouseMove',
        pointerup: 'mouseUp',
        pointerupoutside: 'mouseUpOutside',
    };
    var EntityAdaptor = /** @class */ (function (_super) {
        __extends(EntityAdaptor, _super);
        function EntityAdaptor(entity, app) {
            var _this = _super.call(this, entity, app) || this;
            entity.interactive = true;
            for (var event in interactionEvents) {
                entity.on(event, _this._onInteractionEvent, _this);
            }
            return _this;
        }
        EntityAdaptor.prototype.getActive = function () {
            return _super.prototype.getActive.call(this) && this._entity.visible;
        };
        EntityAdaptor.prototype.setActive = function (v) {
            _super.prototype.setActive.call(this, v);
            this._entity.visible = v;
        };
        EntityAdaptor.prototype._onInteractionEvent = function (e) {
            if (e.target || e.type === 'pointerupoutside') {
                var interactEvent = interactionEvents[e.type];
                this.invokeInteractionEvent(interactEvent, e);
            }
        };
        return EntityAdaptor;
    }(qunity.EntityAdaptorBase));
    //# sourceMappingURL=EntityAdaptor.js.map

    /**
     * Created by rockyl on 2020-03-08.
     */
    function loadResource(configs, onProgress, onComplete) {
        var loader = PIXI$1.Loader.shared;
        for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
            var config = configs_1[_i];
            loader.add(config);
        }
        var total = configs.length;
        var loaded = 0;
        loader.on("progress", function (e) {
            loaded++;
            onProgress && onProgress(loaded, total);
        });
        loader.load(onComplete);
    }
    function getRes(name) {
        return PIXI$1.Loader.shared.resources[name];
    }
    //# sourceMappingURL=res.js.map

    /**
     * Created by rockyl on 2020-03-11.
     */
    var _a;
    var Protocols;
    (function (Protocols) {
        Protocols["TEXTURE"] = "texture://";
    })(Protocols || (Protocols = {}));
    var protocols = (_a = {},
        _a[Protocols.TEXTURE] = texture,
        _a);
    function texture(app, key, value) {
        var trulyValue;
        var uuid = value.replace(Protocols.TEXTURE, '');
        trulyValue = app.getRes(uuid);
        if (trulyValue) {
            trulyValue = trulyValue.texture;
        }
        return trulyValue;
    }
    //# sourceMappingURL=protocols.js.map

    /**
     * Created by rockyl on 2020-03-16.
     */
    var Graphics = PIXI.Graphics;
    /**
     * 图形基类
     */
    var ShapeBase = /** @class */ (function (_super) {
        __extends(ShapeBase, _super);
        function ShapeBase() {
            var _this = _super.call(this) || this;
            _this.__fieldDirty = true;
            _this.fillColor = '0xffffff';
            _this.strokeColor = 0;
            _this.strokeWidth = 0;
            _this.shapeWidth = 0;
            _this.shapeHeight = 0;
            _this.nextTick = function () {
                if (_this.__fieldDirty) {
                    _this.__fieldDirty = false;
                    var _a = _this, fillColor = _a.fillColor, strokeColor = _a.strokeColor, strokeWidth = _a.strokeWidth;
                    _this.clear();
                    _this.beginFill(fillColor);
                    if (strokeWidth > 0) {
                        _this.lineStyle(strokeWidth, strokeColor);
                    }
                    _this.redraw();
                    _this.endFill();
                }
            };
            return _this;
        }
        ShapeBase.prototype.onModify = function (value, key) {
            this.__fieldDirty = true;
            if (this._t) {
                clearTimeout(this._t);
                this._t = null;
            }
            this._t = setTimeout(this.nextTick);
        };
        __decorate([
            qunity.dirtyFieldTrigger
        ], ShapeBase.prototype, "fillColor", void 0);
        __decorate([
            qunity.dirtyFieldTrigger
        ], ShapeBase.prototype, "strokeColor", void 0);
        __decorate([
            qunity.dirtyFieldTrigger
        ], ShapeBase.prototype, "strokeWidth", void 0);
        __decorate([
            qunity.dirtyFieldTrigger
        ], ShapeBase.prototype, "shapeWidth", void 0);
        __decorate([
            qunity.dirtyFieldTrigger
        ], ShapeBase.prototype, "shapeHeight", void 0);
        return ShapeBase;
    }(Graphics));
    /**
     * 矩形
     */
    var Rect = /** @class */ (function (_super) {
        __extends(Rect, _super);
        function Rect() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.borderRadius = 0;
            return _this;
        }
        Rect.prototype.redraw = function () {
            var _a = this, shapeWidth = _a.shapeWidth, shapeHeight = _a.shapeHeight, borderRadius = _a.borderRadius;
            if (borderRadius > 0) {
                this.drawRoundedRect(0, 0, shapeWidth, shapeHeight, borderRadius);
            }
            else {
                this.drawRect(0, 0, shapeWidth, shapeHeight);
            }
        };
        __decorate([
            qunity.dirtyFieldTrigger
        ], Rect.prototype, "borderRadius", void 0);
        return Rect;
    }(ShapeBase));
    /**
     * 圆形
     */
    var Circle = /** @class */ (function (_super) {
        __extends(Circle, _super);
        function Circle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Circle.prototype.redraw = function () {
            var _a = this, shapeWidth = _a.shapeWidth, shapeHeight = _a.shapeHeight;
            var radius = Math.min(shapeWidth, shapeHeight) / 2;
            this.drawCircle(radius, radius, radius);
        };
        return Circle;
    }(ShapeBase));
    //# sourceMappingURL=shapes.js.map

    /**
     * Created by rockyl on 2020-03-13.
     *
     * 实体属性列表
     */
    var PIXI_TextStyle = {
        align: ['string', ''],
        breakWords: ['boolean', ''],
        dropShadow: ['boolean', ''],
        dropShadowAlpha: ['number', ''],
        dropShadowAngle: ['number', ''],
        dropShadowBlur: ['number', ''],
        dropShadowColor: ['color', ''],
        dropShadowDistance: ['number', ''],
        fill: ['color', ''],
        fontFamily: ['string', ''],
        fontSize: ['number', ''],
        fontStyle: ['string', ''],
        fontVariant: ['string', ''],
        fontWeight: ['string', ''],
        leading: ['number', ''],
        letterSpacing: ['number', ''],
        lineHeight: ['number', ''],
        lineJoin: ['string', ''],
        miterLimit: ['number', ''],
        padding: ['number', ''],
        stroke: ['number', ''],
        strokeThickness: ['number', ''],
        trim: ['boolean', ''],
        textBaseline: ['string', ''],
        whiteSpace: ['string', ''],
        wordWrap: ['boolean', ''],
        wordWrapWidth: ['number', ''],
    };
    (function (PIXI_BLEND_MODES) {
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["NORMAL"] = 0] = "NORMAL";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["ADD"] = 1] = "ADD";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["MULTIPLY"] = 2] = "MULTIPLY";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SCREEN"] = 3] = "SCREEN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["OVERLAY"] = 4] = "OVERLAY";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DARKEN"] = 5] = "DARKEN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["LIGHTEN"] = 6] = "LIGHTEN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["COLOR_DODGE"] = 7] = "COLOR_DODGE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["COLOR_BURN"] = 8] = "COLOR_BURN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["HARD_LIGHT"] = 9] = "HARD_LIGHT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SOFT_LIGHT"] = 10] = "SOFT_LIGHT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DIFFERENCE"] = 11] = "DIFFERENCE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["EXCLUSION"] = 12] = "EXCLUSION";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["HUE"] = 13] = "HUE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SATURATION"] = 14] = "SATURATION";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["COLOR"] = 15] = "COLOR";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["LUMINOSITY"] = 16] = "LUMINOSITY";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["NORMAL_NPM"] = 17] = "NORMAL_NPM";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["ADD_NPM"] = 18] = "ADD_NPM";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SCREEN_NPM"] = 19] = "SCREEN_NPM";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["NONE"] = 20] = "NONE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_OVER"] = 0] = "SRC_OVER";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_IN"] = 21] = "SRC_IN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_OUT"] = 22] = "SRC_OUT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SRC_ATOP"] = 23] = "SRC_ATOP";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_OVER"] = 24] = "DST_OVER";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_IN"] = 25] = "DST_IN";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_OUT"] = 26] = "DST_OUT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["DST_ATOP"] = 27] = "DST_ATOP";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["ERASE"] = 26] = "ERASE";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["SUBTRACT"] = 28] = "SUBTRACT";
        PIXI_BLEND_MODES[PIXI_BLEND_MODES["XOR"] = 29] = "XOR";
    })(exports.PIXI_BLEND_MODES || (exports.PIXI_BLEND_MODES = {}));
    var entityProps = {
        Container: {
            def: PIXI$1.Container,
            isContainer: true,
            props: {
                position: ['vector2', [0, 0]],
                scale: ['vector2', [1, 1]],
                anchor: ['vector2', [0, 0]],
                pivot: ['vector2', [0, 0]],
                skew: ['vector2', [0, 0]],
                width: ['number', 0],
                height: ['number', 0],
                alpha: ['number', 0],
                angle: ['number', 0],
                buttonMode: ['boolean', true],
                interactive: ['boolean', true],
                interactiveChildren: ['boolean', true],
                zIndex: ['number', 0],
            },
        },
        Sprite: {
            base: 'Container',
            def: PIXI$1.Sprite,
            isContainer: true,
            props: {
                blendMode: ['enum', 'NORMAL', exports.PIXI_BLEND_MODES],
                tint: ['color', 0xFFFFFF],
                texture: ['texture'],
            },
        },
        Text: {
            base: 'Sprite',
            def: PIXI$1.Text,
            isContainer: true,
            props: {
                text: ['string'],
                style: ['object', null, PIXI_TextStyle]
            },
        },
        Graphics: {
            base: 'Container',
            def: PIXI$1.Graphics,
            isContainer: true,
            props: {
                tint: ['color', 0xFFFFFF],
            },
        },
        ShapeBase: {
            base: 'Graphics',
            def: ShapeBase,
            isContainer: true,
            hidden: true,
            props: {
                fillColor: ['color', 0xFFFFFF],
                strokeColor: ['color', 0x000],
                strokeWidth: ['number', 0],
            },
        },
        Rect: {
            base: 'ShapeBase',
            def: Rect,
            isContainer: true,
            props: {
                borderRadius: ['number', 0],
            },
        },
        Circle: {
            base: 'ShapeBase',
            def: Circle,
            isContainer: true,
            props: {},
        },
    };

    /**
     * Created by rockyl on 2020-03-08.
     */
    var type = "WebGL";
    if (!PIXI$1.utils.isWebGLSupported()) {
        type = "canvas";
    }
    PIXI$1.utils.sayHello(type);
    var app;
    function createApp() {
        app = new qunity.Application();
        app.registerEntityDefs(entityProps);
        var pixiApp = new PIXI$1.Application({
            antialias: true,
            resizeTo: window,
        });
        pixiApp.renderer.view.style.position = "absolute";
        pixiApp.renderer.view.style.display = "block";
        document.body.appendChild(pixiApp.view);
        var mainLoop = app.setupAdaptor({
            stage: pixiApp.stage,
            EntityAdaptor: EntityAdaptor,
            addDisplayFunc: function (node, parent) {
                parent['addChild'](node);
            },
            traverseFunc: traverse,
            bubblingFunc: bubbling,
            loadResourceFunc: loadResource,
            getResFunc: getRes,
            protocols: protocols
        });
        PIXI$1.Ticker.shared.add(function (delta) {
            mainLoop(delta * 1000 / 60);
        });
        return app;
    }
    function createEntity(type) {
        return app.createEntity(type);
    }
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Component.prototype, "entity", {
            get: function () {
                return this.entityAdaptor.entity;
            },
            enumerable: true,
            configurable: true
        });
        return Component;
    }(qunity.Component));
    //# sourceMappingURL=wrapper.js.map

    exports.Component = Component;
    exports.PIXI_TextStyle = PIXI_TextStyle;
    exports.bubbling = bubbling;
    exports.createApp = createApp;
    exports.createEntity = createEntity;
    exports.entityProps = entityProps;
    exports.traverse = traverse;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
