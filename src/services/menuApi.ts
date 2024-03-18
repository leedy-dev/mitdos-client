import { AxiosPromise } from "axios";
import apiClient from "./lib/mitdAxios";
import { URL_INFO } from "../utils/constant";
import { MenuSearchData } from "../models/datas/dataModel";

export const getMenuList = (data: MenuSearchData): AxiosPromise => {
    return apiClient.get(URL_INFO.API_V1.MENU_URL + '/list/' + data.auth, { params: data });
};
