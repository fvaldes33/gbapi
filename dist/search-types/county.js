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
        this.params = [
            {
                county: '',
                state: '',
            },
        ];
        this.params = params;
    }
    /**
     *
     */
    County.prototype.getUri = function () {
        var queryString = this.params.map(function (param) {
            return param.county + "|" + param.state;
        });
        return "" + this.endpoint + queryString.join(',');
    };
    /**
     * add code
     * @param code
     */
    County.prototype.addCounty = function (county) {
        if (!this.params.includes(county)) {
            this.params.push(county);
        }
    };
    /**
     * remove code
     * @param code
     */
    County.prototype.removeCounty = function (county) {
        var index = this.params.indexOf(county);
        if (index > -1) {
            this.params.splice(index, 1);
        }
    };
    return County;
}());
exports.County = County;
