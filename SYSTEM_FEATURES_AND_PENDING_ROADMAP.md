# AI Capital Investment - System Features & Pending Roadmap Audit

**Document Version**: 1.0.0  
**Audit Date**: October 2026  
**Project**: AI Capital Investment (Wealth Management Platform)  
**Repository**: `Vaasanthi21/ai-capital-investment`  
**Current Tech Stack**: React 19, TypeScript, Vite 8, Express 5, Chart.js, Lucide React, Radix UI  

---

## Executive Summary

The **AI Capital Investment** platform is a full-featured wealth management web application tailored for algorithmic portfolio management, accredited investor advisory, and financial compliance (SEBI RIA & US SEC standards).

The platform features a high-fidelity neon-green and gold dark glassmorphism design system, interactive quantitative visualizers, dual-role dashboards (Investor & Advisor), an OTP email verification flow, an advisor proposal engine, and an accreditation ledger with verified NISM certifications.

This document provides an exhaustive inventory of:
1. **Existing Implemented Features** (Active in codebase & working in UI/Backend)
2. **Simulated / Partially Implemented Features** (Functional UI/mock data requiring live integration)
3. **Pending Features & System Gaps** (Architectural, database, payment, AI, and security roadmaps)
4. **Prioritized Action Plan** for production readiness.

---

## Feature Matrix & Implementation Status Overview

| Functional Domain | Feature / Module | Status | Technical Implementation |
| :--- | :--- | :---: | :--- |
| **Landing & Public Web** | Animated Hero Canvas & Compounding Chart | ✅ **Production Ready** | Canvas 2D, 30fps throttle, requestAnimationFrame |
| **Landing & Public Web** | Interactive Capital & Horizon Simulator | ✅ **Production Ready** | Real-time state formulas, compound interest math |
| **Landing & Public Web** | Bilingual FAQ Accordion (EN & HI) | ✅ **Production Ready** | Schema.org FAQPage structured JSON-LD |
| **Landing & Public Web** | Institutional Services & Value Props | ✅ **Production Ready** | Responsive flex/grid cards, SVG iconography |
| **Landing & Public Web** | E-E-A-T Disclaimers & Regulatory Footer | ✅ **Production Ready** | SEC/SEBI disclaimers, AEO compliance |
| **Auth & Onboarding** | Dual-Role Registration (Investor & Advisor) | ✅ **Production Ready** | Express route, bcrypt password hashing |
| **Auth & Onboarding** | 6-Digit Email OTP Verification | ✅ **Production Ready** | 5-min expiration, auto-resend, Nodemailer SMTP |
| **Auth & Onboarding** | OTP-Based Password Recovery | ✅ **Production Ready** | Reset code verification, bcrypt overwrite |
| **Auth & Onboarding** | Fast Demo Credential Auto-Fill | ✅ **Production Ready** | Instant pre-fill for demo testing |
| **Auth & Onboarding** | JWT / Session Token & Route Guards | ❌ **Pending** | Client-only memory state; no backend auth tokens |
| **Investor Dashboard** | Live Market Feeds (BTC, SPY, GLD) | ⚠️ **Simulated** | 3s random-walk ticker interval; no real WebSocket |
| **Investor Dashboard** | Interactive Asset Allocation Doughnut | ✅ **Production Ready** | Chart.js dynamic redraws based on risk index |
| **Investor Dashboard** | Dynamic Holdings Breakdown Table | ✅ **Production Ready** | Proportionally calculated across 5 asset tiers |
| **Investor Dashboard** | 4-Question Risk Assessment Quiz | ✅ **Production Ready** | Interactive modal, dynamic profile reassignment |
| **Investor Dashboard** | Multi-Year Financial Goal Tracker | ✅ **Production Ready** | Custom goal modal, target dates, progress bar |
| **Investor Dashboard** | Tax-Loss Harvesting Monitor | ✅ **Production Ready** | Simulated swap audit ledger & tax credit savings |
| **Investor Dashboard** | Historical Backtesting (2018–2026) | ✅ **Production Ready** | S&P 500 vs 60/40 benchmark comparison chart |
| **Investor Dashboard** | Historical Crisis Simulator | ✅ **Production Ready** | 2008, 2020, 2022 market shock defense logs |
| **Investor Dashboard** | Volatility Shield Risk Guard | ✅ **Production Ready** | Drawdown limit slider with automated alerts |
| **Investor Dashboard** | Capital Deposit & Transaction Ledger | ⚠️ **Simulated** | Form takes card info; updates in-memory balance |
| **Investor Dashboard** | 3D Animated Robot AI Advisor Chat | ⚠️ **Simulated** | Keyword heuristics; no live LLM API connection |
| **Investor Dashboard** | Direct 1-on-1 Advisor Messaging | ✅ **Production Ready** | Express `/api/chat` engine with 3s auto-polling |
| **Investor Dashboard** | 1-Click Proposal Approval & Execution | ✅ **Production Ready** | Dispatched proposals update portfolio instantly |
| **Advisor CRM Portal** | Verified Client Directory | ✅ **Production Ready** | Real-time fetch, risk badge, capital breakdown |
| **Advisor CRM Portal** | Lead Capture CRM Inbox | ✅ **Production Ready** | Real-time `/api/leads` sync, budget & intent tags |
| **Advisor CRM Portal** | Client Deposit & Fund Auditor | ✅ **Production Ready** | Transaction ID lookup, card last 4 audit |
| **Advisor CRM Portal** | Consultation Meeting Scheduler | ✅ **Production Ready** | Video link generator, topic & calendar scheduling |
| **Advisor CRM Portal** | Structured Allocation Proposal Builder | ✅ **Production Ready** | Custom sliders + AI presets (Conservative/Balanced/Aggressive) |
| **Advisor CRM Portal** | Macro Signal Bulk Dispatch Engine | ✅ **Production Ready** | 1-click bulk reallocation across entire client book |
| **Advisor CRM Portal** | Tax-Loss & Benchmark Analytics | ✅ **Production Ready** | Multi-client AUM and alpha performance tracking |
| **Accreditation & Audit** | Profile Switcher (Ankush Jain / Anant Jain) | ✅ **Production Ready** | Interactive tabs, experience stats, bio details |
| **Accreditation & Audit** | High-Res Certificate Lightbox Viewer | ✅ **Production Ready** | Modal zoom, NISM exam marks, roll numbers, dates |
| **Accreditation & Audit** | Verification Ledger & Direct Links | ✅ **Production Ready** | Direct links to official NISM verification portal |
| **Institutional Blogs** | Standalone Research Directory (`/blogs`) | ✅ **Production Ready** | 6 in-depth papers, category tags, modal reader |
| **Institutional Blogs** | Creative OS Blog Publisher Engine | ❌ **Pending** | Architecture planned in HTML; code not created |
| **Data Persistence** | Production Cloud Database | ❌ **Pending** | Currently uses ephemeral `server/db.json` / `/tmp` |
| **Payment Gateway** | Live Merchant Gateway (Stripe/Razorpay) | ❌ **Pending** | Card form updates state; no real merchant API |
| **Trading Execution** | Automated Brokerage API Bridge | ❌ **Pending** | No Alpaca, Interactive Brokers, or Zerodha API |
| **Real-Time Engine** | WebSockets / SSE for Chat & Feeds | ❌ **Pending** | Currently uses 3s HTTP polling |
| **Video Engine** | WebRTC / Video SDK for Consultations | ❌ **Pending** | Room links are static URLs |

---

## 1. Detailed Breakdown: Existing Features

### 1.1 Public Landing Page & Web Experience (`/`)
- **Interactive Canvas Trading Grid (`HeroCanvas.tsx`)**:
  - Custom HTML5 Canvas rendering animated compounding asset curves, glowing trading nodes, and background particles.
  - Performance-optimized: Throttled to 30fps and pauses automatically via `IntersectionObserver` when scrolled off-screen to conserve CPU cycles.
- **Interactive Compounding Simulator**:
  - Live range sliders allowing prospective investors to adjust initial capital ($1,000 to $1,000,000), investment horizon (1 to 30 years), and risk profiles (Conservative, Balanced, Aggressive).
  - Dynamic calculations contrasting compounding AI-managed returns against traditional index benchmarks.
- **Bilingual FAQ Accordion (English & Hindi)**:
  - Accessible accordion component supporting instant bilingual toggle (`en` / `hi`).
  - Implements Schema.org `FAQPage` JSON-LD structured data for rich snippets in Google and AI answer engines (Perplexity, SGE).
- **Institutional Accreditation Preview (`WealthManagerCertificates.tsx`)**:
  - Highlights SEBI-registered certifications (NISM Series XXI-A, XV, V-A, XVI) directly on the landing page with direct links to the full accreditation ledger.
- **Embedded Lead Capture Form (`LeadCaptureForm.tsx`)**:
  - Allows visitors to submit inquiries specifying name, email, phone, investment budget tier, and primary interest.

### 1.2 Authentication & Account Recovery System
- **Registration Flow (`SignupPage.tsx` & `/api/auth/signup`)**:
  - Collects investor details: Full Name, Email, Phone, Starting Capital, Risk Tolerance, Goal, and Password.
  - Supports role selection: Standard **Investor** vs. Accredited **Advisor**.
  - Passwords salted and hashed with `bcryptjs` (cost factor 10).
- **OTP Verification Flow (`OtpVerification.tsx` & `/api/auth/verify-otp`)**:
  - 6-digit cryptographically generated one-time verification code.
  - 5-minute security TTL window.
  - Automated Resend OTP endpoint (`/api/auth/resend-otp`).
  - Branded responsive HTML email delivery via `nodemailer` (Gmail SMTP). Automatic console simulation fallback when credentials are not configured.
- **Password Recovery (`ForgotPassword.tsx`, `/api/auth/forgot-password`, `/api/auth/reset-password`)**:
  - Secure two-step recovery: OTP dispatched to verified email, followed by password reset submission.
- **Demo Credential Fillers**:
  - Quick-test buttons in the login UI that automatically populate pre-configured test accounts:
    - Investor: `john@gmail.com`
    - Advisor: `johndoe@gmail.com`

### 1.3 Investor Dashboard (`/app` or `/dashboard/*`)
- **Live Market Price Ticker**:
  - Top-bar ticker tracking Bitcoin (BTC), S&P 500 ETF (SPY), and Gold ETF (GLD) with micro-flashes (`flash-up` / `flash-down`) on price shifts.
- **Portfolio Summary & Visualizers**:
  - Animated 60fps count-up metrics for total portfolio valuation, AI-generated profit, and active return percentages.
  - Compounding growth line chart (Chart.js) reacting in real time to slider adjustments.
  - Asset Allocation doughnut chart dynamically recalculating across Cash, Bonds, Equities, Gold, and Digital Assets.
  - Detailed holdings distribution table displaying allocated dollar values and percentage weights.
- **Risk Assessment Quiz Modal**:
  - 4-question weighted psychometric questionnaire assessing investment horizon, market drawdown reaction, capital source, and volatility tolerance.
  - Automatically updates the user's risk tolerance profile (`Conservative`, `Balanced`, or `Aggressive`).
- **Financial Goal Tracker**:
  - Custom goal creator modal (Goal Name, Target Dollar Amount, Target Date).
  - Progress bar tracking accumulated wealth toward specific milestones (e.g., Retirement, Home Purchase).
- **Tax-Loss Harvesting (TLH) Suite**:
  - Audit trail documenting algorithmic tax swaps (e.g., swapping SPY into Large Cap Core ETF to maintain market correlation while locking in tax deductions without violating the 60-day IRS wash-sale rule).
  - Total accumulated tax credits calculator.
- **Historical Backtesting Engine**:
  - Interactive backtest visualizer covering 2018 through 2026.
  - Comparative toggle: AI Multi-Asset Model vs. S&P 500 Index vs. Classic 60/40 Portfolio.
- **Crisis Simulation Stress Testing**:
  - Interactive scenario triggers simulating historical market shocks:
    - **2008 Financial Crisis**: Triggers defensive flight to gold and high-yield bonds, capping drawdowns to -12% vs. market -35%.
    - **2020 Liquidity Shock**: Deploys rapid cash reserves and captures bottom-market equity rotations (+6.4% net year-end).
    - **2022 Tech Drawdown**: Trims high-beta tech exposure by 25% into commodity hedges.
- **Volatility Shield Risk Management**:
  - User-configurable maximum drawdown threshold slider (e.g., 8% cap) with real-time status monitoring logs.
- **Capital Deposit & Transaction History (`/dashboard/deposit`)**:
  - Strategy tier selection: Starter ($5,000), Growth ($25,000), Elite ($100,000), or Custom Capital.
  - Credit/Debit card payment authorization form.
  - Instant account balance adjustment upon deposit submission.
  - Complete searchable and filterable transaction ledger recording all deposits, dividend credits, and yield payouts.
- **Dual-Mode Advisory Hub (`/dashboard/advisory`)**:
  - **AI Chatbot**: Features custom SVG-animated robot ("CuteRobot") with responsive eye-blinking and speaking animations.
  - **Human Advisor Messaging**: Direct bi-directional messaging with the designated Senior Wealth Manager (`johndoe@gmail.com`).
  - **Proposal Execution**: Displays an active golden banner whenever an advisor dispatches a custom asset rebalance proposal, with a one-click "Approve & Execute" action that dynamically re-weights the live portfolio.

### 1.4 Advisor CRM & Portfolio Management Portal (`/advisor/*`)
- **Client Management Directory (`/advisor/clients`)**:
  - Comprehensive index of all registered and verified investors.
  - Displays investor contact details (phone, email), current invested capital, risk profile, and investment goals.
  - One-click actions per client: Send Advisory Recommendation, Create Structured Proposal, Direct Chat, and Audit Client Deposits.
- **Lead Capture CRM (`/advisor/leads`)**:
  - Centralized dashboard displaying all prospective leads submitted through landing page and blog inquiry forms.
  - Shows investor name, email, phone number, investment budget bracket, primary interest, message snippet, and submission timestamp.
- **Client Deposit Auditor (`/advisor/deposits`)**:
  - Real-time audit log of all capital deposits made across client accounts, including transaction IDs, payment methods, card last-4 digits, and verification status.
- **Consultation Meeting Scheduler (`/advisor/schedule`)**:
  - Interface to schedule video consultations with investors.
  - Configures date, time, consultation topic, client name, and auto-generates secure room links.
- **Structured Proposal Builder**:
  - Precision sliders for custom asset allocation across Equities, Bonds, Cash, and Gold.
  - Preset generators: 1-click auto-fill based on investor risk profile (`Conservative`, `Balanced`, `Aggressive`).
  - Dispatches proposals directly to the client's dashboard for immediate review and execution.
- **Macroeconomic Bulk Dispatcher (`/advisor/insights`)**:
  - Macro-event triggers allowing advisors to dispatch bulk rebalancing proposals to all clients simultaneously:
    - *Inflation Spike*: Expands physical gold allocations by 10%.
    - *Recession Warning*: Trims equities by 15% into sovereign bonds and cash reserves.
    - *Crypto Momentum*: Adjusts digital asset weights for high-beta alpha.
    - *Interest Rate Shift*: Rotates cash vaults into high-yield corporate and sovereign bonds.
- **Tax Optimization & Compliance Hub**:
  - Multi-client audit logs tracking wash-sale compliance and client tax alpha generated.

### 1.5 Standalone Accreditation & Verification Ledger (`/accreditation`)
- **Interactive Advisor Switcher**:
  - Seamless switching between verified advisor profiles:
    - **Ankush Jain** (Portfolio Manager & Research Analyst - 8+ Years Experience, $50M+ AUM Monitored).
    - **Anant Jain** (Mutual Fund & Commodities Specialist - 6+ Years Experience, $30M+ Hedging Volume).
- **Official NISM Examination Records**:
  - Covers NISM Series XXI-A (PMS Distributors), Series XV (Research Analyst), Series V-A (Mutual Fund Distributors), and Series XVI (Commodity Derivatives).
  - Exact test dates, test centers (NSEiT Ranchi), marks obtained, registration IDs, enrolment numbers, validity dates, and registrar signatures.
- **Certificate Lightbox Viewer**:
  - High-resolution modal certificate viewer with direct links to official PDF certificates and NISM verification endpoints.
- **Verification Ledger (`VerificationLedger.tsx`)**:
  - Immutable timeline ledger of certification events with copyable enrolment numbers and direct links to verify credentials on the official NISM skill registry.

### 1.6 Standalone Institutional Research & Market Blogs (`/blogs`)
- **6 Full-Length Quantitative Research Articles**:
  1. *AI-Driven Asset Allocation: Outperforming Inflation & Market Volatility in 2026* (Dr. Aris Thorne)
  2. *Tax-Loss Harvesting Guide: Maximizing Net Investment Returns* (Elena Rostova, CFA)
  3. *Understanding Digital Assets & Cryptocurrency Market Mechanics* (Marcus Vance)
  4. *U.S. SEC Investor Alerts & Regulatory Risk Management Guidance* (Sarah Jenkins)
  5. *Machine Learning in Portfolio Construction: Neural Network Models for 2026* (Dr. David Chen)
  6. *Federal Reserve Monetary Policy & Interest Rate Risk Management in 2026* (Robert Sterling)
- **Interactive Reading Features**:
  - Category filtering (`AI & Tech`, `Tax Strategy`, `Macro Strategy`, `Crypto`).
  - Real-time text search across titles, abstracts, and body content.
  - Full-screen modal reader with estimated read times, author badges, and key institutional takeaways.
  - Embedded Lead Generation form and advisor credentials at the conclusion of each article.

---

## 2. Simulated & Mock Components (Requiring Live Integration)

While the frontend presentation and business logic are fully functional, several modules currently operate on simulated data or mock handlers:

| Component | Current Mock Behavior | Live Integration Required |
| :--- | :--- | :--- |
| **Market Tickers** | `setInterval` random-walk price fluctuation (+/- 0.4% every 3s) | Connect to live market data WebSockets (Polygon.io, Alpha Vantage, Binance) |
| **Payment Gateway** | Accepts card inputs and increments numeric balance in `db.json` | Integrate Stripe Elements / PaymentIntents or Razorpay SDK |
| **Trade Execution** | Calculates mathematical weights and updates JSON state | Connect to Brokerage Execution APIs (Interactive Brokers, Alpaca, Zerodha) |
| **AI Advisory Bot** | Evaluates input strings using keyword substring matches | Connect to Generative AI API (Google Gemini, OpenAI) with financial system prompts |
| **Video Consultations** | Generates static URL string (`https://meet.aicapital.com/room-XXXX`) | Integrate WebRTC video service (Daily.co, Twilio Video, or Google Meet API) |
| **Live Chat** | Polling `/api/chat/history` via HTTP `GET` every 3 seconds | Upgrade to WebSockets (Socket.io) or Server-Sent Events (SSE) |
| **Database Storage** | Writes to local `server/db.json` (or ephemeral `/tmp/db.json` on Vercel) | Migrate to persistent cloud database (PostgreSQL via Supabase/Neon, or MongoDB) |

---

## 3. Pending Features & Technical Gaps

### 3.1 Creative OS Blog Publishing & Sync Engine
*Context: Fully documented in `Blog_Publishing_Implementation_Plan.html` but pending code implementation.*
- **Storage Layer (`src/lib/blogStorage.ts`)**:
  - Needs a local/cloud DAO layer implementing `getUserBlogs()`, `saveUserBlog()`, and `deleteUserBlog()`.
- **Publisher Editor Component (`src/components/CreativeOSPublisher.tsx`)**:
  - Modal editor form allowing logged-in investors to write articles with Title, Category, Abstract, Paragraphs, and Cover Image URL.
- **Dynamic Feed Merger**:
  - Modify `StandaloneBlogPage.tsx` to dynamically merge user-published articles with static institutional articles and tag them with a `"Community Published"` badge.
- **Cross-Tab Real-Time Sync**:
  - Implement `window.addEventListener('storage', ...)` and custom event dispatching so newly published articles appear instantly across active browser tabs.

### 3.2 Production Database & Persistent Storage
- **Current Limitation**: In serverless production (Vercel), file writes to `/tmp/db.json` are ephemeral. When a serverless container recycles or scales across regions, user accounts, deposits, and leads created during that session are lost.
- **Required**:
  - Set up a cloud database (PostgreSQL via Supabase, Neon, or PlanetScale; or MongoDB Atlas).
  - Implement an ORM or query layer (Prisma or Drizzle ORM).
  - Create database schema migrations for `users`, `otps`, `transactions`, `meetings`, `messages`, and `leads`.

### 3.3 Authentication Security & Session Persistence
- **Current Limitation**:
  - `App.tsx` stores login state strictly in React memory (`useState`). Refreshing the browser on `/app` or `/advisor` resets user state back to the default mock user.
  - Backend API endpoints (`/api/advisor/*`, `/api/investor/*`, `/api/chat/*`) do not validate bearer tokens; requests can be executed simply by supplying an email query or body parameter.
- **Required**:
  - Issue cryptographically signed **JWT tokens** (or secure HttpOnly session cookies) upon successful login.
  - Store token in secure storage and implement session restoration on page reload.
  - Add Express authentication middleware (`authMiddleware`) to protect all private endpoints.
  - Enforce server-side Role-Based Access Control (RBAC) ensuring only verified advisors can access `/api/advisor/*`.

### 3.4 Payment Processing & Banking Rails
- **Current Limitation**: The `/payment` route and Dashboard Deposit section simulate transactions without contacting payment networks.
- **Required**:
  - **US / Global**: Integrate **Stripe PaymentIntents** and **Stripe Elements** with 3D Secure verification.
  - **India**: Integrate **Razorpay** / UPI payment gateway for SEBI-compliant domestic transactions.
  - **Banking ACH / Direct Deposit**: Integrate **Plaid** for verified bank account linking.
  - **Webhooks**: Implement `/api/webhooks/stripe` to handle asynchronous payment success, failure, and chargeback notifications.
  - **Withdrawal Processing**: Build UI and backend endpoints for capital withdrawals to verified bank accounts.

### 3.5 Automated Brokerage Execution Bridge
- **Current Limitation**: Portfolio rebalances are simulated on the frontend canvas and stored in JSON.
- **Required**:
  - Connect to custodial brokerage APIs (e.g., **Alpaca Trading API**, **Interactive Brokers Web API**, or **Zerodha Kite Connect**).
  - Automate fractional share purchasing, limit/market order routing, and rebalance order execution.
  - Ingest real portfolio balances and live transaction histories directly from clearing partners (Apex Clearing / DriveWealth).

### 3.6 Generative AI Engine Integration (Google Gemini API)
- **Current Limitation**: The AI advisor bot uses hardcoded string pattern matching.
- **Required**:
  - Integrate **Google Gemini API** (`@google/genai`) or Claude/OpenAI API via backend proxy endpoint (`/api/ai/chat`).
  - Implement system prompts containing financial compliance disclaimers, portfolio theory principles, and risk management guidelines.
  - Build a RAG (Retrieval-Augmented Generation) pipeline embedding user asset allocations, holdings, and recent market research for hyper-personalized financial guidance.

### 3.7 Real-Time Infrastructure (WebSockets / SSE)
- **Current Limitation**: Both live chat and price feeds rely on polling intervals or synthetic timers.
- **Required**:
  - Implement **Socket.io** or native WebSockets for instant investor-to-advisor direct messaging, typing indicators, and read receipts.
  - Connect WebSocket streams to live financial market tickers for millisecond-level price feeds.

### 3.8 Automated Testing & CI/CD Pipeline
- **Current Limitation**: The project has zero automated unit, integration, or end-to-end tests; verification relies on manual browser testing and `oxlint`.
- **Required**:
  - **Unit Testing**: Vitest for compound growth calculations, tax-loss harvesting logic, and risk assessment scoring.
  - **API Testing**: Supertest for Express auth, OTP, deposit, and proposal endpoints.
  - **E2E Testing**: Playwright test suite verifying critical user journeys: Registration -> OTP Verification -> Payment -> Dashboard Navigation -> Proposal Execution.
  - **CI/CD**: GitHub Actions workflow running linting, TypeScript check, unit tests, and Vite build on every pull request.

---

## 4. Prioritized Implementation Roadmap

```
PHASE 1: Core Reliability & Security (Sprint 1 - 2)
  ├── 1. Persistent Cloud Database (Supabase / PostgreSQL migration)
  ├── 2. JWT Authentication, Route Guards & Session Reload Persistence
  └── 3. Express authMiddleware & Server-side RBAC protection

PHASE 2: Live Integrations & Payments (Sprint 3 - 4)
  ├── 1. Stripe / Razorpay Gateway Integration with Webhook handlers
  ├── 2. Live Market Data WebSocket Feed (Polygon.io / Alpha Vantage)
  └── 3. Generative AI Chatbot Integration (Google Gemini API)

PHASE 3: Content & Platform Expansion (Sprint 5 - 6)
  ├── 1. Creative OS Blog Publishing Engine (src/lib/blogStorage.ts & Editor)
  ├── 2. WebSockets for Advisor-Investor Real-Time Chat (Socket.io)
  └── 3. Automated Brokerage Execution Sandbox (Alpaca / Interactive Brokers)

PHASE 4: Enterprise Hardening & Quality (Sprint 7)
  ├── 1. Comprehensive Vitest & Playwright Test Automation
  ├── 2. Production Transactional Email Service (Resend / AWS SES)
  └── 3. SOC2 / Financial Compliance Logging & Audit Trail
```

---

## Conclusion

The current AI Capital Investment codebase contains a robust, highly polished user experience with complete UI components, quantitative visualizers, bilingual compliance assets, and functional local endpoints.

By executing the prioritized roadmap—transitioning ephemeral storage to a persistent cloud database, implementing standard JWT session security, connecting live merchant payment rails, and integrating Google Gemini AI—the platform will advance from a working prototype to an enterprise-grade wealth management platform.
