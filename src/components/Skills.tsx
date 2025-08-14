import React, { useEffect, useMemo, useState } from "react";
import "../assets/styles/Skills.scss";
import skillsData from "../data/skillsData.json";

type SkillItem = { name: string; icon?: string };
type SkillGroup = { category: string; items: SkillItem[] };

// آیکن‌مپ سبک و بدون وابستگی خارجی
const ICON: Record<string, string> = {
  // AI & Agent
  brain: "🧠", bolt: "⚡", book: "📘", link: "🔗", robot: "🤖",
  vector: "🧮", graph: "🕸️", chat: "💬",

  // Data Science & Analytics
  python: "🐍", table: "📊", function: "ƒ", sklearn: "🧪",
  sparkles: "✨", clusters: "🧩", dashboard: "🗺️",

  // Big Data & Lakehouse
  spark: "⚡", kafka: "🦋", delta: "Δ", iceberg: "🧊",
  lakehouse: "🏞️", datawarehouse: "🏢",

  // Backend & APIs
  fastapi: "🚀", flask: "🥤", api: "🛣️", shield: "🛡️",

  // Databases & Storage
  postgres: "🐘", mysql: "🟦", mongodb: "🍃", sqlite: "🗂️",
  faiss: "🧭", schema: "📐", index: "🔖", storage: "🗄️",

  // Frontend & UI
  react: "⚛️", scss: "💠", tailwind: "🌀", html: "🧱", css: "🎨", stream: "🌊",

  // MLOps & Infra
  docker: "🐳", linux: "🐧", github: "🐱",

  // Systems & Architecture
  structure: "🏗️", uml: "📈", "clean-code": "🧼",

  // Research, Teaching & Communication
  microscope: "🔬", mentor: "🎓", presentation: "🧑‍🏫",
  docs: "📄", speaker: "🎙️", agile: "🌀",

  // Programming Languages
  cpp: "➕", javascript: "🟨", sql: "🗃️"
};

export default function Skills() {
  const data = skillsData as SkillGroup[];

  // فقط دسته‌های خود JSON (بدون All)
  const categories = useMemo(() => data.map(d => d.category), [data]);

  // اولین دسته به‌صورت پیش‌فرض
  const initialCategory = categories[0] ?? "";
  const [active, setActive] = useState<string>(initialCategory);

  // اسکرول نرم اگر #skills در URL بود
  useEffect(() => {
    if (window.location.hash === "#skills") {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const filtered = useMemo(
    () => data.filter(g => g.category === active),
    [data, active]
  );

  return (
    <section className="skills-container section" id="skills" aria-labelledby="skills-title">
      <h1 className="section-title" id="skills-title">Skills</h1>

      {/* فقط تب‌های دسته‌بندی */}
      <div className="skills-controls">
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
      </div>

      {/* گرید گروه‌ها */}
      <div className="skills-grid">
        {filtered.map((group, gi) => (
          <div key={group.category} className="group">
            <div className="group-head">
              <h3 className="group-title">{group.category}</h3>

              {/* توضیح کوچک برای Frontend & UI */}
              {group.category === "Frontend & UI" && (
                <p style={{ margin: 0, opacity: 0.8, fontSize: "0.85rem" }}>
                  I can write and style UI when needed, but it’s not my primary focus.
                </p>
              )}
            </div>

            <ul className="pill-list">
              {group.items.map((s, i) => {
                const key = (s.icon || "").toLowerCase(); // نرمال‌سازی آیکن
                return (
                  <li
                    key={`${group.category}-${s.name}-${i}`}
                    className="skill-pill reveal"
                    style={{ animationDelay: `${(gi * 4 + i) * 30}ms` }}
                    title={s.name}
                    tabIndex={0}
                  >
                    <span className="ic" aria-hidden="true">
                      {key && ICON[key] ? ICON[key] : "•"}
                    </span>
                    <span className="label">{s.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* اگر دسته‌ای انتخاب نشده یا داده نبود */}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-illustration">🗂️</div>
            <h3>No skills in this category</h3>
            <p>Try selecting another category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
