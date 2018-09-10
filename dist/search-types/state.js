"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var search_type_1 = require("./search-type");
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    /**
     * constructor
     * @param codes
     */
    function State(states) {
        var _this = _super.call(this) || this;
        /**
         * zipcode endpoint
         */
        _this.endpoint = 'polygon/state?state=';
        /**
         * zipcode array
         */
        _this.params = [];
        _this.params = states;
        return _this;
    }
    /**
     *
     */
    State.prototype.getUri = function () {
        return "" + this.endpoint + this.params.join(',');
    };
    /**
     * add code
     * @param code
     */
    State.prototype.addState = function (state) {
        if (!this.params.includes(state)) {
            this.params.push(state);
        }
    };
    /**
     * remove code
     * @param code
     */
    State.prototype.removeState = function (state) {
        var index = this.params.indexOf(state);
        if (index > -1) {
            this.params.splice(index, 1);
        }
    };
    return State;
}(search_type_1.SearchType));
exports.State = State;
