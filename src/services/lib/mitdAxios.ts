import { CONSTANTS } from "src/utils/constant";
import { checkToken } from "./axiosInterceptor";
import axios from "axios";

const apiClient = axios.create();

apiClient.defaults.baseURL = CONSTANTS.API_V1_BASE_URL;
apiClient.defaults.headers["Accept"] = "application/json";
apiClient.interceptors.request.use(checkToken);
axios.defaults.withCredentials = true;

export default apiClient;