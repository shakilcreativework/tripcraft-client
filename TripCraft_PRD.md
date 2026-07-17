# Product Requirements Document (PRD)
## TripCraft — AI-Powered Travel Package & Itinerary Platform

**Course:** SCIC-13, Assignment 5 — Project 2: Agentic AI
**Prepared for:** Full Stack Agentic AI Application Submission

---

## 1. Overview

TripCraft is a full-stack travel discovery platform where users can browse curated travel packages, view detailed itineraries, and use AI agents to generate personalized trip plans, get smart recommendations, and chat with an AI travel assistant that understands their preferences and booking history.

**Why this project idea works well for the assignment:**
- Every card naturally has an image, title, description, **price** (package cost), **date** (departure date), **rating** (reviews), and **location** (destination) — no awkward or fake fields.
- The "Add Item" flow maps to a travel agent/vendor adding a new package.
- The AI features map to genuine user needs (planning is hard, decisions are hard, questions come up) rather than feeling forced into the app.
- It is distinct in domain from typical "product store" or "blog" clones, so it's unlikely to overlap with previous assignments.

---

## 2. Problem Statement

Planning a trip involves comparing dozens of packages, researching destinations, building day-by-day itineraries, and answering last-minute questions — a process that is time-consuming and overwhelming. TripCraft solves this by combining a clean package marketplace with agentic AI that plans, recommends, and answers on the user's behalf.

## 3. Target Users

- Travelers looking for curated trip packages (primary end users)
- Travel agencies / vendors who list packages (content contributors)
- Admins managing the platform

---

## 4. Tech Stack (per assignment requirements)

| Layer | Technology |
|---|---|
| Frontend | Next.js + TypeScript + Tailwind CSS |
| Data fetching | TanStack Query |
| Charts | Recharts (for the analytics/insights feature) |
| Backend | Node.js + Express.js + TypeScript |
| Database | MongoDB (official native driver, no ORM/ODM) |
| Auth | JWT-based auth + Google Social Login |
| AI Provider | Gemini or Groq (fast + generous free tier) or OpenAI |

**Confirmed versions in use (as of actual project setup):**
Next.js 16, React 19, TypeScript 6.x (pinned below 7.x for `ts-node-dev` compatibility), Tailwind CSS v4, Recharts v3, MongoDB native driver v7.x, Express v5.

---

## 5. Information Architecture / Page Map

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Landing page |
| `/explore` | Public | Listing/search/filter of travel packages |
| `/packages/:id` | Public | Package details page |
| `/login`, `/register` | Public | Auth |
| `/items/add` (as `/packages/add`) | Protected | Add new travel package |
| `/items/manage` (as `/packages/manage`) | Protected | Manage own packages |
| `/dashboard` | Protected | User's bookings, AI history, saved trips |
| `/ai/planner` | Protected | AI Itinerary Generator |
| `/ai/assistant` | Protected | AI Chat Assistant |
| `/about`, `/contact`, `/blog` | Public | Additional pages |
| `app/loading.tsx`, `app/explore/loading.tsx`, `app/packages/[id]/loading.tsx` | N/A (special files) | Route-level loading skeletons (Next.js App Router convention) |
| `app/not-found.tsx` | N/A (special file) | Global 404 page, triggered via `notFound()` on invalid package IDs |

---

## 6. Landing Page Structure (7+ sections)

1. **Navbar** — sticky, logged-out: Home / Explore / About / Login (3+); logged-in adds Dashboard, AI Planner, Manage Packages, Profile, Logout (5+)
2. **Hero** — 60–70vh, destination image slider + search CTA
3. **Featured Packages** — top-rated packages carousel
4. **Why TripCraft (Features)** — AI planning, verified reviews, best price guarantee
5. **Popular Destinations (Categories)** — clickable location tiles
6. **Statistics** — travelers served, destinations, countries, packages (animated counters)
7. **Testimonials** — traveler reviews
8. **How AI Plans Your Trip** — explainer for the AI itinerary feature
9. **Newsletter / CTA**
10. **Footer** — working links, contact info, social icons

---

## 7. Core Feature Breakdown

### 7.1 Package Card (Explore Page)
Fields: Image, Title, Short description, **Price**, **Departure Date**, **Rating**, **Location**, "View Details" button.
Rules: uniform size/radius, 4 per row on desktop, skeleton loaders while fetching.

### 7.2 Explore Page
- Search bar (destination/title)
- Filters: **location**, **price range**, **rating**, **date range** (≥2 fields, meets requirement)
- Sort: price (low-high/high-low), rating, date
- Infinite scroll or pagination

### 7.3 Package Details Page (Public)
- Image gallery
- Overview / Description
- Itinerary breakdown (day-by-day) — Key Info section
- Reviews & Ratings
- Related packages (same location/category)
- "Plan with AI" button → deep link into AI Planner pre-filled with this package

### 7.4 Add Package (`/packages/add`) — Protected
Fields: Title, short description, full description, price, departure date, category/priority, optional image URL. Submit button.

### 7.5 Manage Packages (`/packages/manage`) — Protected
Table/grid of the user's own listed packages with View / Delete actions.

### 7.6 Authentication
- Email/password login & registration with validation
- **Demo login button** (auto-fills a demo account)
- **Google social login**
- JWT-based session handling

### 7.7 Additional Pages
- About, Contact, Blog (travel tips), Help/Support

---

## 8. Agentic AI Features (2 implemented — exceeds minimum of 1)

### A. AI Itinerary Generator (Content Generator)
- User inputs: destination, trip length, budget, interests (adventure/relax/culture/food), traveler count
- AI generates a structured day-by-day itinerary with activities, estimated costs, and tips
- Custom prompt templates per trip type
- Adjustable output length (3-day vs 7-day vs 14-day)
- "Regenerate" button for alternate itineraries
- Saved itineraries appear in user Dashboard

### B. AI Smart Recommendation Engine
- Analyzes user's past views, saved packages, and itinerary preferences
- Suggests packages the user is likely to book, with a short AI-generated "why this fits you"
- Recommendations refine as the user interacts more (view/save/dismiss feedback loop)
- Supports filtering recommendations by budget/location

### C. AI Chat Assistant (bonus third feature, optional stretch)
- Floating assistant aware of app context (current package, past questions)
- Maintains conversation history per user
- Streaming responses, typing indicator, suggested follow-up questions
- Can answer things like "Is this trip good for families?" or "What's the visa requirement for Bali?"

---

## 9. Data Models (MongoDB — native driver, TypeScript interfaces not schemas)

No ORM/ODM (no Mongoose). Collections are queried directly via the `mongodb`
driver; shape/validation is enforced through TypeScript interfaces in
`src/types/`, not database-level schemas.

```
User        { name, email, passwordHash, avatar, provider, role, createdAt }
Package     { title, shortDesc, fullDesc, price, date, location, rating,
              images[], category, ownerId, createdAt }
Review      { packageId, userId, rating, comment, createdAt }
Itinerary   { userId, packageId?, inputPrefs, generatedPlan, createdAt }
ChatSession { userId, messages[], context, createdAt }
Recommendation { userId, packageId, score, reason, createdAt }
```

---

## 10. Global UI Rules
- Max 3 primary colors + 1 neutral (suggested: deep teal, warm sunset orange, off-white/charcoal neutral)
- Consistent card sizing, spacing, and border-radius system-wide
- Fully responsive (mobile/tablet/desktop)
- Zero placeholder/lorem-ipsum content — use real (or realistically written) destinations and copy
- All images use the Next.js `<Image>` component (`next/image`), never plain `<img>` — every external image domain (e.g. picsum.photos) must be registered in `next.config.ts` under `images.remotePatterns`

---

## 11. Suggested Build Order / Milestones

| Phase | Deliverable |
|---|---|
| 1 | Auth (JWT + Google), DB models, base layout, navbar/footer |
| 2 | Landing page (all sections) |
| 3 | Explore page + package cards + filters/search/sort + skeleton loaders |
| 4 | Package details page + reviews |
| 5 | Add/Manage package protected pages |
| 6 | AI Itinerary Generator (core AI feature #1) |
| 7 | AI Recommendation Engine (core AI feature #2) |
| 8 | AI Chat Assistant (stretch) + Dashboard |
| 9 | Responsiveness pass, polish, deploy, write docs |

---

## 12. Final Submission Checklist
- [ ] Live deployed URL (e.g., Vercel for frontend, Render/Railway for backend)
- [ ] GitHub repo (frontend) link
- [ ] GitHub repo (backend) link
- [ ] Demo login credentials working
- [ ] All protected routes redirect properly when logged out
- [ ] At least 2 AI features fully functional, not mocked

