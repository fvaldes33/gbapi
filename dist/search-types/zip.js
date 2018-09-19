"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Zip = /** @class */ (function () {
    /**
     * constructor
     * @param codes
     */
    function Zip(codes) {
        /**
         * zipcode endpoint
         */
        this.endpoint = 'polygon/zip?zip=';
        /**
         * zipcode array
         */
        this.params = [];
        this.params = codes;
    }
    /**
     *
     */
    Zip.prototype.getUri = function () {
        return "" + this.endpoint + this.params.join(',');
    };
    /**
     * add code
     * @param code
     */
    Zip.prototype.addCode = function (code) {
        if (!this.params.includes(code)) {
            this.params.push(code);
        }
    };
    /**
     * remove code
     * @param code
     */
    Zip.prototype.removeCode = function (code) {
        var index = this.params.indexOf(code);
        if (index > -1) {
            this.params.splice(index, 1);
        }
    };
    return Zip;
}());
exports.Zip = Zip;
