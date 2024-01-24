import axios from "axios";
import { STAFFEX_GOOGLE_AUTH } from "../constants/urls";

export type TStaffexAuthResponse = {
    email: string,
    accessToken: string,
    refreshToken: string,
}

export type TStaffexGoogleAuthPayload = {
    code: string;
}

export const staffexApi = {
    postGoogleAuth: (payload: TStaffexGoogleAuthPayload) => axios.post<TStaffexAuthResponse>(STAFFEX_GOOGLE_AUTH, payload),
}