# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

> **Status:** Greenfield project — only documentation exists (`prd.md`, `game.md`). No application code has been written yet. All directory structure and commands below are the planned target state.

**QuizBrasil** is a web-based educational quiz game for children aged 7-14, featuring:
- 195 questions across 16 themes (History, Geography, Science, Folklore, Pop Culture, Space, etc.)
- Real-time scoring with speed bonuses (0–60s timer per question)
- Level progression (5 levels: Curioso → Mestre)
- Badge system (11 badges for achievements)
- User rankings (Top 10 global leaderboard)
- Responsive design (mobile-first, 375px+)

See `prd.md` for the complete Product Requirements Document.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 14 (App Router) | SSR/SSG, integrated API routes |
| Styling | TailwindCSS + shadcn/ui | Component library for speed |
| Animation | Framer Motion | Level-up and badge animations |
| Backend | Next.js API Routes | Serverless, same repo as frontend |
| Database | PostgreSQL (Supabase) | Relational, JSON support for flexibility |
| ORM | Prisma | Type-safe queries, migrations |
| Auth | NextAuth.js (Credentials) | JWT, 24h expiry, NextAuth session handling |
| Validation | Zod | Server-side input validation, type inference |
| Deploy | Vercel (frontend) + Supabase (DB) | Free tier for MVP, global CDN |

---

## Project Structure

The directory layout follows the Next.js App Router convention:

```
quiz-brasil/
├── app/                          # Next.js App Router pages
│   ├── (auth)/login              # Login page (public)
│   ├── (auth)/register           # Registration page (public)
│   ├── dashboard/                # Main dashboard (authenticated)
│   ├── (game)/play/              # Quiz game interface
│   ├── (game)/result/[sessionId]/ # Post-game results screen
│   ├── profile/                  # User profile + history
│   ├── ranking/                  # Top 10 leaderboard
│   └── layout.tsx                # Root layout with auth provider
│
├── api/                          # API Route Handlers
│   ├── auth/[...nextauth]/       # NextAuth configuration
│   ├── game/
│   │   ├── start/                # POST: start quiz, select 10 questions
│   │   ├── answer/               # POST: submit answer, calculate points
│   │   └── finish/               # POST: finalize session, update user, check badges
│   ├── user/
│   │   ├── profile/              # GET: user profile data
│   │   └── history/              # GET: last 10 game sessions
│   └── ranking/                  # GET: top 10 + current user position
│
├── components/
│   ├── game/                     # Game-specific components
│   │   ├── QuestionCard.tsx      # Question display with 4 options
│   │   ├── Timer.tsx             # Countdown timer (60s → animated color)
│   │   ├── AnswerOption.tsx      # Individual answer button/card
│   │   ├── ScoreDisplay.tsx      # Points + level indicator
│   │   └── ResultScreen.tsx      # Post-round summary screen
│   │
│   ├── ui/                       # shadcn/ui components (Button, Card, etc.)
│   ├── LevelBadge.tsx            # Level indicator with progress bar
│   ├── ProgressBar.tsx           # XP/points progress to next level
│   ├── RankingTable.tsx          # Top 10 leaderboard display
│   └── auth/                     # Auth-related components
│
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # NextAuth configuration + JWT secret
│   ├── scoring.ts                # calculatePoints() + speed multipliers
│   ├── levels.ts                 # checkAndAwardBadges() + level thresholds
│   ├── validators.ts             # Zod schemas for API validation
│   └── db.ts                     # Database query helpers (optional)
│
├── prisma/
│   ├── schema.prisma             # Database schema (User, Question, GameSession, etc.)
│   └── seed.ts                   # Populate DB: 195 questions + 11 badges
│
├── public/
│   └── avatars/                  # Pre-defined avatar SVGs (1-12 options)
│
├── .env.local                    # Local env vars (DATABASE_URL, NEXTAUTH_SECRET, etc.)
├── prd.md                        # Product Requirements Document
├── game.md                        # 195 questions in markdown table format (source of truth)
└── package.json
```

---

## Database Schema (Prisma)

**Key models:**

- **User**: id, email, passwordHash, avatarId, totalScore (cumulative), level, gamesPlayed, totalCorrect
- **Question**: id (cuid), number (1–195), theme, difficulty (easy/medium/hard), basePoints (20/40/60), questionText, correctAnswer, wrongAnswer1/2/3, explanation
- **GameSession**: id, userId (FK), score, correctCount, status, startedAt, finishedAt
- **SessionAnswer**: id, sessionId (FK), questionId (FK), chosenAnswer (string), isCorrect (bool), timeSpentMs (int), pointsEarned (int)
- **Badge**: id, key (e.g., "first_answer"), name, description, icon (emoji)
- **UserBadge**: userId + badgeId (unique constraint)

**Indices:**
- `Question(theme, difficulty)` — fast question filtering
- `User(totalScore DESC)` — fast ranking queries
- `GameSession(userId)` — user history

See `prd.md` section 5.4 for full schema.

---

## Development Commands

### Setup
```bash
npm install
cp .env.example .env.local          # Set DATABASE_URL and NEXTAUTH_SECRET
npx prisma migrate dev              # Create tables
npx prisma db seed                  # Populate 195 questions + 11 badges
```

### Development
```bash
npm run dev                         # Start dev server on http://localhost:3000
npm run build                       # Build for production
npm start                           # Start production server
```

### Database
```bash
npx prisma studio                  # Open database GUI
npx prisma migrate dev --name <msg> # Create a new migration
npx prisma db push                 # Sync schema to DB (dev only)
npx prisma db seed                 # Re-run seed.ts (idempotent)
```

### Type checking (no Vitest/Jest configured in MVP)
```bash
npx tsc --noEmit                   # TypeScript check
```

**Note:** The MVP does not include automated tests. For QA, use the dev server and manual testing focused on:
- Timer logic (verify 60s countdown, auto-advance on timeout)
- Score calculation (verify speed bonuses)
- Badge logic (check badge awards on session completion)
- Responsive design (375px mobile, 1440px desktop)

---

## Important Design Decisions & Constraints

### 1. Question Randomization
- **Each round:** exactly 10 questions randomly selected from 195
- **No repeats within a round** (use `shuffle(questions).slice(0, 10)`)
- **Mixed difficulty & theme** — no curation; purely random

### 2. Scoring & Speed Bonus
The speed multiplier is applied **only to correct answers**:
- Time ≤ 15s: ×2.0 multiplier (base points × 2)
- Time 15–30s: ×1.5 multiplier
- Time 30–45s: ×1.25 multiplier
- Time 45–60s: ×1.0 multiplier
- Wrong answer: 0 points (no speed bonus applies)

Calculate points **server-side** in `/api/game/answer`; never trust client time data.

### 3. Level Thresholds (Cumulative Total Score)
| Level | Name | Min Points |
|-------|------|-----------|
| 1 | Curioso | 0 |
| 2 | Aprendiz | 500 |
| 3 | Conhecedor | 2,000 |
| 4 | Especialista | 5,000 |
| 5 | Mestre | 10,000 |

Level is **recalculated after each round** based on total cumulative score.

### 4. Badge Verification
Check badge criteria **after each round completes** in `/api/game/finish`:
- Some badges are **one-time** (e.g., first quiz)
- Some are **repeatable/level-based** (e.g., reach Level 5)
- Prevent duplicates: use `UserBadge` unique constraint

### 5. Authentication & Session Security
- **No password reset in MVP** — see PRD section 5.8 for security notes
- **JWT expiry:** 24h (NextAuth default)
- **Correct answer never sent to client** before user submits (prevents cheating)
- **Rate limit auth routes:** max 10 attempts/IP/minute (implement in middleware if needed)

### 6. UI/UX for Kids (7–14 years)
- **Font size minimum:** 18px mobile, 20px desktop
- **Touch target minimum:** 48×48px for buttons
- **Feedback on every interaction:** color change, hover scale, success/error icon
- **Clear indication of correct vs. incorrect:** green ✅ vs. red ❌
- **Simple language:** avoid jargon; max 2 lines per question enunciado
- **Vibrant palette:** avoid grays; use the color scheme in PRD section 7.1

### 7. Questions Data (game.md)
- **195 questions** across 16 themes (source of truth in database)
- Distribution: varies by theme — verify counts on updates
- Organized in markdown tables, one per theme section
- Only the **correct answer** is in `game.md`; **3 wrong answers per question must be added in `seed.ts`**

**Wrong answer generation strategy (by question type):**
- **Dates/years:** nearby numeric variations (e.g., 1889 → 1887, 1891, 1895)
- **People/names:** other figures from the same historical context
- **Capitals/cities:** other cities from the same country or region
- **Science concepts:** related but distinct concepts from the same domain
- Wrong answers must be plausible — not obviously absurd, same category as the correct answer

### 8. Mobile-First Design
- Responsive breakpoints: mobile (375px+), tablet, desktop (max 1200px)
- Touch-friendly spacing on mobile
- Avoid hover-only interactions; use tap feedback instead

---

## API Endpoints Overview

| Method | Endpoint | Body | Returns | Notes |
|--------|----------|------|---------|-------|
| POST | `/api/auth/register` | `{ name, email, password }` | `{ user, token }` | Validate email unique; hash password with bcrypt |
| POST | `/api/auth/login` | NextAuth session | `{ session }` | Via NextAuth credential provider |
| POST | `/api/game/start` | (none, auth required) | `{ sessionId, questions[] }` | Select 10 random questions; do NOT include correct answers |
| POST | `/api/game/answer` | `{ sessionId, questionId, chosenAnswer, timeSpentMs }` | `{ isCorrect, correctAnswer, explanation, pointsEarned }` | Calculate points server-side; verify answer integrity |
| POST | `/api/game/finish` | `{ sessionId }` | `{ roundScore, totalScore, levelUp?, newBadges[] }` | Finalize session; check badges; update user totals |
| GET | `/api/user/profile` | (none, auth required) | `{ user profile data }` | Name, level, totalScore, gamesPlayed, rate of correct answers |
| GET | `/api/user/history` | (none, auth required) | `{ last 10 sessions }` | Date, score, correct/10 per session |
| GET | `/api/ranking` | (none, public) | `{ top10, userPosition }` | Leaderboard; include user's own position even if not in top 10 |

---

## Common Gotchas & Debugging Tips

### Timer Edge Cases
- **Client-side timer desynchronizes:** server tracks actual time via `answeredAt` timestamp; use server time for scoring
- **User closes tab during round:** session stays in-progress; next login can resume or abandon
- **Zero-second questions:** if user submits instantly (< 100ms), treat as fastest tier (×2.0)

### Question Seeding
- `seed.ts` must be **idempotent** — running it twice should not duplicate questions
- Use Prisma `upsert` by `question.number` (unique identifier from game.md)
- If wrong answers are procedurally generated, seed only once and store them

### Ranking Updates
- Ranking is **not real-time**; computed on GET `/api/ranking`
- If performance is an issue, cache ranking in Redis or pre-compute it
- Ensure `User(totalScore DESC)` index exists for fast queries

### Badge Logic Subtlety
- **"Primeiro Quiz"** badge: awarded on first session completion (check `gamesPlayed == 1 after increment`)
- **"Em Chamas"** badge (5 correct in a row): check current session only, not all-time streak
- **Level badges** (📚, 🎓, 🏆, 👑): awarded when user crosses level threshold; can be awarded multiple times if levels are revisited (handle with unique constraint)

### Password Security
- Hash with bcrypt (salt rounds: 12)
- **Never log or return plaintext passwords**
- On password reset (future), validate old password before allowing new one

### Responsive Design Pitfalls
- Modal/toast z-index can break on mobile; use Tailwind's z-index utilities
- Avoid fixed widths; use max-w-lg with mx-auto for centering
- Test on actual mobile device (not just browser dev tools) for touch interaction

---

## Testing Strategy (MVP)

Since the MVP excludes automated tests, focus on **manual QA**:

1. **Happy path (quiz flow):**
   - Register → Login → Play → Answer all 10 questions → View results
   - Verify score calculation matches formula
   - Verify level didn't increase (set a low score)

2. **Score & speed bonus:**
   - Answer 3 questions in < 15s, expect ×2.0 multiplier
   - Answer 1 question in 45s, expect ×1.0 multiplier
   - Answer 3 questions wrong, expect 0 points

3. **Badges:**
   - Complete first round → check "Primeiro Quiz" badge
   - Get 10/10 correct → check "Nota 10" badge
   - Reach Level 2 → check "Aprendiz" badge

4. **Ranking:**
   - Create 3 test users
   - Play multiple rounds to rack up points
   - Check ranking order (descending by totalScore)
   - Ensure logged-in user sees own position

5. **Responsive:**
   - Test on iPhone 12 (375px), iPad (768px), desktop (1440px)
   - Verify buttons are 48×48px minimum touch target
   - Check that text is readable and paragraphs don't exceed 2 lines

6. **Edge cases:**
   - Let timer hit zero; question should auto-submit as wrong
   - Close browser mid-round; session should persist on re-login
   - Rapid-fire clicking next question; ensure no double-submit

---

## Environment Variables

Required in `.env.local`:

```
DATABASE_URL=postgresql://user:password@supabase-host:5432/postgres
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000 (dev) or https://yourdomain.com (prod)
```

---

## Deployment Notes (Vercel + Supabase)

1. **Database:** PostgreSQL on Supabase (free tier, 500MB)
2. **Frontend + API:** Vercel (free tier)
3. **Migrations:** Run `npx prisma migrate deploy` in Vercel pre-deployment hook
4. **Seed:** Run `npx prisma db seed` once after first deploy (idempotent)
5. **Environment variables:** Set DATABASE_URL and NEXTAUTH_SECRET in Vercel project settings

---

## Files to Prioritize on First Edit

When starting implementation, these files have the most impact:

1. **`prisma/schema.prisma`** — Define the entire database contract
2. **`lib/auth.ts`** — NextAuth configuration; determines session behavior
3. **`lib/scoring.ts`** — Scoring formula; must be 100% accurate per PRD
4. **`app/layout.tsx`** — Root provider setup (NextAuth, TailwindCSS, Framer Motion)
5. **`app/(game)/play/page.tsx`** — Core game UI; central to UX
6. **`api/game/answer/route.ts`** — Answer submission logic; critical for correctness

---

## Code Style

- **TypeScript:** strict mode, no `any`
- **Component naming:** PascalCase for components, camelCase for utilities
- **Formatting:** Prettier (default Next.js config)
- **Linting:** ESLint (default Next.js config)
- **Comments:** Only for non-obvious logic (e.g., speed bonus formula, badge edge cases)
- **Error handling:** Return meaningful error messages; log to console in dev

---

## Glossary

| Term | Definition |
|------|-----------|
| **Round/Session** | Single quiz game of 10 questions |
| **Cumulative Score** | Sum of points across all rounds |
| **Speed Bonus** | Multiplier applied to points based on time spent (≤15s = ×2.0, etc.) |
| **Level** | Progression indicator based on cumulative score (1–5) |
| **Badge** | Achievement unlocked by meeting specific criteria |
| **Seed** | Script that populates database with initial data (195 questions, 11 badges) |

---

*Last updated: 2026-04-18*
