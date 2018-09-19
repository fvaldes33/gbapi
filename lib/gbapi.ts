import { County, ICountyParams, State, Zip } from './search-types';

declare var Promise: any;

class GBApi {
  /**
   * api key string
   */
  public key: string = '';

  /**
   * map handle
   */
  public map: any = null;

  /**
   *
   */
  public searchInstance: any = null;

  /**
   * features on map
   */
  private _FEATURES: any = [];

  /**
   * base api url
   */
  private baseUrl: string = 'https://api.geobarriers.io/api/';

  /**
   *
   * @param params GBApiOptions
   */
  constructor(params: IGBApiOptions) {
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
  public zip(codes: any): GBApi {
    if (!Array.isArray(codes)) {
      codes = [codes];
    }
    this.searchInstance = new Zip(codes);
    return this;
  }

  /**
   *
   */
  public county(params: ICountyParams): GBApi {
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
  public state(states: any): GBApi {
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
  public loadGeoJson(fresh: boolean = true): Promise<any> {
    if (!this.map) {
      throw new Error('GeoBarriers::error | No map provided | Use getGeoJson method to get geoJson data');
    }

    if (!this.searchInstance) {
      throw new Error('GeoBarriers::error | No search provided');
    }

    return new Promise((resolve: any, reject: any) => {
      this.getGeoJson()
        .then((json: any) => {
          this.addGeoJson(json, this.map, fresh);
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
  public getGeoJson(): Promise<any> {
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
   * @param map [google map]
   * @param fresh
   */
  private addGeoJson(geoJson: IFeatureCollection, map: any, fresh: boolean = true) {
    if (fresh) {
      map.data.forEach((feature: any) => {
        map.data.remove(feature);
      });
    }

    const google = (window as any).google;
    const bounds = new google.maps.LatLngBounds();

    map.data.addGeoJson(geoJson);

    this.features.forEach((feature: any) => {
      feature.getGeometry().forEachLatLng((latlng: any) => {
        bounds.extend(latlng);
      });
    });

    map.fitBounds(bounds);
  }

  /**
   * set feaures
   */
  set features(value) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    this._FEATURES = value;
  }

  /**
   * get features
   */
  get features() {
    return this._FEATURES;
  }
}

interface IGBApiOptions {
  key: string;
  map?: any;
}

interface IGeometry {
  type: string;
  coordinates: any;
}

interface IFeature {
  type: string;
  properties: any;
  geometry: IGeometry;
}

interface IFeatureCollection {
  type: string;
  features: IFeature[];
}

export { GBApi, IGBApiOptions, IGeometry, IFeature, IFeatureCollection, Zip, County, ICountyParams, State };
