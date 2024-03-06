import { store } from "src/app/store";
import axios, { InternalAxiosRequestConfig } from "axios";
import { reissue, signOut } from "../authApi";
import { URL_INFO } from "src/utils/constant";

export const checkToken = async (config: InternalAxiosRequestConfig) => {
    const at: string | null = store.getState()["auth"].accessToken;

    if (at) {
        config.headers.Authorization = `Bearer ${at}`;
    }

    return config;
};

export const apiErrorResponse = async err => {
    const { config, response } = err;

    console.log(1);
    console.log(config);
    console.log(response);

    //  401에러가 아니거나 재요청이거나 refresh 요청인 경우 그냥 에러 발생
    if (response && (response.status !== 403 || config.sent || config.url === URL_INFO.API_V1.REISSUE_URL)) {
        return Promise.reject(err);
    }

    console.log(2);

    // 재요청 방지
    config.sent = true;

    // 토큰 재발급
    const at = await reissueToken();

    console.log(3);

    if (at) {
        console.log(4);

        store.getState()['auth'].accessToken = at;

        console.log(5);

        config.headers['Authorization'] = `Bearer ${at}`;

        console.log(6);
    }

    console.log(7);

    return axios(config);
}

export const reissueToken = async (): Promise<string | void> => {
    try {
        const res = await reissue();
        return res.data;
    } catch(e) {
        await signOut();
    }
}