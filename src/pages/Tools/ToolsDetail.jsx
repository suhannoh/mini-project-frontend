
import UsersDetail from './UsersDetail';
import BackBtn from '../../components/button/BackBtn';
import { useEffect, useState } from 'react';
import AuthStore from '../../store/AuthStore';
import NoticeDetail from './adminmenu/NoticeDetail';

export default function ToolsDetail() {
	// URL 파라미터에서 type 값을 추출
	const [status , setStatus] = useState("users");
	const {setDarkTheme} = AuthStore();

	useEffect(() => {
		setDarkTheme();
	} ,[])
	const detailList = {
		users : <UsersDetail />,
		notice : <NoticeDetail />
	}

	return (
		<div className='full__display'>
		<div className='admin__wrap'>
			<aside className='admin__sidebar'>
				<BackBtn />
				<br /> <br />
				<button className={status === "notice" ? "active" : ""}
								onClick={() => setStatus("notice")}>📢 &nbsp; 공지 관리 </button><div className='aside-bar'></div>
				<button className={status === "users" ? "active" : ""}
								onClick={() => setStatus("users")}>🙋🏻 &nbsp; 회원 관리 </button><div className='aside-bar'></div>
				<button className={status === "posts" ? "active" : ""}
								onClick={() => setStatus("posts")}>📝 &nbsp; 게시글 관리 </button><div className='aside-bar'></div>
				<button className={status === "links" ? "active" : ""}
								onClick={() => setStatus("links")}>🔗 &nbsp; 링크 관리 </button><div className='aside-bar'></div>
			</aside>
			<div className='admin__detail'>
				<header>
					<h2>관리자 페이지</h2>
				</header>
				<div>
						{detailList[status] ?? <div>존재하지 않는 도구입니다</div>}
				</div>
			</div>

				
		</div>
		</div>
	);
}
