(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('qunity-pixi'), require('qunity-core')) :
    typeof define === 'function' && define.amd ? define(['qunity-pixi', 'qunity-core'], factory) :
    (global = global || self, factory(global['qunity-pixi'], global['qunity-core']));
}(this, function (qunityPixi, qunityCore) { 'use strict';

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
    var Move = /** @class */ (function (_super) {
        __extends(Move, _super);
        function Move() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.o = 0;
            return _this;
        }
        Move.prototype.onAwake = function () {
            var _a = this.entity, width = _a.width, height = _a.height;
            this.entity.pivot.set(width / 2, height / 2);
            this.entity.position.set(100, 100);
        };
        Move.prototype.onUpdate = function (delta) {
            //console.log(this.entity, delta);
            //this.entity.x = Math.abs(Math.sin((this.o++) / 100)) * 100;
            this.entity.rotation += 0.05;
        };
        return Move;
    }(qunityCore.Component));
    //# sourceMappingURL=Move.js.map

    /**
     * Created by rockyl on 2020-03-08.
     */
    var app = qunityPixi.launchApp();
    app.registerComponentDefs({
        Move: Move,
    });
    app.loadResource([
        { name: '1', url: "images/1.png" },
        { name: '2', url: "images/2.png" },
        { name: '3', url: "images/3.png" },
        { name: 'cat', url: "images/cat.png" },
    ], function (loaded, total) {
        console.log(loaded / total);
    }, start);
    function start() {
        var entity = qunityPixi.createEntity('sprite');
        app.stage.addChild(entity);
        entity.texture = app.getRes('1').texture;
        entity.addComponent(Move);
        setTimeout(function () {
            console.log(entity.getComponent(Move));
            entity.removeComponent(Move);
        }, 1000);
    }

}));
//# sourceMappingURL=bundle.js.map
