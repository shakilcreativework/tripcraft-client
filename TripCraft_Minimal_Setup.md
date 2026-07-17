# TripCraft — Minimal Setup Guide (Install + Env Only)

## 1. Client Setup (Next.js)

```bash
npx create-next-app@latest client --typescript --tailwind --eslint --app
cd client
npm install @tanstack/react-query axios recharts
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 2. Server Setup (Express)

```bash
mkdir server && cd server
npm init -y
npm install express mongodb cors dotenv jsonwebtoken bcryptjs cookie-parser
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs @types/cookie-parser
npx tsc --init
```

> Note: `mongodb` is the official native driver (no schema layer, no models — you write queries directly against collections using `db.collection('packages').find()` etc.). `@types/mongodb` is not needed — the package ships its own TypeScript types.

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GROQ_API_KEY=
CLIENT_URL=http://localhost:3000
```

---

## 3. Where Each Value Comes From

| Variable | Get it from |
|---|---|
| `MONGODB_URI` | MongoDB Atlas → Database → Connect → Drivers (includes your DB user + password) |
| `JWT_SECRET` / `NEXTAUTH_SECRET` | Generate locally: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` (run twice, use a different output for each) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google Cloud Console → APIs & Services → Credentials → OAuth Client ID |
| `GROQ_API_KEY` | console.groq.com → API Keys |

---

## 4. Add to `.gitignore` (both client and server)
```
node_modules/
.env
.env.local
.next/
dist/
```
