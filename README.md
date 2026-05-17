# ELI5 AI — Explain Anything

An AI-powered web app that takes any technical input — code, error messages, articles, or concepts — and explains it in your chosen style. Built as a portfolio project to demonstrate modern full-stack development with React, Supabase, and the Groq AI API.

## Live Demo

https://eli5-app-one.vercel.app

## Features

- **4 explanation modes** — ELI5, Beginner, Technical, and Analogy
- **Compare mode** — see all 4 explanations side by side for the same input
- **Syntax highlighting** — code blocks rendered with PrismJS
- **Explanation history** — saved to Supabase, persists across sessions
- **Dark mode** — full light/dark theme support
- **Responsive** — works on mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| AI | Groq Cloud (Llama 3.3 70B) |
| Backend | Vercel Serverless Functions |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/adarshvt356/eli5-app.git
cd eli5-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- Get your Groq API key at [console.groq.com](https://console.groq.com)
- Get your Supabase credentials at [supabase.com](https://supabase.com)

### 4. Set up the Supabase table

Run this SQL in your Supabase SQL Editor:

```sql
create table explanations (
  id uuid primary key default gen_random_uuid(),
  user_input text not null,
  mode varchar(20) not null,
  explanation text not null,
  created_at timestamptz default now()
);
```

### 5. Run locally

```bash
npm run dev
```

The app runs at `http://localhost:5173`. The API is served by the built-in Vite plugin — no separate server needed.

## Deployment

Push to GitHub, then import the repo in [Vercel](https://vercel.com). Add the three environment variables (`GROQ_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the Vercel project settings. Every `git push` will auto-deploy.

## Project Structure

```
eli5-app/
├── api/
│   └── explain.js          # Vercel Serverless Function — Groq API proxy
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ModeSelector.jsx
│   │   ├── InputPanel.jsx
│   │   ├── OutputPanel.jsx
│   │   ├── ComparePanel.jsx
│   │   ├── HistoryPanel.jsx
│   │   ├── CopyButton.jsx
│   │   └── LoadingSpinner.jsx
│   ├── lib/
│   │   └── supabase.js     # Supabase client
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Design tokens + global styles
├── .env.local              # Local secrets (never committed)
└── vite.config.js          # Includes local API plugin for dev
```

## Author

Built by **Adarsh V Thomas**
