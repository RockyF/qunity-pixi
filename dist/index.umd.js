(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js'), require('qunity')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pixi.js', 'qunity'], factory) :
    (global = global || self, factory(global['qunity-pixi'] = {}, global.PIXI, global.qunity));
}(this, function (exports, PIXI, qunity) { 'use strict';

    PIXI = PIXI && PIXI.hasOwnProperty('default') ? PIXI['default'] : PIXI;

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

    /**
     * Created by rockyl on 2020-03-08.
     */
    function traverse(node, hit) {
        var interrupt = hit(node);
        if (node.children && node.children.length > 0) {
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

    /**
     * Created by rockyl on 2020-03-08.
     */
    function loadResource(configs, onProgress, onComplete) {
        var loader = PIXI.Loader.shared;
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
        return PIXI.Loader.shared.resources[name];
    }
    //# sourceMappingURL=res.js.map

    /**
     * Created by rockyl on 2020-03-08.
     */
    var type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }
    PIXI.utils.sayHello(type);
    var app;
    function launchApp() {
        app = new qunity.Application();
        app.registerEntityDefs({
            sprite: PIXI.Sprite,
        });
        var pixiApp = new PIXI.Application({
            resizeTo: window,
        });
        pixiApp.renderer.view.style.position = "absolute";
        pixiApp.renderer.view.style.display = "block";
        document.body.appendChild(pixiApp.view);
        var mainLoop = app.setupAdaptor({
            stage: pixiApp.stage,
            EntityAdaptor: EntityAdaptor,
            traverseFunc: traverse,
            loadResourceFunc: loadResource,
            getResFunc: getRes,
        });
        PIXI.Ticker.shared.add(mainLoop);
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
    exports.createEntity = createEntity;
    exports.launchApp = launchApp;
    exports.traverse = traverse;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
