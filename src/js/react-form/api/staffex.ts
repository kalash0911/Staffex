import axios from 'axios';
import {
    MOCK_API,
    STAFFEX_CREATE_BANK_CUSTOMER_URL,
    STAFFEX_FORM_URL,
    STAFFEX_GOOGLE_AUTH,
    STAFFEX_ZOOM_AUTH,
} from '../constants/urls';
import { TCommonFormValues, TDataBase } from '../models/form';

export type TStaffexAuthResponse = {
    email: string;
    accessToken: string;
    refreshToken: string;
};

export type TStaffexAuthPayload = {
    code: string;
};

export type TBankCustomerResponse = {
    customer_id: string;
    app_user_id: string;
};

export const staffexApi = {
    postGoogleAuth: (payload: TStaffexAuthPayload) => axios.post<TStaffexAuthResponse>(STAFFEX_GOOGLE_AUTH, payload),
    postZoomAuth: (payload: TStaffexAuthPayload) => axios.post<TStaffexAuthResponse>(STAFFEX_ZOOM_AUTH, payload),
    connectDataBase: (payload: TDataBase) => axios.post(MOCK_API, payload),
    createBankCustomer: () => axios.post<TBankCustomerResponse>(STAFFEX_CREATE_BANK_CUSTOMER_URL),
    postAllFormData: (payload: TCommonFormValues) => axios.post(STAFFEX_FORM_URL, payload),
};
