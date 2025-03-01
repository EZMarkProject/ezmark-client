import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_HOST } from "./host";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { ErrorResponse } from "@/types";

/**
 * Custom Axios instance for API requests
 */
export const axiosInstance = axios.create({
    baseURL: API_HOST,
});


/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError<ErrorResponse>) => {
        toast({
            variant: "destructive",
            title: error.response?.data.error.name,
            description: error.response?.data.error.message || "Failed to send request",
            duration: 2000
        });
        return Promise.reject(error);
    }
);

/**
 * 响应拦截器
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError<ErrorResponse>) => {

        /**
         * Unauthorized error
         * 清理cookie, 重新登录
         */
        if (error.response?.status === 401) {
            Cookies.remove("jwt");
            window.location.href = "/auth/login";
            toast({
                variant: "destructive",
                title: error.response?.data.error.name,
                description: "Session expired, please login again",
                duration: 2000
            });
        } else {
            // 其他错误
            toast({
                variant: "destructive",
                title: error.response?.data.error.name,
                description: error.response?.data.error.message || "Failed to send request",
                duration: 2000
            });
        }

        return Promise.reject(error);
    }
);