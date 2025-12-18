import { useEffect, useState } from 'react'
import AuthStore from '../../store/AuthStore'
import './Linkspage.css';
import axios from 'axios';
import LinkCard from '../../components/LinkCard';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../config/env';
import LinkStore from '../../store/LinkStore';
import Layout from '../../layout/Layout';

export default function LinksPage() {
	const navigate = useNavigate();
	const { user } = AuthStore();
	const { linkStore, setLinkStore } = LinkStore();
	const [linkList, setLinkList] = useState([]);
	const [load, setLoad] = useState(true);
	const addLink = { id: "add", user_name: "New Link" }
	const setLink = { id: "set", user_name: "Set My Link" }

	useEffect(() => {	
		if(!user?.id) {
			setLoad(false);
			return;
		}

		const getList = async () => {

			try {
				const res = await axios.get(`${API_BASE}/user/links`);
				setLinkList(res.data);

				const myLink = res.data.find(li => li.user_id === user.id);
				setLinkStore(myLink);
			} catch (e) {
				const status = e.response?.status;
				const code = e.response?.data?.code;
				const message = e.response?.data?.msg;
				console.log(status, code, message);
				alert(message);
			} finally {
				setLoad(false);
			}
		};
		getList();
	}, [user?.id]);

	if (load) return <p> Loading...</p>;
	return (
		<div>
			<Layout>
					<div className='links-wrap'>
						<ul className='link-card-ul' >
							<div className="point-border">
								{!linkStore ? <LinkCard onClick={() => navigate("/links/new")} key={addLink.id} link={addLink} />
														: <LinkCard onClick={() => navigate("/links/new")} key={setLink.id} link={setLink} />}
							</div>
							{linkList.map(link => (
								<LinkCard key={link.id} link={link} />
							))}
						</ul>
					</div>
			</Layout>
		</div>
	)
}
