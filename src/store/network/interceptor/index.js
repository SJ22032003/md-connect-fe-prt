import axios from "axios";
import { user_type } from "../../../constant/user";

export const isHandlerEnabled = (config = {}) =>
  !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);

export const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    let Token = null;

    const invokedPath = window.location.pathname.split("/");
    for(let i = 0; i < invokedPath.length; i++) {
      if(user_type[invokedPath[i].toUpperCase()]) {
        Token = JSON.parse(localStorage.getItem(invokedPath[i]))?.auth_token;
        break;
      }
    }
    
    if (Token) {
      request.headers.Authorization = `Bearer ${Token}`;
    }
  }
  return request;
};

export const successHandler = (response) => {
  return response;
};
let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

export const errorHandler = (error) => {
  console.log(error, "error");
  if (isHandlerEnabled(error.config)) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (!isRefreshing) {
        window.location.href = "/error404";
        isRefreshing = true;
      }
      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = token;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    }
  }
  return Promise.reject({ ...error });
};
