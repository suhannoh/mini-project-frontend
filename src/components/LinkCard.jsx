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
                <p>{link.gitHubUrl ? <a href={link.gitHubUrl}>GitHub</a> : ""}</p>
                <br />
                <p>{link.notionUrl ? <a href={link.notionUrl}>Notion</a> : ""}</p>
            </div>
        </li>
    )
}
