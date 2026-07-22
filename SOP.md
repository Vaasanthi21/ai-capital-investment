# Standard Operating Procedure (SOP)
## Web Content Management, Heading Hierarchy, Accessibility, AEO, Structured Data & YMYL Financial Compliance

**Document Version**: 2.0.0  
**Effective Date**: July 2026  
**Application**: AI Capital Investment Web Platform  
**Target Vertical**: YMYL Wealth Management & Algorithmic Investment (Global & India SEBI / US SEC Compliance)

---

### 1. Heading Hierarchy & Semantic HTML Standard

To ensure maximum SEO indexing, screen reader accessibility, and consistent structure, all page components must strictly adhere to the following heading tag rules:

1. **`<h1>` Main Title (Exactly ONE per Page)**
   - Used **only once** per view for the primary hero title (e.g., `<h1>Intelligent Wealth Management for the Modern Investor</h1>`).
   - Must contain primary keywords related to the platform's core offering.

2. **`<h2>` Section Headers**
   - Applied to major logical sections on the landing page and dashboards.
   - Examples: `<h2>Why Choose AI Capital Investment?</h2>`, `<h2>Our Services</h2>`, `<h2>Market Research & AI Wealth Blogs</h2>`, `<h2>Frequently Asked Questions</h2>`.

3. **`<h3>` Component & Card Titles**
   - Applied to individual feature cards, service cards, blog post titles, and modal headers.
   - Examples: `<h3>AI Portfolio Optimization</h3>`, `<h3>Tax-Loss Harvesting Strategies</h3>`.

4. **`<h4>` / `<h5>` Sub-headers & Metadata**
   - Applied to minor card labels, user profile tiers, and statistical values.

---

### 2. Image Accessibility & Alt Text Requirements

All images rendered across the application MUST include descriptive, context-rich `alt` attributes to satisfy WCAG 2.1 AA accessibility standards:

- **Blog Thumbnails**: Must describe the subject of the image (e.g., `alt="AI Stock Chart Analysis and Quantitative Trading Dashboard"`).
- **Hero & Feature Graphics**: Must describe the visual representation (e.g., `alt="Interactive 3D Portfolio Performance Chart"`).
- **Icons & Decorative Elements**: Decorative SVGs must include `aria-hidden="true"` or descriptive titles.

---

### 3. Blog Content & Freshness Architecture

Every published blog article must include the following structural elements:
- **Quarterly Cadence Audit**: All market insights must be audited or updated quarterly to prevent AI citation decay.
- **First-Party Empirical Data**: Must cite first-party quantitative backtest metrics (e.g., 30-year macroeconomic backtests, drawdown caps < 4.5%).
- **Metadata**: Category badge, Published Date, Last Modified Date, Estimated Read Time, Author Name, Role, & Verified Certification Credentials.
- **Abstract/Excerpt**: 2-3 sentence overview summarizing key takeaways.
- **Body Content**: In-depth analysis formatted with bullet points and clear takeaways.

---

### 4. Modal & Overlay Architecture Standard

To maintain a seamless user experience across mobile and desktop devices:
- **Backdrop Styling**: Overlays must use `position: fixed`, `inset: 0`, `z-index: 1000`, with optimized fallbacks for GPU efficiency.
- **Scroll Containment**: Modals must enforce `max-height: 85vh` and `overflow-y: auto` with custom hidden scrollbars to prevent double page scrolling.
- **Dismissal Controls**: Every modal must feature an accessible top-right `X` close button and a primary action dismiss button at the bottom.

---

### 5. Frequently Asked Questions (FAQ) Standard

- FAQ sections must be presented as accessible accordion elements.
- Each question header must use an `<h3>` or `<button>` tag with `aria-expanded` state tracking.
- Content must be provided in both English and Hindi for bilingual audience engagement.

---

### 6. Structured Data & Answer-Engine Optimization (AEO) Standard

AI Answer Engines (Perplexity, ChatGPT, Gemini, Google SGE) rely on machine-readable structured markup and answer-first content formatting:

1. **Mandatory Schema.org JSON-LD Types**:
   - **`FAQPage` Schema**: Applied to all FAQ sections to allow AI engines to extract Q&A pairs directly.
   - **`BlogPosting` / `Article` Schema**: Must specify `headline`, `author` (with `jobTitle` & `sameAs`), `publisher` (`Organization`), `datePublished`, `dateModified`, and `image`.
   - **`FinancialService` & `Organization` Schema**: Details regulatory status (SEC / SEBI registered advisor), corporate location, and official `sameAs` social links.

2. **AEO "Answer-First" Paragraph Protocol**:
   - **40–60 Word Standalone Summary**: The first paragraph under every `<h2>` section or FAQ answer MUST be a standalone, citable answer to the implied question.
   - Avoid long preamble or multi-paragraph build-up before delivering the core factual conclusion.

---

### 7. Financial YMYL (Your Money / Your Life) & E-E-A-T Compliance

Because wealth management falls under Google's highest-scrutiny YMYL category, strict Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) rules apply:

1. **Author Bio Credentials**:
   - Every author must list formal credentials (e.g., *Elena Rostova, CFA, SEBI / SEC Registered Investment Advisor, Head of Private Wealth*).

2. **Mandatory Disclaimer Banners**:
   - Every blog post, insight page, and investment dashboard must display an explicit financial disclaimer:
     > *"Disclaimer: AI Capital Investment provides algorithmic wealth management. Past performance does not guarantee future results. Content is for informational purposes and does not constitute individual tax, legal, or financial advice."*

3. **Verifiable Regulatory References**:
   - Include official registration numbers (SEBI RIA / SEC Broker-Dealer) in organization schemas and site footers.

---

### 8. Mobile GPU Performance & Core Web Vitals Safeguards

Heavy CSS effects like `backdrop-filter: blur(12px)` on full-screen overlays can trigger severe GPU repaint latency and degrade Core Web Vitals (LCP & INP) on mobile browsers:

- **Mobile Optimization Rule**: Use high-opacity dark overlays (`rgba(4, 12, 6, 0.96)`) with lightweight blur (`backdrop-filter: blur(4px)`) on screens `<= 860px`.
- **Feature Query Fallback**: Always wrap heavy blur effects in `@supports (backdrop-filter: blur(1px))` to prevent mobile rendering crashes.
