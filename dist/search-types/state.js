"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = /** @class */ (function () {
    /**
     * constructor
     * @param codes
     */
    function State(states) {
        /**
         * zipcode endpoint
         */
        this.endpoint = 'polygon/state?state=';
        /**
         * zipcode array
         */
        this.params = [];
        this.params = states;
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
}());
exports.State = State;
