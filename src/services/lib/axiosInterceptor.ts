import { InternalAxiosRequestConfig } from "axios";
import { reissue } from "../authApi";
import apiClient from "./mitdAxios";
import { logOutAsync } from "../../features/auth/authSlice";

export const checkToken = async (config: InternalAxiosRequestConfig) => {
    return config;
};

export const apiErrorResponse = async err => {
    const { config, response } = err;

    if (response && response.status === 401) {
        // reissue
        const at = await reissueToken();

        if (at) {
            apiClient.defaults.headers['Authorization'] = `Bearer ${at}`;

            return await apiClient(config);
        }
        else {
            return logOutAsync();
        }
    }

    return Promise.reject(err);
}

export const reissueToken = async (): Promise<string | void> => {
    const res = await reissue();
    return res.data;
}