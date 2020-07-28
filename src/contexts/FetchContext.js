import React, { useContext, createContext } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useAuth } from "./AuthContext";

const FetchContext = createContext();

const useFetch = () => {
    const context = useContext(FetchContext);
    if (context === undefined) {
        throw new Error("useFetch must be used within a FetchProvider");
    }

    return [
        context.authAxios
    ];
}

const FetchProvider = ({ children }) => {
    const [ authState ] = useAuth();

    const authAxios = axios.create({
        baseURL: API_URL
    });

    authAxios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${authState.accessToken}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    return (
        <FetchContext.Provider
            value={{
                authAxios
            }}
        >
            {children}
        </FetchContext.Provider>
    )
};

export { FetchProvider, useFetch };
