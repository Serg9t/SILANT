import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"

const api = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
});

api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        console.log('Авторизируйтесь')
      }
      return Promise.reject(error);
    }
  );

export default api;