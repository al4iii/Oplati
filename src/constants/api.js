import { encode } from 'base-64';

export const API_URL = 'https://lk.kvp24.ru/api/'
export const TOKEN_URL = 'https://lk.kvp24.ru/api/oauth/token';
const clientId = 'k24-test'
const clientSecret = '050e1e2c-cdb4-47ca-b698-bf8fbf9a6ae1'
export const basicAuth = 'Basic ' + encode(`${clientId}:${clientSecret}`)

export default {
    API_URL,
    TOKEN_URL,
    basicAuth,
};