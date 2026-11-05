# বাজার দর — BazarDor

> প্রয়োজনীয় পণ্যের দাম এক নজরে।

A Bengali market-price tracker for Bangladesh. It shows today's rate for everyday
essentials — rice, lentils, oil, vegetables, fish, meat, eggs & milk, and spices —
along with how each price moved since yesterday, and a market-by-market breakdown
of the lowest, highest and average rate across eight divisions.

**Live site:** ""
**Repository:** "https://github.com/jferdous222318/Bazar-Dor"

---

## ✨ Key Features

1. **আজকের দাম এক নজরে** — a live ticker and a full catalogue of 33 products, each
   card showing today's rate per unit and the percentage change since yesterday,
   colour-coded red for a rise and green for a fall.

2. **দাম বেড়েছে / দাম কমেছে** — the home page surfaces the six products whose
   prices moved the most in each direction today, so the biggest changes are
   visible without scrolling.

3. **বাজারভিত্তিক বিস্তারিত দাম** — every product has a detail page with a
   lowest / highest / average summary and a sortable table of twelve markets across
   Dhaka, Chattogram, Rajshahi, Mymensingh, Khulna and Sylhet, cheapest first.

4. **ক্যাটাগরি ও সাজানোর সুবিধা** — browse by any of the eight categories and
   reorder results with the **সাজান** dropdown (default, price low→high,
   price high→low). Bengali numerals sort by numeric value, not as text.

5. **নিরাপদ অ্যাকাউন্ট** — sign in with email & password, Google or GitHub via
   BetterAuth. Product detail and profile routes are protected; signed-out visitors
   are redirected to sign in and returned to the page they wanted. Users can update
   their display name from their profile.

---

## 🛠 Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16** (App Router) | Pages, routing, server components, streaming |
| **React 19** | UI, with the React Compiler enabled |
| **TypeScript** | Type-safe data models and components |
| **Tailwind CSS v4** | Styling and responsive layout |
| **HeroUI** | Component primitives |
| **BetterAuth** | Email/password + Google + GitHub authentication |
| **MongoDB Atlas** | Session and user storage via `@better-auth/mongo-adapter` |
| **react-hot-toast** | Toast feedback on auth, validation and updates |
| **react-fast-marquee** | The scrolling price ticker |
| **lucide-react / react-icons** | Icons |

Prices come from the public **Programming Hero BazarDor API**.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           signin, signup, profile, profile/update-profile
│   ├── api/auth/[...all] BetterAuth route handler
│   ├── category/[slug]/  category listing + skeleton
│   ├── product/[slug]/   product detail + skeleton
│   ├── layout.tsx        navbar, ticker, footer, toaster
│   ├── page.tsx          home
│   └── not-found.tsx     404
├── components/
│   ├── auth/             AuthCard, SignInForm, SignUpForm, SocialButtons
│   ├── home/             Hero, PriceMoversSection, AllProductsSection
│   ├── layout/           Navbar, CategoryNav, PriceTicker, Footer
│   ├── product/          ProductCard, ProductGrid, SortDropdown, MarketTable
│   ├── profile/          UpdateProfileForm, SignOutButton
│   └── ui/               ChangeBadge, SectionHeading, Skeleton, LiveDate
├── lib/                  api, auth, auth-client, format, price
├── types/type.ts         ICategory, IProduct, IMarketPrice
└── proxy.ts              protects /product/* and /profile/*
```

---

## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd bazar-dor
npm install
```

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=a_long_random_string
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Then run the dev server:

```bash
npm run dev
```

Open <http://localhost:3000>.

**OAuth callback URLs** — register these with each provider:

| Provider | Callback URL |
| --- | --- |
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |

Add the production equivalents (`https://your-domain/api/auth/callback/...`)
after deploying, and set `BETTER_AUTH_URL` to the deployed origin.

---

## 🗺 Routes

| Route | Description | Protected |
| --- | --- | --- |
| `/` | Home — hero, price movers, all products | — |
| `/category/[slug]` | Products in one category, with sorting | — |
| `/product/[slug]` | Price summary and market-wise table | ✅ |
| `/signin` | Email/password, Google and GitHub sign in | — |
| `/signup` | Create an account | — |
| `/profile` | Account details and sign out | ✅ |
| `/profile/update-profile` | Change display name | ✅ |

---

## 🔌 Data Source

```
GET /api/bazardor/categories
GET /api/bazardor/products
GET /api/bazardor/products?category=:slug
GET /api/bazardor/products/:id
```

Base: `https://openapi.programming-hero.com`
Responses are cached for five minutes with Next.js `revalidate`.

---

## 📦 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
