"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_types_1 = require("./search-types");
exports.County = search_types_1.County;
exports.State = search_types_1.State;
exports.Zip = search_types_1.Zip;
var GBApi = /** @class */ (function () {
    /**
     *
     * @param params GBApiOptions
     */
    function GBApi(params) {
        var _this = this;
        /**
         * api key string
         */
        this.key = '';
        /**
         * map handle
         */
        this.map = null;
        /**
         *
         */
        this.searchInstance = null;
        /**
         * features on map
         */
        this._FEATURES = [];
        /**
         * base api url
         */
        this.baseUrl = 'https://api.geobarriers.io/api/';
        if (!params.key) {
            throw new Error('GeoBarriers::error | No key provided');
        }
        this.key = params.key;
        this.map = params.map;
        if (this.map) {
            this.map.data.addListener('addfeature', function (e) {
                _this.features.push(e.feature);
            });
        }
    }
    /**
     *
     */
    GBApi.prototype.zip = function (codes) {
        if (!Array.isArray(codes)) {
            codes = [codes];
        }
        this.searchInstance = new search_types_1.Zip(codes);
        return this;
    };
    /**
     *
     */
    GBApi.prototype.county = function (params) {
        if (!params.state) {
            throw new Error('GeoBarriers::error | County search requires a state');
        }
        if (params.county && !Array.isArray(params.county)) {
            params.county = [params.county];
        }
        this.searchInstance = new search_types_1.County(params);
        return this;
    };
    /**
     *
     */
    GBApi.prototype.state = function (states) {
        if (!Array.isArray(states)) {
            states = [states];
        }
        this.searchInstance = new search_types_1.State(states);
        return this;
    };
    /**
     *
     * @param data Zip|County|State
     * @param fresh boolean
     * @return Promise
     */
    GBApi.prototype.loadGeoJson = function (fresh) {
        var _this = this;
        if (fresh === void 0) { fresh = true; }
        if (!this.map) {
            throw new Error('GeoBarriers::error | No map provided | Use getGeoJson method to get geoJson data');
        }
        if (!this.searchInstance) {
            throw new Error('GeoBarriers::error | No search provided');
        }
        return new Promise(function (resolve, reject) {
            _this.getGeoJson()
                .then(function (json) {
                _this.addGeoJson(json, _this.map, fresh);
                resolve(true);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Retrieve geoJson data from api
     * @param data
     * @return Promise
     */
    GBApi.prototype.getGeoJson = function () {
        // handle caching
        if (!this.searchInstance) {
            throw new Error('GeoBarriers::error | No search provided');
        }
        var apiRequestUri = this.searchInstance.getUri();
        var endpoint = "" + this.baseUrl + apiRequestUri;
        endpoint += "&apiToken=" + this.key;
        endpoint += "&url=" + window.location.href;
        return new Promise(function (resolve, reject) {
            fetch(endpoint)
                .then(function (res) { return res.json(); })
                .then(function (json) {
                if (json.data) {
                    resolve(json.data);
                }
                reject(json.error);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Add geojson to the map
     * @param geoJson
     * @param map [google map]
     * @param fresh
     */
    GBApi.prototype.addGeoJson = function (geoJson, map, fresh) {
        if (fresh === void 0) { fresh = true; }
        if (fresh) {
            map.data.forEach(function (feature) {
                map.data.remove(feature);
            });
        }
        var google = window.google;
        var bounds = new google.maps.LatLngBounds();
        map.data.addGeoJson(geoJson);
        this.features.forEach(function (feature) {
            feature.getGeometry().forEachLatLng(function (latlng) {
                bounds.extend(latlng);
            });
        });
        map.fitBounds(bounds);
    };
    Object.defineProperty(GBApi.prototype, "features", {
        /**
         * get features
         */
        get: function () {
            return this._FEATURES;
        },
        /**
         * set feaures
         */
        set: function (value) {
            if (!Array.isArray(value)) {
                value = [value];
            }
            this._FEATURES = value;
        },
        enumerable: true,
        configurable: true
    });
    return GBApi;
}());
exports.GBApi = GBApi;
