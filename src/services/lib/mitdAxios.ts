import { CONSTANTS } from "src/utils/constant";
import { apiErrorResponse, checkToken } from "./axiosInterceptor";
import axios from "axios";

const apiClient = axios.create();

apiClient.defaults.baseURL = CONSTANTS.API_V1_BASE_URL;
apiClient.defaults.headers["Accept"] = "application/json";

// request
apiClient.interceptors.request.use(
    config => checkToken(config),
    err => Promise.reject(err));

// response
// apiClient.interceptors.response.use(
//     response => response,
//     async err => apiErrorResponse(err)
// )

axios.defaults.withCredentials = true;

export default apiClient;