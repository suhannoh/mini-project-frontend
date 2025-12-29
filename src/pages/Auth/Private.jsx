import BackBtn from '../../components/button/BackBtn';
import AuthStore from '../../store/AuthStore';
import { Outlet } from 'react-router-dom';

export default function Private() {
    // 전역 상태에서 로그인 여부 확인
    const isLogin = AuthStore.getState().isLogin;
    
    // 로그인 상태에 따라 접근 제어
    return isLogin ? <Outlet /> : 
    <div>
        <BackBtn navi={"/"} /><br /><br />
        <h1> 잘못된 접근입니다, 로그인 후 사용해주세요 😅  </h1>
    </div>;
}
