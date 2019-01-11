"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fsa = /** @class */ (function () {
    /**
     * constructor
     * @param codes
     */
    function Fsa(codes) {
        /**
         * zipcode endpoint
         */
        this.endpoint = 'polygon/fsa?fsa=';
        /**
         * zipcode array
         */
        this.params = [];
        this.params = codes;
    }
    /**
     *
     */
    Fsa.prototype.getUri = function () {
        return "" + this.endpoint + this.params.join(',');
    };
    /**
     * add code
     * @param code
     */
    Fsa.prototype.addCode = function (code) {
        if (!this.params.includes(code)) {
            this.params.push(code);
        }
    };
    /**
     * remove code
     * @param code
     */
    Fsa.prototype.removeCode = function (code) {
        var index = this.params.indexOf(code);
        if (index > -1) {
            this.params.splice(index, 1);
        }
    };
    return Fsa;
}());
exports.Fsa = Fsa;
