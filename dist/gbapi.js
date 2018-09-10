"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_types_1 = require("./search-types");
exports.Zip = search_types_1.Zip;
exports.County = search_types_1.County;
exports.State = search_types_1.State;
var GBApi = /** @class */ (function () {
    /**
     *
     * @param params GBApiOptions
     */
    function GBApi(params) {
        var _this = this;
        /**
         * base api url
         */
        this.baseUrl = 'https://api.geobarriers.io/api/';
        /**
         * handle on google
         */
        this.google = null;
        /**
         * api key string
         */
        this._key = '';
        /**
         * map handle
         */
        this._map = null;
        /**
         * features on map
         */
        this._features = [];
        if (!params.key) {
            throw new Error('No key provided');
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
        return new search_types_1.Zip(codes);
    };
    /**
     *
     */
    GBApi.prototype.county = function (params) {
        return new search_types_1.County(params);
    };
    /**
     *
     */
    GBApi.prototype.state = function (states) {
        return new search_types_1.State(states);
    };
    /**
     *
     * @param data Zip|County|State
     */
    GBApi.prototype.loadGeoJson = function (data) {
        var _this = this;
        if (!this.map) {
            throw new Error('GeoBarriers::error | No map provided | Use getGeoJson method to get geoJson data');
        }
        this.getGeoJson(data)
            .then(function (json) {
            _this.addGeoJson(json);
        });
    };
    /**
     *
     * @param data
     */
    GBApi.prototype.getGeoJson = function (data) {
        var _this = this;
        // handle caching
        var cachedUrl = data.getUri();
        var cache = this.getCache(cachedUrl);
        if (cache) {
            return new Promise(function (resolve, reject) {
                resolve(cache);
            });
        }
        var endpoint = "" + this.baseUrl + cachedUrl;
        endpoint += "&apiToken=" + this.key;
        endpoint += "&url=" + window.location.href;
        return fetch(endpoint)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            if (json.data) {
                _this.setCache(cachedUrl, json.data);
                return json.data;
            }
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    /**
     * Add geojson to the map
     * @param geoJson
     * @param fresh
     */
    GBApi.prototype.addGeoJson = function (geoJson, fresh) {
        var _this = this;
        if (fresh === void 0) { fresh = true; }
        if (fresh) {
            this.map.data.forEach(function (feature) {
                _this.map.data.remove(feature);
            });
        }
        var google = window.google;
        var bounds = new google.maps.LatLngBounds();
        this.map.data.addGeoJson(geoJson);
        this.features.forEach(function (feature) {
            feature.getGeometry().forEachLatLng(function (latlng) {
                bounds.extend(latlng);
            });
        });
        this.map.fitBounds(bounds);
    };
    /**
     * set api key
     */
    GBApi.prototype.setCache = function (key, value) {
        if (window.localStorage) {
            window.localStorage["barriers-" + key] = JSON.stringify(value);
        }
    };
    /**
     * get api key
     */
    GBApi.prototype.getCache = function (key) {
        if (window.localStorage && window.localStorage["barriers-" + key]) {
            return JSON.parse(window.localStorage["barriers-" + key]);
        }
        return null;
    };
    Object.defineProperty(GBApi.prototype, "features", {
        /**
         * get features
         */
        get: function () {
            return this._features;
        },
        /**
         * set feaures
         */
        set: function (value) {
            if (!Array.isArray(value)) {
                value = [value];
            }
            this._features = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GBApi.prototype, "map", {
        /**
         * get map
         */
        get: function () {
            if (this._map) {
                return this._map;
            }
            return null;
        },
        /**
         * set google map
         */
        set: function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GBApi.prototype, "key", {
        /**
         * get api key
         */
        get: function () {
            if (this._key) {
                return this._key;
            }
            return '';
        },
        /**
         * set api key
         */
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    return GBApi;
}());
exports.GBApi = GBApi;
