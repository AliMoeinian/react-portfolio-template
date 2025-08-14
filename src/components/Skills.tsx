import React, { useMemo, useState, useEffect } from "react";
import "../assets/styles/Skills.scss";
import skillsData from "../data/skillsData.json";

// نوع داده
type SkillItem = { name: string; icon?: string };
type SkillGroup = { category: string; items: SkillItem[] };

const ICON = {
  // ساده و سبک؛ می‌تونی بعداً با MUI/Lucide جایگزین کنی
  bolt: "⚡", link: "🔗", book: "📘", brain: "🧠", robot: "🤖",
  python: "🐍", code: "💻", table: "📊", function: "ƒ", chart: "📈",
  spark: "✨", stream: "🔀", delta: "Δ", database: "🗄️", storage: "🗂️",
  docker: "🐳", git: "🔧", mysql: "🟦", postgres: "🐘", mongodb: "🍃",
  microscope: "🔬", structure: "🏗️", mentor: "🎓", agile: "🌀",
  notebook: "📓", vscode: "🧩", linux: "🐧"
} as Record<string, string>;

export default function Skills() {
  const data = skillsData as SkillGroup[];

  const categories = useMemo(
    () => ["All", ...data.map(d => d.category)],
    [data]
  );

  const [active, setActive] = useState<string>("All");
  const [q, setQ] = useState<string>("");

  // برای اسکرول نرم به داخل ویو هنگام ناوبری از منو/لینک
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#skills") {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // فیلتر لیست
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const byCat = active === "All" ? data : data.filter(g => g.category === active);

    if (!term) return byCat;

    return byCat
      .map(g => ({
        ...g,
        items: g.items.filter(it => it.name.toLowerCase().includes(term))
      }))
      .filter(g => g.items.length > 0);
  }, [data, active, q]);

  // شمارنده
  const totalSkills = useMemo(
    () => data.reduce((acc, g) => acc + g.items.length, 0),
    [data]
  );
  const visibleSkills = useMemo(
    () => filtered.reduce((acc, g) => acc + g.items.length, 0),
    [filtered]
  );

  return (
    <section className="skills-container section" id="skills" aria-labelledby="skills-title">
      <header className="skills-header">
        <h1 className="section-title" id="skills-title">Skills</h1>
        <div className="controls">
          <div className="tabs" role="tablist" aria-label="Skill categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                className={`tab ${active === cat ? "active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search">
            <input
              type="search"
              placeholder="Search skills…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search skills"
            />
          </div>
        </div>

        <div className="meta">
          <span className="count">
            Showing <strong>{visibleSkills}</strong> / <strong>{totalSkills}</strong> skills
          </span>
        </div>
      </header>

      <div className="skills-grid" role="list">
        {filtered.map((group, gi) => (
          <div key={group.category} className="group" role="listitem">
            <h3 className="group-title">{group.category}</h3>

            <ul className="pill-list">
              {group.items.map((s, i) => (
                <li
                  key={`${group.category}-${s.name}-${i}`}
                  className="pill reveal"
                  style={{ animationDelay: `${(gi * 4 + i) * 40}ms` }} // stagger 40ms
                  title={s.name}
                  tabIndex={0}
                >
                  <span className="ic" aria-hidden="true">
                    {s.icon && ICON[s.icon] ? ICON[s.icon] : "•"}
                  </span>
                  <span className="label">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {visibleSkills === 0 && (
          <div className="empty">
            <div className="empty-emoji">🗂️</div>
            <h4>No skills found</h4>
            <p>Try clearing filters or changing your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
