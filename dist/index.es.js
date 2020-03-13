import PIXI from 'pixi.js';
import { EntityAdaptorBase, Application, Component as Component$1 } from 'qunity';

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
}(EntityAdaptorBase));
//# sourceMappingURL=EntityAdaptor.js.map

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
 * Created by rockyl on 2020-03-08.
 */
var type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}
PIXI.utils.sayHello(type);
var app;
function launchApp() {
    app = new Application();
    app.registerEntityDefs({
        Container: { def: PIXI.Container, isContainer: true },
        Sprite: { def: PIXI.Sprite, isContainer: true },
        Text: { def: PIXI.Text, isContainer: true },
        Graphics: { def: PIXI.Graphics, isContainer: true },
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
        addDisplayFunc: function (node, parent) {
            parent['addChild'](node);
        },
        traverseFunc: traverse,
        bubblingFunc: bubbling,
        loadResourceFunc: loadResource,
        getResFunc: getRes,
        protocols: protocols
    });
    PIXI.Ticker.shared.add(function (delta) {
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
}(Component$1));

export { Component, bubbling, createEntity, launchApp, traverse };
//# sourceMappingURL=index.es.js.map
