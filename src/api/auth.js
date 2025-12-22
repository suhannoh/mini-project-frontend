import axios from "axios";
import { API_BASE } from "../config/env";


export const api = axios.create({
  baseURL: API_BASE, // 기본 URL 설정
  withCredentials: true,// 쿠키 전달 설정
});