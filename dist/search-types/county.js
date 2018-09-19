"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var County = /** @class */ (function () {
    /**
     * constructor
     * @param codes
     */
    function County(params) {
        /**
         * zipcode endpoint
         */
        this.endpoint = 'polygon/county?county=';
        /**
         * zipcode array
         */
        this.params = {
            county: [],
            state: ''
        };
        this.params = {
            county: params.county,
            state: params.state
        };
    }
    /**
     *
     */
    County.prototype.getUri = function () {
        return "" + this.endpoint + this.params.county.join(',') + "&state=" + this.params.state;
    };
    /**
     * add code
     * @param code
     */
    County.prototype.addCounty = function (county) {
        if (!this.params.county.includes(county)) {
            this.params.county.push(county);
        }
    };
    /**
     * remove code
     * @param code
     */
    County.prototype.removeCode = function (county) {
        var index = this.params.county.indexOf(county);
        if (index > -1) {
            this.params.county.splice(index, 1);
        }
    };
    /**
     *
     */
    County.prototype.addState = function (state) {
        this.params.state = state;
    };
    return County;
}());
exports.County = County;
