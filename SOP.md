# Standard Operating Procedure (SOP)
## Web Content Management, Heading Hierarchy, Accessibility & Modal Architecture

**Document Version**: 1.0.0  
**Effective Date**: July 2026  
**Application**: AI Capital Investment Web Platform

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

### 3. Blog Content & Media Standards

Every published blog article must include the following structural elements:
- **Title**: Clear, descriptive title in both English and Hindi.
- **Featured Image**: High-resolution image (16:9 ratio) with explicit `alt` text.
- **Metadata**: Category badge, Published Date, Estimated Read Time, Author Name & Role.
- **Abstract/Excerpt**: 2-3 sentence overview summarizing key takeaways.
- **Body Content**: In-depth analysis formatted with bullet points and clear takeaways.

---

### 4. Modal & Overlay Architecture Standard

To maintain a seamless user experience across mobile and desktop devices:
- **Backdrop Styling**: All overlays must use `position: fixed`, `inset: 0`, `z-index: 1000`, and `backdrop-filter: blur(12px)` for visual isolation.
- **Scroll Containment**: Modals must enforce `max-height: 85vh` and `overflow-y: auto` with custom hidden scrollbars to prevent double page scrolling.
- **Dismissal Controls**: Every modal must feature an accessible top-right `X` close button and a primary action dismiss button at the bottom.

---

### 5. Frequently Asked Questions (FAQ) Standard

- FAQ sections must be presented as accessible accordion elements.
- Each question header must use an `<h3>` or `<button>` tag with `aria-expanded` state tracking.
- Content must be provided in both English and Hindi for bilingual audience engagement.
