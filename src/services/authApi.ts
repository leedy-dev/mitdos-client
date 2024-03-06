import { AxiosPromise } from "axios";
import { LoginData } from "src/models/datas/dataModel";
import apiClient from "src/services/lib/mitdAxios";
import { URL_INFO } from "src/utils/constant";

export const signIn = (data: LoginData): AxiosPromise => {
    return apiClient.post(URL_INFO.API_V1.SIGN_IN_URL, data)
};

export const signOut = () => {
    return apiClient.post(URL_INFO.API_V1.SIGN_OUT_URL);
};

export const reissue = () => {
    return apiClient.post(URL_INFO.API_V1.REISSUE_URL);
}