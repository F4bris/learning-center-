import axios from 'axios';

const platformApi = import.meta.env.VITE_PLATFORM_API_URL;

export class BaseApi {
    #http;

    constructor(baseUrl = platformApi) {
        this.#http = axios.create({
            baseURL: baseUrl,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    get http() {
        return this.#http;
    }
}