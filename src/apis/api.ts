import { Cookies } from 'react-cookie';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type APIResponse = {
  success: boolean;
  error: {
    errorCode: string;
    message: string;
  };
};

const cookies = new Cookies();

export const cookieManager = {
  getAuthToken: () => cookies.get(import.meta.env.VITE_AUTH_TOKEN_KEY),
  setAuthToken: (token: string) => cookies.set(import.meta.env.VITE_AUTH_TOKEN_KEY, token),
  removeAuthToken: () => cookies.remove(import.meta.env.VITE_AUTH_TOKEN_KEY),
  getSessionID: () => cookies.get(import.meta.env.VITE_SESSION_ID_KEY),
  setSessionID: (token: string) => cookies.set(import.meta.env.VITE_SESSION_ID_KEY, token),
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COMMERCE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const sendLog = (args: any[]) => {
  // args 배열의 객체를 완전히 펼쳐서 표시하도록 변환
  const processedArgs = args.map((arg) => {
    if (typeof arg === 'object' && arg !== null) {
      return JSON.stringify(arg, null, 2); // depth를 2로 설정하여 보기 좋게 펼침
    }
    return arg;
  });

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3030/__console_log', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ args: processedArgs }));
};

const logRequest = (config: AxiosRequestConfig) => {
  const baseUrl = import.meta.env.VITE_COMMERCE_API_BASE_URL;
  const pathUrl = config.url || '';

  sendLog([
    [
      '\x1b[36m[요청]\x1b[0m', // 시안색
      (config.method?.toUpperCase() === 'GET'
        ? '\x1b[92m' // GET: 연두색
        : config.method?.toUpperCase() === 'POST'
          ? '\x1b[33m' // POST: 주황색
          : config.method?.toUpperCase() === 'PUT'
            ? '\x1b[95m' // PUT: 보라색
            : '\x1b[97m') + // DELETE: 하얀색
        config.method?.toUpperCase() +
        '\x1b[0m',
      '\x1b[90m' +
        baseUrl +
        '\x1b[0m' + // baseURL: 회색
        '\x1b[97m' +
        pathUrl +
        '\x1b[0m', // pathURL: 흰색
    ].join(''),
  ]);
};

const logResponse = (response: AxiosResponse | undefined) => {
  if (!response) {
    sendLog(['\x1b[91m❌ \x1b[0m\x1b[32m[응답]\x1b[0m 에러 발생(no response)']);
    return;
  }

  const { status, statusText, config, data } = response;
  const statusDisplay = statusText ? `(${status}: ${statusText})` : `(${status})`;
  const baseUrl = import.meta.env.VITE_COMMERCE_API_BASE_URL;
  const pathUrl = config.url || '';

  // 에러 상태인 경우 X 이모지 추가
  const errorPrefix = status >= 400 ? '\x1b[91m❌ \x1b[0m' : '';

  sendLog([
    [
      errorPrefix,
      '\x1b[94m[응답]\x1b[0m', // 밝은 파란색
      (config.method?.toUpperCase() === 'GET'
        ? '\x1b[92m' // GET: 연두색
        : config.method?.toUpperCase() === 'POST'
          ? '\x1b[33m' // POST: 주황색
          : config.method?.toUpperCase() === 'PUT'
            ? '\x1b[95m' // PUT: 보라색
            : '\x1b[97m') + // DELETE: 하얀색
        config.method?.toUpperCase() +
        '\x1b[0m',
      '\x1b[90m' +
        baseUrl +
        '\x1b[0m' + // baseURL: 회색
        '\x1b[97m' +
        pathUrl +
        '\x1b[0m', // pathURL: 흰색
      (status >= 200 && status < 300 ? '\x1b[32m' : '\x1b[33m') + statusDisplay + '\x1b[0m',
    ].join(''),
    data && typeof data === 'object' ? JSON.stringify(data, null, 2) : data,
  ]);
};

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  logRequest(config);

  const token = cookieManager.getAuthToken();
  const session = cookieManager.getSessionID();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (session) {
    config.headers['SESSION'] = session;
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    logResponse(response);
    return response;
  },
  (error) => {
    logResponse(error.response);
    return Promise.reject(error);
  },
);

// vite나 node 에러를 위한 console.error 오버라이드
const originalError = console.error;
console.error = function (...args) {
  originalError('\x1b[91m❌\x1b[0m', ...args);
};

export const fetchData = <T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  switch (method) {
    case 'get':
      return axiosInstance.get<T>(url, config).then((resp) => resp.data);
    case 'post':
      return axiosInstance.post<T>(url, data, config).then((resp) => resp.data);
    case 'put':
      return axiosInstance.put<T>(url, data, config).then((resp) => resp.data);
    case 'delete':
      return axiosInstance.delete<T>(url, config).then((resp) => resp.data);
    default:
      throw new Error('Invalid HTTP method');
  }
};
