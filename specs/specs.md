# Resume Website — Specs

Purpose
- Single-page, professional resume-style website for a Software Engineering Manager.
- Present contact info, career history, leadership & org impact, and technical skills clearly and quickly.
- Clean, modern, print-friendly, and accessible — built primarily with HTML and CSS, with optional JavaScript for enhanced interactivity.

Constraints
- Primary content and layout must work with HTML + CSS. JavaScript is allowed specifically to implement expand/collapse and related accessible interactivity in the career section (progressive enhancement).
- All content must appear on one HTML page (single scrollable document). Collapsed content must remain in the DOM and be discoverable without JS (i.e., visible by default or accessible via CSS-only fallback).
- No external JS frameworks. Prefer small, vanilla JavaScript modules. Web-safe fonts or simple Google Fonts allowed if linked in HTML header.
- Target modern browsers; responsive down to 320px width.
- Keep bundle small (images optimized / optional). Any JS should be tiny and defer/non-blocking.

Content and Information Architecture (single page)
1. Meta + Header
   - Title, description, viewport meta.
   - Top nav (anchor links to sections).
   - Prominent name, title (Software Engineering Manager), location, contact links (email, LinkedIn, GitHub), one-line tagline.

2. Professional Summary
   - 2–4 sentence summary emphasizing leadership style, scope (team size, org layers), domain, and impact metrics.

3. Core Metrics / Highlights
   - Compact stats row (e.g., "Led 3 teams • Hired 25+ engineers • 40% cycle-time reduction").
   - Use semantic HTML (ul/li) and visually emphasize numbers.

4. Experience (chronological, condensed)
   - For each role: company, title, dates, 3–6 bullet points.
   - Focus on leadership outcomes: team size, org changes, delivery improvements, hiring/retention, cross-functional work, measurable results (percentages, time saved, revenue impact).
   - Limit visible roles to 4 on first render; older roles can be collapsed. Expand/collapse may be implemented with CSS-only techniques or enhanced with JavaScript (preferred for better accessibility and state handling).

5. Leadership & Org Skills
   - Sections: Team building & hiring, Mentorship & career growth, Process & delivery (Agile/SDLC), Cross-functional communication, Strategy & roadmap.
   - Short descriptive bullets or mini-case examples.

6. Technical & Management Skillset (sidebar or distinct block)
   - Engineering skills: languages, platforms, architecture patterns.
   - Management skills: hiring, performance reviews, OKRs, scaling orgs.
   - Tools: CI/CD, observability, project management, cloud providers.
   - Use comma lists or tag-like chips for quick scanning.

7. Selected Projects / Case Studies (2–3)
   - Title, short description, role, outcome (metric-driven).
   - Emphasize decisions made & impact rather than implementation details.

8. Education & Certifications
   - Short list (institution, degree, year if desired).
   - Relevant certifications (e.g., cloud certs, management training).

9. Footer / Action
   - Call to contact (email), downloadable PDF link (print CSS + mailto + link to print-friendly view).
   - Copyright & minimal privacy note.

JavaScript: Expand/Collapse (requirements)
- Purpose: allow users to expand/collapse older career entries to reduce visual clutter while keeping content discoverable.
- Progressive enhancement:
  - Page must be fully usable without JS: collapsed sections should either be visible by default or a CSS-only fallback must exist (e.g., show first N entries, with remaining content visible but styled).
  - When JS is enabled, enhance UX by collapsing older entries and adding controls to expand them.
- Accessibility:
  - Use semantic buttons for toggles (not anchors or divs).
  - Toggle buttons must include aria-expanded and aria-controls attributes.
  - Collapsible content must use id attributes referenced by aria-controls.
  - Manage focus appropriately when expanding/collapsing (focus remains on the toggle or moves into revealed content as appropriate).
  - Keyboard operable (Enter/Space activate toggles).
  - Ensure reduced-motion preference respected for any transitions (respect prefers-reduced-motion).
- Behavior:
  - Default: show latest 3–5 roles; collapse the rest.
  - Controls: a single "Show more" / "Show less" per collapsed group or per role depending on visual design.
  - Optionally persist user preference in sessionStorage/localStorage (non-essential).
  - Keep JS small (<5–10 KB gzipped if possible) and modular (e.g., js/main.js).
- CSS hooks:
  - Use clear classes and data-attributes for JS to target (e.g., .collapsible, .is-collapsed, data-collapsible-group).
  - Provide visual indicators (chevron icons) that rotate when expanded; icons can be inline SVG.
- Print & SEO:
  - Print stylesheet must expand all collapsed sections for a complete resume printout.
  - Collapsed content must still be present in DOM so search engines and assistive tech can access it.

Visual & Layout Guidelines
- Overall style: minimal, high contrast, professional.
- Grid: two-column layout on desktop — left column 28–32% (contact, skills, quick stats), right column 68–72% (main content). Collapse to single column on small screens.
- Typographic scale:
  - Font-family: system stack or one professional sans-serif (e.g., Inter / Roboto).
  - Name: large, bold (28–36px desktop). Section headings: medium-bold (16–20px).
  - Body text: 14–16px with 1.4 line-height.
- Spacing: generous whitespace; clear separation between sections (padding/margins).
- Colors:
  - Neutral background (white / very light gray).
  - Primary text: #111 / #222.
  - Accent color: single muted accent (blue/teal) for links, chips, and stats.
  - Use subtle borders or dividers for section breaks.
- Visual cues:
  - Use subtle chips / badges for skills.
  - Use horizontal rule or left border to differentiate sidebar.
  - Minimal icons (SVG inline if needed) — avoid images for essential info.

Accessibility & Print
- Semantic HTML (header, main, nav, section, article, footer).
- Sufficient color contrast (WCAG AA).
- Keyboard navigable anchors; focus styles visible.
- Provide print stylesheet:
  - Hide non-essential UI (nav), stack to single column, ensure page breaks make sense.
  - Set link URLs to show next to link text for printed PDF.
  - Ensure collapsed sections are expanded in print view.

Responsive Behavior
- Breakpoint examples: <= 768px collapse to single column and reduce typographic scale.
- Ensure contact methods remain prominent on mobile (sticky header optional).
- Expand/collapse controls must be easy to tap on mobile.

Microcopy & Tone
- Professional, concise, outcome-focused.
- Use active verbs and numbers for impact.
- Keep personal anecdote minimal — prioritize quantified leadership outcomes.

Deliverables (what the repo/page should contain)
- index.html — single page with all content & links to styles.
- styles.css — single stylesheet, well-organized with comments and sections (variables, layout, components).
- js/main.js — small vanilla JS module implementing expand/collapse and optional state persistence.
- optional assets/ (optimized headshot, inline SVG icons).
- print.css (or media queries inside styles.css) for print-friendly output.

Acceptance Criteria
- Single index.html + CSS; optional JS lives in js/main.js and enhances expand/collapse in the career section.
- Page is responsive and readable on mobile and desktop.
- Uses semantic HTML, accessible contrast, and keyboard navigation.
- Key metrics and 3–5 experience entries visible without scrolling past fold on desktop.
- Expand/collapse works when JS is enabled, and content remains accessible when JS is disabled.
- Print-friendly output expands all sections for a neat PDF resume via browser Print.

Example minimal HTML structure (for reference)
- header: name, title, contact
- main:
  - aside (left column): skills, contact, metrics
  - section (right column): summary, experience, leadership, projects, education
- footer: contact CTA

Notes & constraints for authoring content
- Keep each bullet in experience to one line where possible; no dense paragraphs.
- Use consistent date format (e.g., "Jan 2020 — Present").
- Prefer metrics in (%) or absolute numbers; avoid vague claims.

Estimated effort
- HTML + CSS implementation: 2–6 hours depending on polish and print stylesheet.

Versioning / Future enhancements (out of scope)
- Provide JSON-LD for resume schema for SEO.
- Multiple theme support (light/dark).