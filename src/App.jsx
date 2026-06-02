import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────── */
const data = {
  name: "Fred Feng",
  title: "Full Stack Engineer · Director's Assistant",
  email: "fred.feng0326@gmail.com",
  phone: "852-69918201",
  linkedin: "https://www.linkedin.com/in/fred-feng288770121/",
  github: "https://github.com/fredfeng0326",
  blog: "https://www.jianshu.com/u/5477c74e8b7c",
  summary: `Recently served as a Director's Assistant with strong experience in project coordination and team communication, working closely with AI server suppliers from software, hardware and trade dimensions. Accomplished Software Engineer specializing in machine learning with over 8 years of full-stack development experience, having built gaming platforms, crypto trading systems, wallets, LLM chatbots, RAG systems and AI agents.`,
  openSource: [
    { name: "MCP Stock Tracking Tool", tech: "Spring AI · Java", url: "https://github.com/fredfeng0326/US-STOCK-CHECK" },
    { name: "A2A Multi-Agent System", tech: "Python · A2A Protocol", url: "https://github.com/fredfeng0326/a2a-multiple-agent" },
  ],
  skills: [
    { cat: "Client-Side", items: ["React", "Vue", "NextJS", "HTML/CSS", "Streamlit", "Vercel"] },
    { cat: "Server-Side", items: ["Node.js", "NestJS", "Python", "Flask", "Django"] },
    { cat: "Database", items: ["PostgreSQL", "Elasticsearch", "MongoDB", "GraphQL", "Neo4j"] },
    { cat: "Infra", items: ["Docker", "CI/CD", "Git", "AWS", "Azure", "Microservices"] },
    { cat: "AI Development", items: ["Machine Learning", "NLP", "LLM", "RAG", "LangChain", "MCP", "Generative AI"] },
  ],
  experience: [
    {
      role: "Director's Assistant",
      company: "NX Electronics Limited",
      location: "Hong Kong",
      period: "2024.08 — 2026.01",
      bullets: [
        "Architected a secure RAG system using LLMs, LangChain, and MCP via Python & Node.js; deployed local models via Open WebUI with Telegram Bot integration.",
        "Led 4-member IT team: migrated SVN → GitLab, implemented SOP, Boards, CI/CD pipelines and automated testing, accelerating delivery.",
        "Oversaw operations and cross-office coordination for Taiwan and Shenzhen branches.",
      ],
    },
    {
      role: "Software Engineer — Machine Learning",
      company: "Dreams-AI",
      location: "Hong Kong & UK",
      period: "2019.10 — 2024.05",
      bullets: [
        "Email classification & extraction platform using BERT and LSTM with Vue frontend.",
        "Image recognition AI (YOLO, RNN) for poker card suit detection.",
        "Blockchain crypto trading platform and NFT wallet — full-stack front and back.",
        "Gaming management platform — participated in both frontend and backend work.",
      ],
      stack: ["Vue", "React", "NextJS", "Node.js", "NestJS", "Python", "Postgres", "Elasticsearch", "GraphQL", "Redis", "Docker", "AWS"],
    },
    {
      role: "Big Data Programmer",
      company: "Y Investment Limited",
      location: "Hong Kong",
      period: "2018.01 — 2019.10",
      bullets: [
        "Developed blockchain crypto trading system full-stack (Vue, Python/Flask).",
        "Designed quantitative trading strategies, data collection and analysis.",
        "Applied AI algorithms to predict token prices and analyse news sentiment.",
      ],
    },
    {
      role: "Consultant",
      company: "Introv Limited",
      location: "Hong Kong",
      period: "2016.04 — 2017.08",
      bullets: [
        "Designed and developed ERP systems and apps using NetSuite and Salesforce.",
        "Built cross-platform mobile apps (iOS & Android) via Kony Visualizer for Swire and others.",
      ],
    },
  ],
  education: [
    { degree: "MSc Electronic and Information Engineering", school: "City University of Hong Kong", period: "2014 — 2015" },
    { degree: "BSc Information Engineering", school: "Wuhan University of Technology", period: "2010 — 2014" },
  ],
  languages: ["Chinese (Mandarin)", "Chinese (Cantonese)", "English"],
};

/* ─── STYLES ────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Lato:ital,wght@0,300;0,400;1,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { height: 100%; overflow: hidden; }

:root {
  --bg: #0a0a0f;
  --surface: #111118;
  --line: rgba(255,255,255,0.07);
  --accent: #00e5b0;
  --accent2: #7b61ff;
  --text: #e8e6f2;
  --muted: rgba(232,230,242,0.45);
  --font-display: 'Syne', sans-serif;
  --font-body: 'Lato', sans-serif;
}

.app { width: 100vw; height: 100vh; position: relative; overflow: hidden; background: var(--bg); }

/* ── Canvas BG ── */
.bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

/* ── Pages ── */
.page {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  z-index: 1;
}
.page.hidden { opacity: 0; pointer-events: none; transform: translateY(30px); }
.page.visible { opacity: 1; transform: translateY(0); }

/* ── INTRO PAGE ── */
.intro {
  flex-direction: column;
  text-align: center;
  gap: 0;
}
.intro-tag {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeUp 0.6s 0.2s forwards;
}
.intro-name {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 800;
  line-height: 0.9;
  color: #fff;
  letter-spacing: -0.03em;
  opacity: 0;
  animation: fadeUp 0.7s 0.4s forwards;
}
.intro-name span { color: var(--accent); }
.intro-title {
  font-family: var(--font-body);
  font-size: clamp(0.85rem, 2vw, 1.05rem);
  font-weight: 300;
  color: var(--muted);
  margin-top: 1.5rem;
  letter-spacing: 0.05em;
  opacity: 0;
  animation: fadeUp 0.7s 0.6s forwards;
}
.intro-line {
  width: 1px;
  height: 0;
  background: linear-gradient(to bottom, var(--accent), transparent);
  margin: 2.5rem auto;
  animation: growLine 0.8s 0.9s forwards;
}
.enter-btn {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bg);
  background: var(--accent);
  border: none;
  padding: 14px 40px;
  cursor: pointer;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  transition: background 0.2s, transform 0.15s;
  opacity: 0;
  animation: fadeUp 0.6s 1.1s forwards;
}
.enter-btn:hover { background: #fff; transform: scale(1.03); }

.grid-lines {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
}

.orb {
  position: fixed; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0;
}
.orb-1 { width: 500px; height: 500px; background: rgba(0,229,176,0.08); top: -100px; left: -100px; animation: drift1 12s ease-in-out infinite alternate; }
.orb-2 { width: 400px; height: 400px; background: rgba(123,97,255,0.1); bottom: -80px; right: -80px; animation: drift2 10s ease-in-out infinite alternate; }

/* ── CV PAGE ── */
.cv-page {
  align-items: flex-start;
  overflow-y: auto;
  padding: 3rem 2rem;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}
.cv-wrap {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
}
.cv-sidebar { display: flex; flex-direction: column; gap: 2rem; position: sticky; top: 0; height: fit-content; }
.cv-main { display: flex; flex-direction: column; gap: 2.5rem; }

.cv-name {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -0.02em;
}
.cv-name-accent { color: var(--accent); }
.cv-role {
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent2);
  margin-top: 6px;
  font-weight: 400;
}

.s-label {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  border-bottom: 1px solid var(--line);
  padding-bottom: 6px;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.contact-list { display: flex; flex-direction: column; gap: 7px; }
.contact-row {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-body);
  font-size: 0.75rem; color: var(--muted);
  text-decoration: none;
  transition: color 0.15s;
  word-break: break-all;
}
.contact-row:hover { color: var(--accent); }
.contact-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

.skill-group { margin-bottom: 0.9rem; }
.skill-cat { font-size: 0.65rem; color: var(--muted); font-family: var(--font-body); letter-spacing: 0.1em; margin-bottom: 5px; text-transform: uppercase; }
.skill-pills { display: flex; flex-wrap: wrap; gap: 5px; }
.pill {
  font-size: 0.65rem; font-family: var(--font-body);
  padding: 3px 9px; border-radius: 2px;
  background: rgba(0,229,176,0.06);
  border: 0.5px solid rgba(0,229,176,0.2);
  color: rgba(0,229,176,0.85);
  letter-spacing: 0.04em;
  transition: background 0.15s;
}
.pill:hover { background: rgba(0,229,176,0.15); }

.lang-list { display: flex; flex-direction: column; gap: 5px; }
.lang-item { font-size: 0.78rem; color: var(--muted); font-family: var(--font-body); font-weight: 300; }

.edu-item { margin-bottom: 1rem; }
.edu-degree { font-size: 0.82rem; color: var(--text); font-family: var(--font-body); font-weight: 400; line-height: 1.4; }
.edu-school { font-size: 0.72rem; color: var(--muted); margin-top: 2px; font-style: italic; }
.edu-period { font-size: 0.65rem; color: rgba(255,255,255,0.25); margin-top: 2px; }

/* Main sections */
.section-head {
  font-family: var(--font-display);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 1.25rem;
}
.section-head::after { content: ''; flex: 1; height: 1px; background: var(--line); }

.summary-text {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.8;
  font-weight: 300;
}

.exp-item {
  border-left: 1px solid var(--line);
  padding-left: 1.25rem;
  margin-bottom: 2rem;
  position: relative;
  transition: border-color 0.2s;
}
.exp-item:hover { border-color: var(--accent); }
.exp-item::before {
  content: '';
  position: absolute; left: -4px; top: 6px;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--bg);
  border: 1.5px solid var(--accent2);
  transition: background 0.2s;
}
.exp-item:hover::before { background: var(--accent); border-color: var(--accent); }

.exp-header { display: flex; justify-content: space-between; align-items: flex-start; }
.exp-role { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: #fff; }
.exp-company { font-size: 0.75rem; color: var(--accent2); font-family: var(--font-body); margin-top: 2px; letter-spacing: 0.06em; }
.exp-period { font-size: 0.68rem; color: var(--muted); font-family: var(--font-body); font-style: italic; white-space: nowrap; margin-left: 1rem; padding-top: 3px; }
.exp-bullets { margin-top: 10px; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.exp-bullets li { font-size: 0.8rem; color: var(--muted); font-family: var(--font-body); font-weight: 300; line-height: 1.65; padding-left: 14px; position: relative; }
.exp-bullets li::before { content: ''; position: absolute; left: 0; top: 10px; width: 6px; height: 1px; background: var(--accent); }
.exp-stack { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px; }
.exp-tag { font-size: 0.62rem; color: rgba(255,255,255,0.3); border: 0.5px solid rgba(255,255,255,0.1); padding: 2px 7px; border-radius: 2px; font-family: var(--font-body); }

.oss-list { display: flex; flex-direction: column; gap: 10px; }
.oss-card {
  border: 0.5px solid var(--line);
  padding: 12px 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-decoration: none;
  display: block;
}
.oss-card:hover { border-color: var(--accent); background: rgba(0,229,176,0.03); }
.oss-name { font-family: var(--font-display); font-size: 0.88rem; font-weight: 700; color: #fff; }
.oss-tech { font-size: 0.7rem; color: var(--accent); font-family: var(--font-body); margin-top: 3px; }
.oss-url { font-size: 0.68rem; color: rgba(255,255,255,0.25); margin-top: 2px; font-family: var(--font-body); }

.back-btn {
  position: fixed; top: 1.5rem; left: 1.5rem; z-index: 10;
  font-family: var(--font-display);
  font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--muted);
  background: transparent;
  border: 0.5px solid var(--line);
  padding: 8px 16px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.back-btn:hover { color: var(--accent); border-color: var(--accent); }

/* ── Keyframes ── */
@keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
@keyframes growLine { from { height: 0; } to { height: 60px; } }
@keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px,40px) scale(1.1); } }
@keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px,-60px) scale(1.15); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }

.ticker {
  position: fixed; bottom: 0; left: 0; right: 0;
  border-top: 1px solid var(--line);
  overflow: hidden; height: 32px;
  display: flex; align-items: center;
  background: var(--bg);
  z-index: 5;
}
.ticker-inner {
  display: flex; gap: 4rem; white-space: nowrap;
  animation: ticker 28s linear infinite;
  font-family: var(--font-body); font-size: 0.65rem; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.2); text-transform: uppercase;
}
.ticker-inner span { color: var(--accent); }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
`;

const tickerItems = [
  "Full Stack Engineer", "·", "Machine Learning", "·", "RAG Systems", "·",
  "LangChain", "·", "MCP", "·", "React", "·", "Node.js", "·", "Python", "·",
  "Docker", "·", "AWS", "·", "LLM", "·", "AI Agents", "·", "Blockchain", "·",
  "Full Stack Engineer", "·", "Machine Learning", "·", "RAG Systems", "·",
  "LangChain", "·", "MCP", "·", "React", "·", "Node.js", "·", "Python", "·",
];

/* ─── CANVAS ANIMATION ──────────────────────────────────── */
function useParticles(canvasRef, active) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const N = 60;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,176,${p.alpha})`;
        ctx.fill();
      });
      // connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,176,${0.06 * (1 - dist/120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("intro");
  const canvasRef = useRef(null);
  useParticles(canvasRef, true);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <canvas className="bg-canvas" ref={canvasRef} />
        <div className="grid-lines" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* ── INTRO ── */}
        <div className={`page intro ${page === "intro" ? "visible" : "hidden"}`}>
          <div className="intro-tag">Portfolio · CV</div>
          <div className="intro-name">
            Fred<br /><span>Feng</span>
          </div>
          <div className="intro-title">Full Stack Engineer · Director's Assistant · AI Builder</div>
          <div className="intro-line" />
          <button className="enter-btn" onClick={() => setPage("cv")}>View CV</button>
        </div>

        {/* ── CV PAGE ── */}
        <div className={`page cv-page ${page === "cv" ? "visible" : "hidden"}`}>
          <button className="back-btn" onClick={() => setPage("intro")}>← Back</button>
          <div className="cv-wrap">
            {/* Sidebar */}
            <aside className="cv-sidebar">
              <div>
                <div className="cv-name">Fred<br /><span className="cv-name-accent">Feng</span></div>
                <div className="cv-role">Full Stack Engineer · AI</div>
              </div>

              <div>
                <div className="s-label">Contact</div>
                <div className="contact-list">
                  {[
                    { label: data.phone, href: `tel:${data.phone}` },
                    { label: data.email, href: `mailto:${data.email}` },
                    { label: "LinkedIn", href: data.linkedin },
                    { label: "GitHub", href: data.github },
                    { label: "Blog / Jianshu", href: data.blog },
                  ].map(c => (
                    <a key={c.label} className="contact-row" href={c.href} target="_blank" rel="noopener noreferrer">
                      <span className="contact-dot" />
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="s-label">Skills</div>
                {data.skills.map(sg => (
                  <div className="skill-group" key={sg.cat}>
                    <div className="skill-cat">{sg.cat}</div>
                    <div className="skill-pills">{sg.items.map(s => <span className="pill" key={s}>{s}</span>)}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="s-label">Education</div>
                {data.education.map(e => (
                  <div className="edu-item" key={e.school}>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-period">{e.period}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="s-label">Languages</div>
                <div className="lang-list">{data.languages.map(l => <div className="lang-item" key={l}>{l}</div>)}</div>
              </div>
            </aside>

            {/* Main */}
            <main className="cv-main">
              <div>
                <div className="section-head">Profile</div>
                <p className="summary-text">{data.summary}</p>
              </div>

              <div>
                <div className="section-head">Open Source</div>
                <div className="oss-list">
                  {data.openSource.map(p => (
                    <a className="oss-card" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
                      <div className="oss-name">{p.name}</div>
                      <div className="oss-tech">{p.tech}</div>
                      <div className="oss-url">{p.url}</div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="section-head">Experience</div>
                {data.experience.map(exp => (
                  <div className="exp-item" key={exp.company + exp.period}>
                    <div className="exp-header">
                      <div>
                        <div className="exp-role">{exp.role}</div>
                        <div className="exp-company">{exp.company} · {exp.location}</div>
                      </div>
                      <div className="exp-period">{exp.period}</div>
                    </div>
                    <ul className="exp-bullets">
                      {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                    {exp.stack && (
                      <div className="exp-stack">
                        {exp.stack.map(t => <span className="exp-tag" key={t}>{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>

        {/* Ticker */}
        <div className="ticker">
          <div className="ticker-inner">
            {tickerItems.map((t, i) => t === "·" ? <span key={i}>·</span> : <span key={i} style={{color:"rgba(255,255,255,0.2)"}}>{t}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}
