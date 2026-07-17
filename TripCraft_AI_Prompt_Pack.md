# TripCraft — AI Agent Prompt Pack
### For use in Antigravity (or any agentic coding IDE)

This file gives you copy-paste prompts built the way your slides describe:
**Role + Task + Context + Format + Constraints**, with a one-time **Project Context** block so you don't repeat your whole stack in every message (this is the "Context Engineering" idea — set up the desk once, don't hand the agent a sticky note each time).

**How to use this file:**
1. Paste **Section 1 (Project Context)** as your very first message in the agent chat/session. This becomes the "desk" the agent works from for the rest of the session.
2. Then paste one prompt at a time from Section 2, in order. Each one is self-contained enough to produce complete, working code in one shot — don't split them further, that wastes tokens on back-and-forth clarification.
3. If a prompt's output isn't complete, add only the missing constraint (e.g., "also add the loading skeleton") instead of re-explaining the whole page.

---

## 1. PROJECT CONTEXT (paste this once, first)

```
You are a Senior Full-Stack Developer working on "TripCraft" — an AI-powered
travel package platform.

STACK:
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS + TanStack Query
- Backend: Node.js + Express.js + TypeScript + MongoDB (Mongoose)
- Auth: JWT + Google OAuth
- AI: Groq API (or Gemini — I'll specify per feature)

DESIGN SYSTEM:
- Primary colors: deep teal (#0F766E), warm sunset orange (#F97316)
- Neutral: off-white (#FAFAF9) background, charcoal (#1C1917) text
- Rounded-xl cards, consistent shadow-sm, consistent padding (p-6)
- Font: Inter or system-ui
- Mobile-first, fully responsive at sm/md/lg breakpoints

DATA MODEL (Package):
{ title, shortDesc, fullDesc, price, date, location, rating, images[], category, ownerId }

RULES FOR ALL OUTPUT:
- TypeScript only, strict typing, no `any`
- No external UI library — Tailwind only
- No lorem ipsum — use realistic travel copy (real-sounding destinations, prices, dates)
- Every component must be reusable and in its own file
- Return COMPLETE file contents, not snippets or "// rest of code same as before"
- Do not explain the code afterward unless I ask — just give the files

Acknowledge this context, then wait for my next prompt.
```

---

## 2. PAGE-BY-PAGE PROMPTS

### 2.1 Home / Landing Page
```
ROLE: Senior React developer.
TASK: Build the TripCraft Home page.
CONTEXT: Public route. Uses the design system already given.
SECTIONS (in order): Sticky Navbar (Logo, Home, Explore, About, Login — logged-out
version), Hero (60-70vh height, destination image slider, search bar, CTA buttons
"Explore Packages" / "Plan with AI"), Featured Packages (4-card grid, reusable
PackageCard component), Why TripCraft (4 feature cards: AI Planning, Verified
Reviews, Best Price, 24/7 Support), Popular Destinations (6 location tiles with
icon/image + name), Statistics (4 animated counters: travelers, destinations,
countries, packages), Testimonials (3 cards), Newsletter (email input + subscribe),
Footer (logo, quick links, contact info, social icons).
FORMAT: One file per component (Navbar.tsx, Hero.tsx, etc.) plus a page.tsx that
assembles them. Use placeholder image URLs from picsum.photos for now.
CONSTRAINTS: No API calls yet — use realistic static data. Keep every card the
same size/radius/shadow. Do not use any external UI library.
```

### 2.2 Explore / Listing Page (Package Cards + Filters)
```
ROLE: Senior React developer.
TASK: Build the TripCraft Explore page with search, filter, sort, and package cards.
CONTEXT: Public route at /explore.
REQUIREMENTS:
- Reusable PackageCard component: image, title, short description, price, date,
  rating, location, "View Details" button — identical size/radius across all cards
- Desktop: 4 cards per row. Tablet: 2. Mobile: 1.
- Skeleton loader component shown while "loading" (simulate with a 1s timeout for now)
- Search bar (filters by title/location)
- Filters: location (dropdown), price range (min/max), rating (min stars), date range
- Sort dropdown: price low-high, price high-low, rating, date
- Pagination (10 per page) OR infinite scroll — use infinite scroll with
  IntersectionObserver
FORMAT: Separate files for PackageCard.tsx, FilterBar.tsx, SkeletonCard.tsx,
ExplorePage (page.tsx). Use static placeholder array of 20 packages for now.
CONSTRAINTS: Filtering and sorting must work client-side on the static data —
functional, not just UI. No external UI library.
```

### 2.3 Package Details Page
```
ROLE: Senior React developer.
TASK: Build the TripCraft package details page.
CONTEXT: Public route at /packages/[id].
REQUIREMENTS:
- Image gallery (main image + thumbnail row)
- Title, location, price, date, rating badge
- Overview/Description section
- Day-by-day itinerary breakdown (Key Info section) — accordion style
- Reviews & Ratings section (list of 3 sample reviews with name/rating/comment)
- Related Packages (4-card row, same category/location)
- "Plan with AI" button that will later link to /ai/planner?packageId={id}
FORMAT: page.tsx + ImageGallery.tsx + ItineraryAccordion.tsx + ReviewsList.tsx +
RelatedPackages.tsx. Use one static sample package object for now.
CONSTRAINTS: Fully responsive, mobile-first. No external UI library.
```

### 2.4 Auth: Login / Register + Protected Route
```
ROLE: Senior React developer.
TASK: Build Login and Register pages plus a ProtectedRoute wrapper.
CONTEXT: Public routes /login and /register. Uses AuthContext (create it).
REQUIREMENTS:
- Login: email + password fields, validation, error display, "Demo Login" button
  that auto-fills demo@tripcraft.com / Demo@1234 and submits, "Continue with
  Google" button (call a signInWithGoogle function — stub it for now)
- Register: name, email, password, confirm password, validation
- AuthContext: login(), register(), logout(), user state, loading state, stores
  JWT in an httpOnly-simulated way (for now, localStorage is fine as a placeholder
  — note in a comment that production should use httpOnly cookies)
- ProtectedRoute component: if not authenticated, redirect to /login and save
  the attempted location; after successful login, redirect back to that location
  (or "/" if none)
FORMAT: AuthContext.tsx, LoginPage.tsx, RegisterPage.tsx, ProtectedRoute.tsx
CONSTRAINTS: Centered card layout, mobile responsive, clean modern UI matching
the design system. No external UI library.
```

### 2.5 Add Package (Protected)
```
ROLE: Senior React developer.
TASK: Build the "Add Package" form page.
CONTEXT: Protected route /packages/add — wrap with ProtectedRoute.
REQUIREMENTS: Form fields — Title, Short Description, Full Description, Price,
Departure Date, Location, Category (dropdown: Adventure/Relax/Culture/Food),
optional Image URL. Client-side validation on all required fields. Submit button
calls a stubbed onSubmit function (log the form data for now — API wiring comes later).
FORMAT: AddPackagePage.tsx with a reusable FormField.tsx component.
CONSTRAINTS: Clean, spacious form layout, mobile-friendly, matches design system.
```

### 2.6 Manage Packages (Protected)
```
ROLE: Senior React developer.
TASK: Build the "Manage Packages" page.
CONTEXT: Protected route /packages/manage — wrap with ProtectedRoute.
REQUIREMENTS: Table on desktop / stacked cards on mobile, listing the logged-in
user's packages (use 5 static sample rows for now) with columns: Image, Title,
Price, Date, Status, and actions View / Delete (Delete opens a confirm dialog
before removing from local state).
FORMAT: ManagePackagesPage.tsx + DeleteConfirmModal.tsx
CONSTRAINTS: Responsive, readable, matches design system, no external UI library.
```

### 2.7 AI Itinerary Generator (Core AI Feature #1)
```
ROLE: Senior full-stack developer building an agentic AI feature.
TASK: Build the AI Itinerary Generator page and its backend endpoint.
CONTEXT: Protected route /ai/planner. Backend: Express route
POST /api/ai/itinerary using the Groq API (chat completion).
FRONTEND REQUIREMENTS: Form (destination, trip length in days, budget, interests
— multi-select chips: adventure/relax/culture/food, traveler count), "Generate
Itinerary" button, "Regenerate" button, adjustable length selector (3/7/14 days),
loading state while generating, result rendered as a day-by-day card list
(Day 1, Day 2, ... each with activities + estimated cost).
BACKEND REQUIREMENTS: Express route that takes the form fields, builds a prompt
using Role+Task+Context+Format+Constraints internally (persona: expert travel
planner; task: build itinerary; format: strict JSON array of
{day, title, activities[], estimatedCost}), calls Groq, parses the JSON response
safely (handle malformed JSON), returns it to the frontend.
FORMAT: ItineraryPlannerPage.tsx, DayCard.tsx, and server/src/routes/ai.routes.ts
+ server/src/controllers/ai.controller.ts
CONSTRAINTS: Backend must validate input before calling the AI. Never crash on
malformed AI output — catch and return a clean error message instead.
```

### 2.8 AI Smart Recommendation Engine (Core AI Feature #2)
```
ROLE: Senior full-stack developer building an agentic AI feature.
TASK: Build a Smart Recommendation section for the logged-in user's Dashboard.
CONTEXT: Backend: Express route GET /api/ai/recommendations/:userId. Uses a
simple scoring approach: look at the user's saved/viewed packages (mock this with
a sample interaction array for now), find packages sharing category/location, ask
the AI (Groq) to write a one-sentence "why this fits you" for the top 4 matches.
FRONTEND REQUIREMENTS: "Recommended for You" section on the Dashboard — 4
PackageCards, each with the AI-generated reason shown below it, and a "Not
interested" button per card that removes it and (in a comment) marks where you'd
send negative feedback to refine future results.
FORMAT: RecommendationSection.tsx + server/src/controllers/recommendation.controller.ts
CONSTRAINTS: Keep the AI call to generate ONLY the short reason text (not the
whole recommendation logic) to control token usage — matching/scoring logic stays
in plain code, not the LLM.
```

### 2.9 Dashboard (assembling everything)
```
ROLE: Senior React developer.
TASK: Build the user Dashboard page.
CONTEXT: Protected route /dashboard.
REQUIREMENTS: Welcome section with user's name (from AuthContext), profile card
(name/email), stats row (Saved Packages, Bookings, AI Itineraries Generated),
Recent Activity list, the Recommendation Section from prompt 2.8, Quick Actions
(Explore Packages / Plan a Trip / Manage My Packages / Logout).
FORMAT: DashboardPage.tsx assembling StatsCard.tsx, ProfileCard.tsx,
RecentActivity.tsx, and the already-built RecommendationSection.
CONSTRAINTS: Responsive grid layout, matches design system.
```

### 2.10 Backend Foundations (do this before wiring any frontend to real data)
```
ROLE: Senior backend developer.
TASK: Set up the Express + TypeScript + MongoDB backend foundation.
CONTEXT: server/ folder, using Mongoose, JWT auth, bcrypt for passwords.
REQUIREMENTS:
- Mongoose models: User, Package, Review, Itinerary, ChatSession, Recommendation
  (fields as defined in the PRD)
- Auth routes: POST /api/auth/register, /api/auth/login, /api/auth/google,
  GET /api/auth/me
- Package routes: GET /api/packages (with query params for search/filter/sort/
  pagination), GET /api/packages/:id, POST /api/packages (protected),
  DELETE /api/packages/:id (protected, owner-only)
- Middleware: authMiddleware (verifies JWT), errorHandler (centralized)
- A GET /api/health route returning { status: "ok" }
FORMAT: Standard Express/TS folder structure — src/models, src/routes,
src/controllers, src/middleware, src/server.ts
CONSTRAINTS: Passwords hashed with bcrypt, never returned in API responses.
Centralized error handling — no raw try/catch scattered without a shared handler.
```

---

## 3. TOKEN-SAVING TIPS (Context Engineering in practice)

- **Set context once, reuse it.** Don't re-paste your stack/colors/rules every prompt — that's what Section 1 is for. Agentic IDEs keep session memory; lean on it.
- **One prompt = one complete deliverable.** Vague prompts ("make me a website") force the agent to guess and burn tokens re-asking or over-generating. Specific prompts (Role/Task/Context/Format/Constraints) get it right in one pass.
- **Say "return complete files."** Without this, some agents shorten output with `// ... rest unchanged`, which breaks your codebase and wastes a follow-up prompt fixing it.
- **Batch related small asks.** Instead of 3 separate messages for "add loading state", "add error state", "add empty state" — put all three constraints in one prompt.
- **Only patch what's missing.** If output is 90% right, prompt only the delta ("also add the skeleton loader to the 4th card state") instead of re-sending the whole original prompt.
