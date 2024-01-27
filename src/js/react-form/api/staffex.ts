import axios from 'axios';
import { STAFFEX_GOOGLE_AUTH } from '../constants/urls';

export type TStaffexAuthResponse = {
    email: string;
    accessToken: string;
    refreshToken: string;
};

export type TStaffexAuthPayload = {
    code: string;
};

export const staffexApi = {
    postGoogleAuth: (payload: TStaffexAuthPayload) => axios.post<TStaffexAuthResponse>(STAFFEX_GOOGLE_AUTH, payload),
    postZoomAuth: (payload: TStaffexAuthPayload) => axios.post<TStaffexAuthResponse>(STAFFEX_GOOGLE_AUTH, payload),
};
