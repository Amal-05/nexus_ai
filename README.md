<div align="center">
  <img width="1200" height="475" alt="Nexus AI Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  # 🌌 Nexus AI
  ### The Advanced Engineering Study OS
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel)](https://nexus-ai-phi.vercel.app/)
  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

  **Nexus AI** is a high-fidelity, futuristic engineering study assistant designed to transform complex documents into interactive learning experiences using Gemini 1.5 Pro.
</div>

<hr />

## ✨ Key Features

- **🚀 AI Synthesis**: Transform complex technical PDFs and notes into structured executive summaries.
- **🎙️ Viva Prep**: Practice technical oral exams with a real-time AI tutor and confidence meter.
- **📅 Semester Planner**: Adaptive study roadmaps synchronized with your technical curriculum.
- **🖼️ Diagram Explainer**: AI-powered visual analysis for technical schematics and blueprints.
- **🧠 Question Bank**: Master technical concepts through AI-generated viva challenges.

## 📁 Project Structure

The project is structured as a monorepo for seamless deployment:

- **[`/frontend`](./frontend)**: React 19 + Vite + Tailwind CSS v4 + Framer Motion.
- **[`/backend`](./backend)**: Node.js + Express + Google Gemini 1.5 Pro.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Google AI Studio API Key (Gemini)
- Firebase Project (for Authentication)

### 1. Clone & Install
```bash
git clone https://github.com/Amal-05/nexus_ai.git
cd nexus_ai
npm run install-all
```

### 2. Configure Environment
**Frontend (`/frontend/.env`):**
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_API_URL=http://localhost:3001
```

**Backend (`/backend/.env`):**
```env
GEMINI_API_KEY=your_gemini_key
```

### 3. Run Locally
```bash
npm run dev
```

## 🌐 Deployment

### Frontend (Vercel)
1. Set **Root Directory** to `frontend`.
2. Add environment variables with `VITE_` prefix.
3. Build command: `npm run build`.

### Backend (Render/Railway)
1. Set **Root Directory** to `backend`.
2. Add `GEMINI_API_KEY` to environment variables.
3. Start command: `node index.js`.

---

<div align="center">
  <p>Built for the rigor of technical mastery. 🛠️</p>
  <a href="https://github.com/Amal-05/nexus_ai">
    <img src="https://img.shields.io/github/stars/Amal-05/nexus_ai?style=social" alt="Stars" />
  </a>
</div>
