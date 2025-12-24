import { useNavigate } from 'react-router-dom'
import './comp.css'
import LinkStore from '../store/LinkStore';

export default function LinkCard({ link , url }) {
    const navigate = useNavigate();
    const {linkStore} = LinkStore();
    return (
        <li className='card'
        onClick={url ? () => navigate(`${url}`)   : () => navigate(`/links/${link.id}` , {
            state: {
                link,
            }
        })}>
            <div className="card-title">
                <h2 style={{
                    fontSize: url ? "1rem" : "1.5rem",
                    whiteSpace: url ? "pre-line" : "nowrap",
                    maxHeight: "1.8rem", height: "1.8rem",
                }}> {link.user_name} </h2>
            </div>
             <div className='card-content'>
            {
            (url && linkStore) ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                    </svg>
            : url ? <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        >
                        <circle cx="12" cy="12" r="9"/>
                        <path d="M12 8v8"/>
                        <path d="M8 12h8"/>
                        </svg>
            :
               
                <svg
                className="profile-img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="100%" height="100%">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>}
            </div>
             
        </li>
    )
}
