import axios, {AxiosRequestConfig} from "axios";
import Cookies from "js-cookie";

const client = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

client.interceptors.request.use(async (config: AxiosRequestConfig) => {

    config.headers ||= {};
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    const token = Cookies.get("pits_access_token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

export default client;
