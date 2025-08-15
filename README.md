
# EduLingua AI — Learn in Your Language 🎓🌏

An end-to-end, AI-powered educational translation platform for India and beyond. Translate **text, audio, and video** into local languages with downloadable subtitles, transcripts, and audio. Includes **Educator & Student dashboards**, **school integration API**, and a delightful, responsive UI.

---

## ✨ Highlights

- **Text Translation**: Paste/upload **TXT/PDF/DOCX** → instant translation.
- **Video Translation**: Upload file or paste URL → transcribe → translate → **add subtitles** → download `.srt`, `.vtt`, transcript, or processed video.
- **Speech-to-Text Translation**: Upload audio → transcript + translation.
- **Offline Downloads**: Text, subtitles, and audio.
- **User Accounts**: Educator/Student portals with saved history.
- **School API**: API keys for direct LMS integration.
- **Optimized UX**: Lazy-load assets, CDN, minified bundles.

---

## 🧭 Table of Contents

- [Demo](#demo)
- [Screens & UX](#screens--ux)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Run & Dev Scripts](#run--dev-scripts)
- [API Reference](#api-reference)
- [Processing Pipelines](#processing-pipelines)
- [Security & Compliance](#security--compliance)
- [Performance Tips](#performance-tips)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

> Ships with mock translations so you can click around immediately after setup.

- Instant translate demo
- Video with subtitle toggle
- Side-by-side before/after slider
- Educator bulk translation
- Student search/download

---

## Screens & UX

- **Theme**: Pastel gradients (peach→lavender, aqua→yellow) + glassmorphism cards.
- **Animations**: Fade-ins, floating blobs, typing language effect, cursor glow.
- **Pages**:
  - Landing / Hero
  - Languages (interactive India map)
  - Features (text/audio/video)
  - Demo
  - Educator Dashboard
  - Student Dashboard
  - Testimonials & Impact
  - Footer with gradient border and neon hover icons

---

## Architecture

```

Frontend (React/HTML/CSS/JS, GSAP)
↕ HTTPS (JWT)
Backend (Node.js + Express)
↔ MongoDB
↔ AI APIs
\- Translation: Google Cloud / OpenAI GPT-4o
\- Transcription: OpenAI Whisper
↔ FFmpeg (video/audio processing)
↔ Object Storage/CDN

````

---

## Tech Stack

**Frontend**: HTML, CSS, JavaScript (React optional), GSAP  
**Backend**: Node.js, Express, MongoDB, Multer, FFmpeg  
**AI**: Google Cloud Translation or OpenAI GPT-4o; Whisper for ASR  
**Auth**: JWT authentication  
**Deploy**: Vercel/Netlify (frontend), Render/Heroku (backend)

---

## Local Setup

```bash
git clone https://github.com/<your-org>/edulingua-ai.git
cd edulingua-ai
npm install
````

Install **FFmpeg** and ensure it’s on your `PATH`:

```bash
ffmpeg -version
```

---

## Environment Variables

Create `.env` (never commit it):

```ini
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb://127.0.0.1:27017/edulingua_ai

JWT_SECRET=replace_with_strong_secret
JWT_REFRESH_SECRET=replace_with_stronger_secret

OPENAI_API_KEY=sk-...
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/key.json

UPLOAD_DIR=./uploads
```

Add to `.gitignore`:

```bash
.env
**/.env
```

---

## Run & Dev Scripts

```bash
# Backend
npm run dev:server

# Frontend
npm run dev:client
```

---

## API Reference

**Base URL**: `https://<backend-domain>/api`

**Auth**

* `POST /auth/signup`
* `POST /auth/login`
* `POST /auth/refresh`
* `POST /auth/logout`

**Translation**

* `POST /translate/text`
* `POST /translate/audio`
* `POST /translate/video`

**Resources**

* `GET /resources/search`
* `POST /resources`

---

## Processing Pipelines

* **Text** → translate → return text + file
* **Audio** → Whisper → translate → generate subtitles/audio
* **Video** → Whisper → translate → create `.srt`/`.vtt` → optional burn-in with FFmpeg

---

## Security & Compliance

* No secrets in repo
* JWT with rotation
* File size/MIME checks
* Rate limiting

---

## Performance Tips

* Compress uploads
* Lazy-load heavy UI
* CDN for static assets
* Preload fonts/gradients

---

## Project Structure

```plaintext
edulingua-ai/
├─ client/
│  ├─ public/
│  └─ src/
├─ server/
│  ├─ src/
│  ├─ uploads/ (gitignored)
│  └─ .env
├─ .gitignore
└─ README.md
```

---

## Deployment

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Heroku / Fly.io + MongoDB Atlas + FFmpeg buildpack

---

## Roadmap

* [ ] Text-to-Speech output
* [ ] Batch class jobs
* [ ] Admin analytics
* [ ] Accessibility audit
* [ ] PWA offline mode

---

## Contributing

1. Fork & branch
2. Follow lint/format rules
3. Add tests
4. PR with clear description & screenshots
