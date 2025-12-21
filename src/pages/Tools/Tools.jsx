import { useNavigate } from 'react-router-dom'
import Layout from '../../layout/Layout'
import './MiniTools.css'
export default function Tools() {

  const navigate = useNavigate()

  const TOOLS = [
    { type: "calculator", title: "계산기", desc: "간단 계산 / %", icon: "🧮" },
    { type: "exchange", title: "환율 계산", desc: "KRW ↔ USD", icon: "💱"  , disabled: true},
    { type: "weather", title: "현재 날씨", desc: "내 위치 기준", icon: "🌦️" , disabled: true},
    { type: "coming", title: "준비중", desc: "곧 추가됩니다", icon: "⏳", disabled: true },
  ];


  return (
    <div>
      <Layout>
        <section className="tools-section">
          <h2 className="tools-title">🧪 실험실</h2>

          <ul className="tools-grid">
            {TOOLS.map(t => (
              <li
                key={t.type}
                className={`tool-card ${t.disabled ? "disabled" : ""}`}
                onClick={() => !t.disabled && navigate(`/tools/${t.type}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (!t.disabled && (e.key === "Enter" || e.key === " ")) navigate(`/tools/${t.type}`);
                }}
              >
                <div className="tool-icon">{t.icon}</div>
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
