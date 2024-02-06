import axios from 'axios';
import { MOCK_API, STAFFEX_GOOGLE_AUTH, STAFFEX_ZOOM_AUTH } from '../constants/urls';
import { TCommonFormValues, TDataBase } from '../models/form';

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
    postZoomAuth: (payload: TStaffexAuthPayload) => axios.post<TStaffexAuthResponse>(STAFFEX_ZOOM_AUTH, payload),
    connectDataBase: (payload: TDataBase) => axios.post(MOCK_API, payload),
    postAllFormData: (payload: TCommonFormValues) => axios.post(MOCK_API, payload),
};
