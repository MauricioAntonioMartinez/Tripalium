import axios, { AxiosInstance } from "axios";
import { NextPageContext } from "next";

let instance: AxiosInstance;

export const buildClient = (req?: NextPageContext["req"]) => {
  instance = axios.create({
    baseURL: req ? "http://flask:5000" : "http://localhost:5000",
    headers: req?.headers,
    withCredentials: true,
  });
  return instance;
};

instance?.interceptors.request.use(
  function (config) {
    config.headers.withCredentials = true;
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
