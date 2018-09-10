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
var Zip = /** @class */ (function (_super) {
    __extends(Zip, _super);
    /**
     * constructor
     * @param codes
     */
    function Zip(codes) {
        var _this = _super.call(this) || this;
        /**
         * zipcode endpoint
         */
        _this.endpoint = 'polygon/zip?zip=';
        /**
         * zipcode array
         */
        _this.params = [];
        _this.params = codes;
        return _this;
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
}(search_type_1.SearchType));
exports.Zip = Zip;
