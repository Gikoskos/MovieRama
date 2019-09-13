import t from './types';

/**
 * WebApi class is a convenience fetch wrapper class
 * for using APIs that require api keys.
 */
export default class WebApi {
    /**
     * 
     * @param {string} hostname 
     * @param {string} apikey 
     */
    constructor(hostname, apikey) {
        if (!t.isString(hostname)) {
            throw new Error('WebApi:constructor: hostname expected to be string');
        }

        if (!t.isString(apikey)) {
            throw new Error('WebApi:constructor: apikey expected to be string');
        }

        this._host = hostname;
        this._key = apikey;
    }

    get hostname() {
        return this._host;
    }

    get apiKey() {
        return this._key;
    }

    /**
     * 
     * @param {string} endpoint 
     * @param {Object} params 
     * @return {Object}
     */
    async getResource(endpoint, params) {
        if (!t.isString(endpoint)) {
            throw new Error('WebApi:getResource: endpoint expected to be string');
        }

        if (endpoint.charAt(0) != '/') {
            endpoint = `/${endpoint}`;
        }

        endpoint += `?api_key=${this.apiKey}`;

        for (const paramName in params) {
            endpoint += `&${paramName}=${params[paramName]}`;
        }

        const requestURL = `${this.hostname}${endpoint}`;

        const request = new Request(requestURL);
        const headers = new Headers();

        let response, data;

        try {
            response = await fetch(request, {
                headers,
                method: 'GET',
                mode: 'cors'
            });
        } catch (error) {
            let errMsg = `WebApi:getResource: network error while fetching ${requestURL}`;

            if (error && error.message) {
                throw new Error(`${errMsg}: ${error.message}`);
            }

            throw new Error(errMsg);
        }

        try {
            data = await response.json();
        } catch (err) { }

        if (!response.ok) {
            let errMsg = `WebApi:getResource: abnormal status code ${response.status} for ${requestURL}`;

            if (data && data.status_message) {
                errMsg += `: ${data.status_message}`;
            }

            throw new Error(errMsg);
        }

        return data;
    }
}
