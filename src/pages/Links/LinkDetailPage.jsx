import Layout from '../../layout/Layout'
import { useLocation } from 'react-router-dom'
import './LinksPage.css'
import AuthStore from '../../store/AuthStore';


export default function LinkDetailPage() {
    const { state } = useLocation();
    const link = state.link;
    const badgeColor = state.badgeColor;
    return (
    <div>
        <Layout>
            <div style={{
                display : "flex", flexDirection : "column",
                alignItems : "center" , justifyContent : "center" , height : "100%",
                gap: "1rem"
                }}>
                <div>
                {link && 
                    <svg viewBox="0 0 24 24" 
                        width="80%" height="80%"
                        className="profile-img">
                    <g fill="currentColor">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4 4-6 8-6s8 2 8 6v1H4z"/>
                    </g>
                    <circle cx="18.5" cy="18.5" r="2.3" fill={badgeColor} />
                    </svg>
                    }
                </div>
                <div>
                    {link.user_name && <h1>{link.user_name}</h1> }
                </div>
                <div>
                    <ul className='flex-link-box'>
                    {link.gitHubUrl ? <li className='link-box'> 
                        <a id='github-link' href={link.gitHubUrl} target="_blank" rel="noopener noreferrer">github</a></li> : ""}     
                    {link.notionUrl ? <li className='link-box'> 
                        <a id='notion-link' href={link.notionUrl} target="_blank" rel="noopener noreferrer">notion</a></li> : ""}     
                    {!link.gitHubUrl && !link.notionUrl && ( 
                        <li className="empty-links" > 
                             <span> 
                            등록된 링크가 없어요
                            </span> 
                        </li> 
                    )}
                    
                </ul>
                </div>
            </div>
        </Layout>
    </div>
  )
}
