import { getHost } from '../utils/general';

export const ZOOM_API_KEY = 'BOskjakMSp2yQh6WVGz7KQ';
export const ZOOM_REDIRECT_URL = `${getHost()}/success-zoom-auth.html`;
export const ZOOM_AUTH_URL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_API_KEY}&redirect_uri=${ZOOM_REDIRECT_URL}`;
