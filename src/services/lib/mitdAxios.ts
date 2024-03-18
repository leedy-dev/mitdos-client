import { CONSTANTS } from "src/utils/constant";
import { apiErrorResponse } from "./axiosInterceptor";
import axios from "axios";

const apiClient = axios.create();

apiClient.defaults.baseURL = CONSTANTS.API_V1_BASE_URL;
apiClient.defaults.headers["Accept"] = "application/json";
apiClient.defaults.withCredentials = true;

// request
// apiClient.interceptors.request.use(
//     config => checkToken(config),
//     err => Promise.reject(err));

// response
apiClient.interceptors.response.use(
    response => response,
    async err => apiErrorResponse(err)
)

export default apiClient;