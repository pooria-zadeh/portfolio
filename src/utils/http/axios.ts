import axios from 'axios';

const HOST = 'https://aps-volynt-dev.azurewebsites.net';

const TIMEOUT_DELAY = 20000;

const httpClient = axios.create({
    baseURL: HOST
});

httpClient.defaults.headers['Content-Type'] = 'application/json';
httpClient.defaults.timeout = TIMEOUT_DELAY;


export const getHttpClient = () => {
    return httpClient;
};
