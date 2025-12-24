import Layout from '../../layout/Layout'
import { useLocation } from 'react-router-dom'
import './LinksPage.css'
import AuthStore from '../../store/AuthStore';


export default function LinkDetailPage() {
    const { state } = useLocation();
    const link = state.link;
    // const myLink = link.user_id === user.id;

    return (
    <div>
        <Layout>
            <div style={{
                display : "flex", flexDirection : "column",
                alignItems : "center" , justifyContent : "center" , height : "100%",
                gap: "3rem"
                }}>
                <div>
                    상세페이지... 추가예정 ...
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
