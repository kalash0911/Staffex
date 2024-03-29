// APIs:
// TODO: change to deployed url:
export const STAFFEX_BASE_URL = 'c8ed-2a01-4f8-c013-90b-00-1.ngrok-free.app';
export const STAFFEX_API = `https://${STAFFEX_BASE_URL}`;
export const STAFFEX_WEB_SOCKET_URL = `wss://${STAFFEX_BASE_URL}/ws/leantech/entity`;
export const STAFFEX_GOOGLE_AUTH = `${STAFFEX_API}/auth/google`;
export const STAFFEX_ZOOM_AUTH = `${STAFFEX_API}/auth/zoom`;
export const STAFFEX_MICROSOFT_AUTH = `${STAFFEX_API}/auth/microsoft`;
export const STAFFEX_CREATE_BANK_CUSTOMER_URL = `${STAFFEX_API}/leantech/create-customer`;
export const STAFFEX_FORM_URL = `${STAFFEX_API}/form`;
export const STAFFEX_EXIST_EMAIL_URL = `${STAFFEX_FORM_URL}/exist-email`;
export const STAFFEX_CONNECT_DB = `${STAFFEX_API}/db/check`;
export const MOCK_API = 'https://jsonplaceholder.typicode.com/posts';
