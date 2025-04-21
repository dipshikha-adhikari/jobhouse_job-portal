/**
 * Application wide configuration.
 */

const schema = 'https://';
const serverUrl = window.location.hostname;
let config = {
    baseURL: import.meta.env.VITE_BASEURL,
};

if (import.meta.env.MODE === 'production') {
    config = {
        baseURL: `${schema + serverUrl}/api/v1/`,
    };
}
export default config;
