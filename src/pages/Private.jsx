import React from 'react'
import AuthStore from '../store/AuthStore';
import { Outlet } from 'react-router-dom';

export default function Private() {
    const isLogin = AuthStore.getState().isLogin;

    return isLogin ? <Outlet /> : <h1> 잘못된 접근입니다, 로그인 후 사용해주세요 😅  </h1>;
}
