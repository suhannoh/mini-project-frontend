import { useNavigate } from 'react-router-dom'
import Layout from '../../layout/Layout'
import './MiniTools.css'
export default function Tools() {
  // 페이지 네비게이트
  const navigate = useNavigate()

  // 툴 목록
  const TOOLS = [
    { type: "adminPage", title: "관리자 페이지", desc: "", icon: "👨🏻‍💼" },
    { type: "coming", title: "준비중", desc: "곧 추가됩니다", icon: "⏳", disabled: true },
  ];


  return (
    <div>
      <Layout>
        <section className="tools-section">
          <h2 className="tools-title">🧪 실험실</h2>

          <ul className="tools-grid">
            {/* 툴 목록 */}
            {TOOLS.map(t => (
              <li key={t.type} className={`tool-card spin-wrap ${t.disabled ? "disabled" : ""}`}
                  onClick={() => !t.disabled && navigate(`/tools/${t.type}`)} role="button"
                  tabIndex={0} onKeyDown={(e) => { if (!t.disabled && (e.key === "Enter" || e.key === " "))
                                                       navigate(`/tools/${t.type}`);
                }}>
                <div className="tool-icon spin-icon">{t.icon}</div>
                <div className="tool-title">{t.title}</div>
                <div className="tool-desc">{t.desc}</div>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </div>
  )
}
