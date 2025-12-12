import React, { useEffect, useState } from 'react'
import AuthStore from '../store/AuthStore'
import './Linkspage.css';
import axios from 'axios';
import LinkCard from '../components/LinkCard';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../components/BackBtn';
import { API_BASE } from '../config/env';

export default function LinksPage() {
    const navigate = useNavigate();
    const [loadList, setList] = useState([]);
    // const [error , setError] = useState(null);
    const [load, setLoad] = useState(true);


    const addLink = {
        id: 0,
        user_name: "add Link",
    }

    useEffect(() => {
        const getList = async () => {

            try {
                const res = await axios.get(`${API_BASE}/user/links`);
                setList(res.data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoad(false);
            }
        };
        getList();
    }, []);

    if (load) return <p> Loading...</p>;

    return (
        <div>
            <BackBtn />
            <div className='link-page-wrap'>
                <div>
                    <div className='link-left-top'>
                        <ul className='link-list' >
                            <LinkCard onClick={() => navigate("/links/new")} key={addLink.id} link={addLink}  />
                            {loadList.map(link => (
                                <LinkCard key={link.id} link={link} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <button id='logout-btn'>logout</button>
        </div>
    )
}
