# 🚀 Ali Moeinian – Customized React Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge\&logo=typescript\&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge\&logo=sass\&logoColor=white) ![MaterialUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge\&logo=mui\&logoColor=white) ![Font Awesome](https://img.shields.io/badge/Font%20Awesome-339AF0?style=for-the-badge\&logo=fontawesome\&logoColor=white) ![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge\&logo=npm\&logoColor=white)

## 📌 Overview

This project started as a fork of **[yujisatojr/react-portfolio-template](https://github.com/yujisatojr/react-portfolio-template)** but has been **heavily customized** for personal branding.
It now includes **additional sections**, **JSON-driven content**, an **LLM-powered contact assistant**, and refined **UI/UX styling** for a more modern, professional feel.

![screenshot](./src/assets/images/screenshot.png)

---

## ✨ Features

* **Modern tech stack** – React, TypeScript, Sass, Material UI, Font Awesome
* **Light/Dark mode toggle** with sticky navigation and smooth scroll-to-section
* **LLM Twin Contact Assistant** – Screens collaboration requests before revealing contact info
* **JSON-driven content** for projects, experience, skills, and publications (no need to edit components directly)
* **Responsive, mobile-friendly design** with clean typography and animations
* **Component-scoped SCSS modules** for maintainable theming
* **Additional sections**: Expertise, Timeline, Mentoring, Publications, and Achievements

---

## 🛠 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (includes npm)

### Installation

```bash
npm install
npm start
```

The development server runs at:
➡ **[http://localhost:3000](http://localhost:3000)**

---

## ⚙ Environment Variables

Create a `.env` file in the project root and add:

```env
REACT_APP_OPENROUTER_API_KEY=your_api_key_here
```

This is used by the LLM Twin assistant for intelligent contact screening.

---

## 📂 Project Structure

```
public/                 # Static assets
src/
  assets/               # Images, logos, SCSS modules
  components/           # React components for sections
  data/                 # JSON files for projects, experience, skills
  services/             # API helpers (e.g., OpenRouter client)
  App.tsx               # Main app composition & theme control
```

---

## 🎨 Customization

* **Content:** Update JSON files in `src/data`
* **Images:** Replace files in `src/assets/images` and `src/assets/logos`
* **Styling:** Adjust SCSS in `src/assets/styles`
* **Sections:** Modify or add components in `src/components`
* **AI Assistant:** Configure `.env` with your API key

---

## 📜 Scripts

```bash
npm start      # Run development server
npm run build  # Create production build
npm test       # Run test suite
npm run deploy # Deploy to GitHub Pages
```

---

## 🌐 Deployment

You can deploy on **GitHub Pages**, **Netlify**, **Vercel**, or any hosting platform.
To deploy with GitHub Pages:

1. **Set Up GitHub Repository**
   Create a new repository for your portfolio.

2. **Configure `package.json`**

   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

   Replace `yourusername` and `your-repo-name` accordingly.

3. **Deploy**

   ```bash
   npm run deploy
   ```

4. **Access Your Portfolio**
   Visit: `https://yourusername.github.io/your-repo-name`

---

## 📄 License

Distributed under the **MIT License**, inherited from the original template.
Feel free to use, modify, and distribute — attribution appreciated but not required.

---

## 🙏 Acknowledgments

* **Original template**: [Yuji Sato](https://github.com/yujisatojr/react-portfolio-template)
* **Custom enhancements** by Ali Moeinian — additional sections, LLM integration, JSON-driven content, and UI refinements

