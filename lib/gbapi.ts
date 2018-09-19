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
     * features on map
     */
    _features: any = [];

    /**
     * api key string
     */
    key: string = '';

    /**
     * map handle
     */
    map: any = null;

    /**
     * 
     */
    searchInstance: any = null;

    /**
     * 
     * @param params GBApiOptions
     */
    constructor(params: GBApiOptions) {
        if (!params.key) {
            throw new Error('GeoBarriers::error | No key provided');
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
    zip(codes: any): GBApi {
        if (!Array.isArray(codes)) {
            codes = [codes];
        }
        this.searchInstance = new Zip(codes);
        return this;
    }

    /**
     * 
     */
    county(params: CountyParams): GBApi {
        if (!params.state) {
            throw new Error('GeoBarriers::error | County search requires a state');
        }

        if (params.county && !Array.isArray(params.county)) {
            params.county = [params.county];
        }

        this.searchInstance = new County(params);
        return this;
    }

    /**
     * 
     */
    state(states: any): GBApi {
        if (!Array.isArray(states)) {
            states = [states];
        }
        this.searchInstance = new State(states);
        return this;
    }

    /**
     * 
     * @param data Zip|County|State
     * @param fresh boolean
     * @return Promise
     */
    loadGeoJson(fresh: boolean = true): Promise<any> {
        if (!this.map) {
            throw new Error('GeoBarriers::error | No map provided | Use getGeoJson method to get geoJson data');
        }

        if (!this.searchInstance) {
            throw new Error('GeoBarriers::error | No search provided');
        }

        return new Promise((resolve: any, reject: any) => {
            this.getGeoJson()
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
    getGeoJson(): Promise<any> {
        // handle caching
        if (!this.searchInstance) {
            throw new Error('GeoBarriers::error | No search provided');
        }
        
        const apiRequestUri: string = this.searchInstance.getUri();
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
                });
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