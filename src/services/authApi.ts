import {AxiosPromise} from "axios";
import {LoginData} from "src/models/datas/dataModel";
import apiClient from "src/services/lib/mitdAxios";
import {URL_INFO} from "src/utils/constant";

export const logIn = (data: LoginData): AxiosPromise => {
    return apiClient.post(URL_INFO.API_V2.LOGIN_URL, { data });
};

export const logOut = (data: LoginData): AxiosPromise => {
    return apiClient.post(URL_INFO.API_V2.LOGOUT_URL, { data });
};