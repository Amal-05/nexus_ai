<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Nexus AI - Advanced Engineering Study OS

Nexus AI is a high-fidelity, futuristic engineering study assistant designed to transform complex documents into interactive learning experiences.

## 📁 Project Structure

The project is structured as a monorepo with a dedicated frontend and backend:

- **`/frontend`**: React 18 + Vite + Tailwind CSS v4. The user interface and client-side logic.
- **`/backend`**: Node.js + Express + Gemini 1.5 Pro. The AI engine and document processing service.

## 🚀 Run Locally

**Prerequisites:**  Node.js

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Amal-05/nexus_ai.git
   cd nexus_ai
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Configure Environment:**
   * **Frontend**: Create `frontend/.env` with Firebase/Gemini keys.
   * **Backend**: Create `backend/.env` with `GEMINI_API_KEY`.

4. **Run both services concurrently:**
   ```bash
   npm run dev
   ```

## 🌐 Hosting Instructions

### Frontend (Vercel)
1. Push your code to GitHub.
2. Connect your repository to **Vercel**.
3. Set the **Root Directory** to `frontend`.
4. Add the following **Environment Variables**:
   * `VITE_API_URL`: Your deployed backend URL (e.g., `https://nexus-backend.onrender.com`).
   * (Add other Firebase keys as needed).

### Backend (Render)
1. Connect your repository to **Render** as a **Web Service**.
2. Set the **Root Directory** to `backend`.
3. Set the **Build Command** to `npm install`.
4. Set the **Start Command** to `npm start`.
5. Add the following **Environment Variables**:
   * `GEMINI_API_KEY`: Your Google AI Studio key.

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Framer Motion
- **Icons**: Lucide React
- **Backend**: Node.js, Express, Google Gemini 1.5 Pro
- **Auth**: Firebase
