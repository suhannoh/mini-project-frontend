import './comp.css'

export default function LinkCard({ link , onClick}) {
    return (
        <li className='card' style={{
            border: (link.id == 0) ? "1px solid white" : "none"
        }}  onClick={onClick ? onClick : undefined}>
            <div className="card-title">
                <h2> {link.user_name}</h2>
            </div>
            <div className='card-content'>
                <ul className='flex-link-box'>
                    {link.gitHubUrl ? <li className='link-box'> 
                        <a href={link.gitHubUrl} target="_blank" rel="noopener noreferrer">github</a></li> : ""}     
                    {link.notionUrl ? <li className='link-box'> 
                        <a href={link.notionUrl} target="_blank" rel="noopener noreferrer">notion</a></li> : ""}     
                </ul>
            </div>
        </li>
    )
}
