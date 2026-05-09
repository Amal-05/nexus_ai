<div align="center">
  
  # 🌌 Nexus AI
  ### Your AI-Powered Study Assistant
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel)](https://nexus-ai-phi.vercel.app/)
  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

  **Nexus AI** is an intelligent assistant built for students to simplify learning. Upload your study materials to generate instant summaries, create interactive questionnaires, and prepare for exams faster.
</div>

<hr />

## ✨ Core Features

- **📝 AI Summarizer**: Instantly transform long lecture notes and PDFs into concise, easy-to-read summaries.
- **❓ Question Bank**: Automatically generate questionnaires and flashcards from your study materials to test your knowledge.
- **💬 AI Tutor**: Chat with an AI that understands your specific notes to clarify complex concepts.
- **📅 Study Planner**: Keep track of your learning progress and organize your study sessions.

## 📁 Project Structure

- **[`/frontend`](./frontend)**: The user interface built with React 19, Vite, and Tailwind CSS.
- **[`/backend`](./backend)**: The AI server powered by Node.js and Gemini.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Gemini API Key
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
GEMINI_API_KEY=your_key
```

### 3. Run Locally
```bash
npm run dev
```

---

<div align="center">
  <p>Helping students master their subjects with AI. 🎓</p>
  <a href="https://github.com/Amal-05/nexus_ai">
    <img src="https://img.shields.io/github/stars/Amal-05/nexus_ai?style=social" alt="Stars" />
  </a>
</div>
