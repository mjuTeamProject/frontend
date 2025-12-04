import axios from 'axios';

// 백엔드 API 주소 (FastAPI 기본 포트)
const BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: 로컬 스토리지에 토큰이 있다면 헤더에 자동 추가
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 401 에러(인증 만료) 시 처리 로직 등을 추가할 수 있음
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // 예: 토큰 만료 시 로그인 페이지로 리다이렉트 등의 로직 가능
        return Promise.reject(error);
    }
);

export default api;