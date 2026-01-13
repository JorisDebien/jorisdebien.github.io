# Personal Website React Specs

## Project Overview
- **Framework**: Plain React with client-side routing
- **Routing**: Separate routes for each page (/, /career, /skills)
- **Data**: Static CSV files imported at build time
- **Design**: Clean, minimal design system with mobile-first responsive approach
- **Styling**: No specific framework requirement (CSS, inline styles, or basic CSS-in-JS)

---

## Design System

### Typography
- **Font**: System fonts or a single web font (e.g., Inter, Roboto)
- **Headings**: 
  - H1: 32px/2rem (mobile: 24px/1.5rem)
  - H2: 24px/1.5rem (mobile: 20px/1.25rem)
  - H3: 20px/1.25rem
- **Body**: 16px/1rem
- **Small**: 14px/0.875rem

### Spacing Scale
- `xs`: 4px (0.25rem)
- `sm`: 8px (0.5rem)
- `md`: 16px (1rem)
- `lg`: 24px (1.5rem)
- `xl`: 32px (2rem)
- `2xl`: 48px (3rem)

### Colors (Basic Palette)
- **Primary**: Dark text (#1a1a1a) on light backgrounds
- **Secondary**: Gray (#666)
- **Accent**: Optional single accent color for interactive elements
- **Border**: Light gray (#e0e0e0)
- **Background**: White or off-white (#f9f9f9)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## Page Specs

### 1. Homepage (`/`)

#### Purpose
Introduce Joris Debien with a professional headshot, name, and links to social profiles and other pages.

#### Components
- `HomePage` (main page component)
  - `Header` (contains headshot, name, social links)
  - `Navigation` (links to Career and Skills pages)

#### Data Structure
```javascript
const profile = {
  name: "Joris Debien",
  headshot: "/assets/headshot.svg",
  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jorisdebien/" },
    { label: "Github", url: "https://github.com/JorisDebien/" }
  ]
}
```

#### Layout
- Centered column layout
- Headshot: 200px diameter on desktop, 150px on mobile, circular (border-radius: 50%) with SVG centered
- Name prominently displayed below headshot
- Social links displayed as logo icons (LinkedIn logo and GitHub logo) with 20px gap between them
- Navigation links to Career and Skills pages below social links with rounded buttons (border-radius: 8px)
- Vertical padding: `xl` (32px) on desktop, `lg` (24px) on mobile
- Max width: 600px centered

#### Responsive Behavior
- **Mobile** (< 640px):
  - Single column, centered
  - Headshot: 150px circular with centered SVG
  - Padding: 24px horizontal, 32px vertical
  - Social links display as logos horizontally with gap
  - Navigation buttons full width, stacked vertically, rounded (8px)
  
- **Desktop** (≥ 640px):
  - Single column, centered
  - Headshot: 200px circular with centered SVG
  - Padding: 48px horizontal, 64px vertical
  - Navigation buttons auto width, side-by-side, rounded (8px)

#### Accessibility
- Use semantic HTML (`<header>`, `<nav>`)
- Image alt text: "Joris Debien"
- Link text is descriptive (avoid generic "click here")
- Adequate color contrast for all text

#### Styling Approach
- Flexbox for centering and spacing
- Simple CSS classes or inline styles
- No complex animations

---

### 2. Career Page (`/career`)

#### Purpose
Display career history as a list of collapsible cards, each showing job title, company, timeline, and description.

#### Components
- `CareerPage` (main page component)
- `CareerCard` (individual collapsible card)
  - Props: `title`, `subtitle`, `description`, `isOpen`, `onToggle`

#### Data Source
Import and parse `assets/career.csv`:
```
Title;Company;From;To;Description
Senior Engineering Manager;Cluepoints;jan/24;Present;Leading the charge...
Engineering Manager;Cluepoints;sep/22;jan/24;In charge of three...
```

Parsed structure:
```javascript
const careers = [
  {
    id: 0,
    title: "Senior Engineering Manager",
    company: "Cluepoints",
    from: "jan/24",
    to: "Present",
    description: "Leading the charge in continuous improvement..."
  },
  // ... more entries
]
```

#### State Management
```javascript
const [openCards, setOpenCards] = useState([]);

const toggleCard = (id) => {
  setOpenCards(prev => 
    prev.includes(id) 
      ? prev.filter(cardId => cardId !== id)
      : [...prev, id]
  );
};
```

Multiple cards can be open at the same time.

#### Card Layout
- **Title Section** (always visible):
  - Title: "{Title} at {Company}" (bold, 18px)
  - Subtitle: "{From} - {To}" (secondary color, 14px)
  - Padding: `md` (16px)
  - Background: light gray (#f9f9f9)
  - Border: 1px solid #e0e0e0
  - Border-radius: 8px
  - Cursor: pointer, hover state (slight background change)

- **Content Section** (hidden when collapsed):
  - Description text: 16px line-height 1.5
  - Padding: `md` (16px)
  - Background: white
  - Border: 1px solid #e0e0e0 (bottom and sides)
  - Border-top: none
  - Border-radius: 0 0 8px 8px

#### Responsive Behavior
- **Mobile** (< 640px):
  - Card width: 100%
  - Padding on container: `md` (16px)
  - Title/subtitle font sizes: 16px / 12px
  - Stack cards vertically with `md` (16px) gap

- **Desktop** (≥ 640px):
  - Max-width container: 800px
  - Padding on container: `xl` (32px)
  - Title/subtitle font sizes: 18px / 14px
  - Gap between cards: `lg` (24px)

#### Accessibility
- Use semantic HTML (`<button>` or `<div role="button">`)
- `aria-expanded` on toggle element
- Keyboard navigation (Enter/Space to toggle)
- Sufficient color contrast
- Focus indicators on interactive elements

#### Styling Approach
- Card: border, rounded corners, shadow optional
- Hover state on title section
- No animations, but transitions acceptable (opacity, max-height)

---

### 3. Skills Page (`/skills`)

#### Purpose
Display a clean list of skills with descriptions as collapsible cards.

#### Components
- `SkillsPage` (main page component)
- `SkillCard` (individual collapsible card component)

#### Data Source
Import and parse `assets/skills.csv`:
```
Skills;Description
People management;I've managed small and large teams...
Software testing;...
Systems thinking;...
```

Parsed structure:
```javascript
const skills = [
  {
    id: 0,
    skill: "People management",
    description: "I've managed small and large teams..."
  },
  // ... more entries
]
```

#### State Management
```javascript
const [openCards, setOpenCards] = useState([]);

const toggleCard = (id) => {
  setOpenCards(prev => 
    prev.includes(id) 
      ? prev.filter(cardId => cardId !== id)
      : [...prev, id]
  );
};
```

Multiple cards can be open at the same time.

#### Card Layout
- **Title Section** (always visible):
  - Skill name (bold, 16px)
  - Padding: `md` (16px)
  - Background: light gray (#f5f5f5)
  - Border: 1px solid #e0e0e0
  - Border-radius: 8px
  - Cursor: pointer, hover state (background #e8e8e8)

- **Content Section** (hidden when collapsed):
  - Description text: 14px line-height 1.6
  - Padding: `md` (16px)
  - Background: white
  - Border: 1px solid #e0e0e0 (bottom and sides)
  - Border-top: none
  - Border-radius: 0 0 8px 8px

#### Layout
- Vertical list of skill cards
- Max-width: 700px
- Gap between cards: 15px

#### Responsive Behavior
- **Mobile** (< 640px):
  - Single column list
  - Full width with `md` (16px) padding
  - Vertical gap: `md` (16px)
  - Card title: 14px
  - Card description: 13px

- **Desktop** (≥ 640px):
  - Single column list
  - Max-width: 700px
  - Vertical gap: 15px
  - Card title: 16px
  - Card description: 14px

#### Accessibility
- Use semantic HTML (`<button>` or `<div role="button">`)
- `aria-expanded` on toggle element
- Keyboard navigation (Enter/Space to toggle)
- Sufficient color contrast
- Focus indicators on interactive elements

#### Styling Approach
- Card: border, rounded corners (8px)
- Hover state on title section
- No animations, but transitions acceptable

---

## Global Considerations

### CSV Parsing
- Use a CSV parser library (e.g., `papaparse`, `csv-parser`) or manual parsing
- Handle optional/empty fields gracefully
- Parse at build time or during initial component load

### Routing
- Use React Router or a simple hash-based router
- Clear navigation between pages
- Active link indication in navigation

### File Structure
```
src/
  components/
    HomePage.jsx
    CareerPage.jsx
    SkillsPage.jsx
    CareerCard.jsx
    SkillsList.jsx
    Navigation.jsx
  pages/
    (or route handlers)
  data/
    career.js (parsed CSV)
    skills.js (parsed CSV)
  styles/
    (if using separate CSS files)
  App.jsx
  index.js
```

### Performance
- Static data imports (no runtime API calls)
- Minimal re-renders (use `useCallback` for event handlers if needed)
- No image optimization required (SVG headshot)

