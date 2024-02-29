import { store } from "src/app/store";
import { InternalAxiosRequestConfig } from "axios";

export const checkToken = async (config: InternalAxiosRequestConfig) => {
    config.headers['access_token'] = store.getState()["auth"].accessToken;
    return config;
}