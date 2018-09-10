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
var County = /** @class */ (function (_super) {
    __extends(County, _super);
    /**
     * constructor
     * @param codes
     */
    function County(params) {
        var _this = _super.call(this) || this;
        /**
         * zipcode endpoint
         */
        _this.endpoint = 'polygon/county?county=';
        /**
         * zipcode array
         */
        _this.params = {
            county: [],
            state: ''
        };
        _this.params = {
            county: params.county,
            state: params.state
        };
        return _this;
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
}(search_type_1.SearchType));
exports.County = County;
