import axios from "axios";
import { STAFFEX_GOOGLE_AUTH } from "../constants/urls";

export type TStaffexGoogleAuthResponse = {
    email: string,
    accessToken: string,
    refreshToken: string,
}

export type TStaffexGoogleAuthPayload = {
    code: string;
}

export const staffexApi = {
    postGoogleAuth: (payload: TStaffexGoogleAuthPayload) => axios.post<TStaffexGoogleAuthResponse>(STAFFEX_GOOGLE_AUTH, payload),
}