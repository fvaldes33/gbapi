import {
    Zip,
    County, CountyParams,
    State
} from './search-types';

declare var Promise: any;

class GBApi {

    /**
     * base api url
     */
    baseUrl: string = 'https://api.geobarriers.io/api/';

    /**
     * handle on google
     */
    google: any = null;

    /**
     * api key string
     */
    _key: string = '';

    /**
     * map handle
     */
    _map: any = null;

    /**
     * features on map
     */
    _features: any = [];

    /**
     * 
     * @param params GBApiOptions
     */
    constructor(params: GBApiOptions) {
        if (!params.key) {
            throw new Error('No key provided');
        }

        this.key = params.key;
        this.map = params.map;

        if (this.map) {
            this.map.data.addListener('addfeature', (e: any) => {
                this.features.push(e.feature);
            });
        }
    }

    /**
     * 
     */
    zip(codes: any) {
        return new Zip(codes);
    }

    /**
     * 
     */
    county(params: CountyParams) {
        return new County(params);
    }

    /**
     * 
     */
    state(states: any) {
        return new State(states);
    }

    /**
     * 
     * @param data Zip|County|State
     * @param fresh boolean
     * @return Promise
     */
    loadGeoJson(data: Zip|County|State, fresh: boolean = true) {
        if (!this.map) {
            throw new Error('GeoBarriers::error | No map provided | Use getGeoJson method to get geoJson data');
        }

        return new Promise((resolve: any, reject: any) => {
            this.getGeoJson(data)
                .then((json: any) => {
                    this.addGeoJson(json, fresh);
                    resolve(true);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    /**
     * Retrieve geoJson data from api
     * @param data
     * @return Promise
     */
    getGeoJson(data: Zip|County|State): Promise<any> {
        // handle caching
        const apiRequestUri: string = data.getUri();
        let endpoint: string = `${this.baseUrl}${apiRequestUri}`;
        endpoint += `&apiToken=${this.key}`;
        endpoint += `&url=${window.location.href}`;

        return new Promise((resolve: any, reject: any) => {
            fetch(endpoint)
                .then((res: any) => res.json())
                .then((json: any) => {
                    if (json.data) {
                        resolve(json.data);
                    }
                    reject(json.error);
                })
                .catch((err: any) => {
                    reject(err);
                })
        });
    }

    /**
     * Add geojson to the map
     * @param geoJson 
     * @param fresh 
     */
    addGeoJson(geoJson: FeatureCollection, fresh: boolean = true) {
        if (fresh) {
            this.map.data.forEach((feature: any) => {
                this.map.data.remove(feature);
            });
        }

        const google = (<any>window).google;
        const bounds = new google.maps.LatLngBounds();

        this.map.data.addGeoJson(geoJson);

        this.features.forEach((feature: any) => {
            feature.getGeometry().forEachLatLng((latlng: any) => {
                bounds.extend(latlng);
            });
        })

        this.map.fitBounds(bounds);
    }

    /**
     * set feaures
     */
    set features(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        this._features = value;
    }

    /**
     * get features
     */
    get features() {
        return this._features;
    }

    /**
     * set google map
     */
    set map(value) {
        this._map = value;
    }

    /**
     * get map
     */
    get map() {
        if (this._map) {
            return this._map;
        }
        return null;
    }

    /**
     * set api key
     */
    set key(value: string) {
        this._key = value;
    }

    /**
     * get api key
     */
    get key() {
        if (this._key) {
            return this._key;
        }
        return '';
    }
}


interface GBApiOptions {
    key: string;
    map?: any;
}

interface Geometry {
    type: string;
    coordinates: any;
}

interface Feature {
    type: string;
    properties: any;
    geometry: Geometry
}

interface FeatureCollection {
    type: string;
    features: Feature[];
}

export { 
    GBApi,
    GBApiOptions,
    Geometry,
    Feature,
    FeatureCollection,
    Zip,
    County,
    CountyParams,
    State 
};