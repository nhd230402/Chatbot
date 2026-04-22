# AI Chatbot Demo Starter

Starter full-stack demo project with:

- Backend: FastAPI
- Frontend: Next.js + TailwindCSS
- Database: Supabase PostgreSQL
- Auth: simple self-implemented email/password auth (no Supabase Auth)

## Project Structure

```text
backend/
  main.py
  routers/
  models/
  services/
  auth/
frontend/
  app/
  components/
  lib/
supabase/
  schema.sql
```

## 1. Database Setup (Supabase)

1. Create a Supabase project.
2. Open SQL Editor.
3. Run [supabase/schema.sql](supabase/schema.sql).

This creates:
- `users` table
- `messages` table (not used yet)

## 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Update `backend/.env` with your Supabase PostgreSQL password and project ref.

Run backend:

```bash
uvicorn main:app --reload --port 8000
```

Available endpoints:
- `POST /register`
- `POST /login`
- `POST /chat` (placeholder)

## 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Demo Notes

- Chat UI is fully implemented and ChatGPT-like.
- Messages are stored in frontend state only.
- `/chat` returns placeholder response:

```json
{ "message": "Chat not implemented yet" }
```

## TODOs

- TODO: connect to LLM
- TODO: save messages to database
- TODO: implement streaming
