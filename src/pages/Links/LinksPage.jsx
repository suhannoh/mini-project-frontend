import React, { useEffect, useState } from 'react'
import AuthStore from '../../store/AuthStore'
import './Linkspage.css';
import axios from 'axios';
import LinkCard from '../../components/LinkCard';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../components/BackBtn';
import { API_BASE } from '../../config/env';
import LogoutBtn from '../../components/LogoutBtn';
import LinkStore from '../../store/LinkStore';

export default function LinksPage() {
    const navigate = useNavigate();
    const {user} = AuthStore();
    const {linkStore , setLinkStore } = LinkStore();
    const [loadList, setList] = useState([]);
    // const [error , setError] = useState(null);
    const [load, setLoad] = useState(true);
    // const [myLink, setMyLink] = useState(false);


    const addLink = { id: "add", user_name: "New Link"}
    const setLink = { id: "set", user_name: "Set My Link"}

    useEffect(() => {
        const getList = async () => {

            try {
                const res = await axios.get(`${API_BASE}/user/links`);
                setList(res.data);
                const myLink = res.data.find(li => li.user_id === user.id);
                setLinkStore(myLink);
            } catch (e) {
                console.log(e);
            } finally {
                setLoad(false);
            }
        };
        getList();
    }, [user?.id, setLinkStore]);

    if (load) return <p> Loading...</p>;
    return (
        <div>
            <BackBtn />
            <div className='link-page-wrap'>
                    <div className='link-w'>
                        <ul className='link-list' >
                            <div className='point-border'>
                            {!linkStore ? <LinkCard onClick={() => navigate("/links/new")} key={addLink.id} link={addLink} /> 
                                    : <LinkCard onClick={() => navigate("/links/new")} key={setLink.id} link={setLink} /> }
                            </div>
                            {loadList.map(link => (
                                <LinkCard key={link.id} link={link} />
                            ))}
                        </ul>
                    </div>
            </div>
            <LogoutBtn navi="/main" />
        </div>
    )
}
