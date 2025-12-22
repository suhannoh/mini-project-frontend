import { useEffect, useState } from 'react'
import AuthStore from '../../store/AuthStore'
import './Linkspage.css';
import LinkCard from '../../components/LinkCard';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../config/env';
import LinkStore from '../../store/LinkStore';
import Layout from '../../layout/Layout';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';

export default function LinksPage() {
	// 네비게이트
	const navigate = useNavigate();
	// 전역 상태
	const { user } = AuthStore();
	// 링크 전역 상태
	const { linkStore, setLinkStore } = LinkStore();
	// 링크 목록
	const [linkList, setLinkList] = useState([]);
	// 로딩 상태
	const [load, setLoad] = useState(true);
	// 추가 및 설정 카드
	const addLink = { id: "add", user_name: "New Link" }
	const setLink = { id: "set", user_name: "Set My Link" }

	useEffect(() => {	
		// 사용자 정보 없으면 종료
		if(!user?.id) {
			setLoad(false);
			return;
		}

		const getList = async () => {
			// 링크 목록 조회
			try {
				const res = await api.get(`/user/links`);
				setLinkList(res.data);// 전체 링크 목록 저장

				// 내 링크 정보 저장
				const myLink = res.data.find(li => li.user_id === user.id);
				//전역 상태에 내 링크 정보 반영
				setLinkStore(myLink);
			} catch (e) {
				logError(e);
			} finally {
				// 로딩 종료
				setLoad(false);
			}
		};
		getList();
		// user 변경 시 다시 호출
	}, [user?.id]);

	// 로딩 중일 때
	if (load) return <p> Loading...</p>;
	return (
		<div>
			<Layout>
					<div className='link__wrap'>
						<ul className='link__card-ul' >
							{/* 링크 추가 및 설정 카드 */}
							<div className="point-border">
								{!linkStore ? <LinkCard onClick={() => navigate("/links/new")} key={addLink.id} link={addLink} />
														: <LinkCard onClick={() => navigate("/links/new")} key={setLink.id} link={setLink} />}
							</div>
							{/* 링크 목록 */}
							{linkList.map(link => (
								<LinkCard key={link.id} link={link} />
							))}
						</ul>
					</div>
			</Layout>
		</div>
	)
}
