# UMOJA-ai Website — Cursor Project Schema

## 1. Project Overview

**Purpose:** A modern, animated marketing/investor website for UMOJA-ai — an AI-assisted educational platform launching in Ghana. The site must be compelling enough to attract government partners, telecom CEOs, and investors without revealing detailed financials or proprietary strategy.

**Tone:** Corporate clean meets Afro-modern. Authoritative but warm. Data-driven but human. NOT a generic SaaS landing page.

**Key Principle:** Show enough to intrigue and inspire action. Hold back detailed financials, exact pricing mechanics, subsidy formulas, fund governance details, and competitive strategy. The website drives people to the contact form — the business plan closes the deal.

---

## 2. Tech Stack

```
Framework:      Next.js 14+ (App Router)
Styling:        Tailwind CSS 4+
Animations:     Framer Motion
Icons:          Lucide React
Font:           Google Fonts — "Plus Jakarta Sans" (body) + "Playfair Display" (headlines)
Contact Form:   React Hook Form + Supabase (Postgres)
Hosting:        Vercel
```

---

## 3. Supabase Schema

### Table: `contact_submissions`

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  role TEXT,               -- e.g. 'Government', 'Telecom', 'Investor', 'Educator', 'Other'
  country TEXT,
  message TEXT,
  interest_type TEXT,      -- e.g. 'Partnership', 'Investment', 'Pilot Program', 'General Inquiry'
  status TEXT DEFAULT 'new' NOT NULL,  -- 'new', 'contacted', 'qualified', 'closed'
  notes TEXT               -- internal notes field
);

-- Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (public form)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read (admin dashboard later)
CREATE POLICY "Authenticated read" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 4. Project File Structure

```
umoja-ai-website/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Main landing page (assembles all sections)
│   ├── globals.css             # Tailwind base + custom CSS variables + animations
│   └── api/
│       └── contact/
│           └── route.ts        # Server-side contact form handler (Supabase insert)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed top nav with scroll effect
│   │   └── Footer.tsx          # Site footer with links
│   │
│   ├── sections/
│   │   ├── Hero.tsx            # Section 1: Hero with CTA
│   │   ├── Crisis.tsx          # Section 2: The education crisis (3 stats)
│   │   ├── Solution.tsx        # Section 3: What UMOJA-ai does (high level)
│   │   ├── HowItWorks.tsx      # Section 4: The classroom experience (5 steps)
│   │   ├── ThreePartyModel.tsx # Section 5: Government + Telecom + UMOJA
│   │   ├── WhyGhana.tsx        # Section 6: Ghana as launch market
│   │   ├── Impact.tsx          # Section 7: Vision for impact (stats)
│   │   └── Contact.tsx         # Section 8: Contact form + CTA
│   │
│   └── ui/
│       ├── AnimatedCounter.tsx # Animated number counter on scroll
│       ├── RevealOnScroll.tsx  # Framer Motion scroll reveal wrapper
│       ├── GlowCard.tsx        # Card with subtle glow/hover effect
│       └── Button.tsx          # Styled CTA button
│
├── lib/
│   ├── supabase.ts             # Supabase client initialisation
│   └── constants.ts            # Site copy, stats, metadata
│
├── public/
│   ├── og-image.jpg            # Open Graph image
│   └── favicon.ico
│
├── tailwind.config.ts
├── next.config.js
├── package.json
└── .env.local
```

---

## 5. Section-by-Section Content Strategy

### WHAT TO SHOW vs. WHAT TO HOLD BACK

| Topic | Website (Public) | Business Plan (Private) |
|-------|-----------------|------------------------|
| The crisis | 3 headline stats, emotional framing | Full data tables, sources, country comparisons |
| How it works | 5-step visual flow, high-level description | System architecture, offline sync protocols, AI model details |
| Three-party model | Visual diagram, roles at a glance | Detailed agency mapping, revenue splits, MoU structure |
| Ghana market | Why Ghana (3-4 reasons) | Full telecom analysis, market sizing, penetration data |
| Financials | "Self-sustaining model" mention only | $2/week pricing, revenue projections, cost structure |
| Fund governance | Brief mention of educational fund | Independent company structure, board composition, audit process |
| Rollout plan | "Ghana first, then Africa" | 4-phase timeline, country-by-country strategy |
| Investment ask | "Join us" CTA — no numbers | $47-76M ask, phase breakdown, return structure |
| Cultural strategy | Brief mention of localization | Detailed religious, exam, classroom norm adaptation |
| Data/privacy | "Data stays in Ghana" one-liner | Full privacy architecture, Ghana Card integration |

---

## 6. Section Specifications

### SECTION 1: Hero
- **Layout:** Full viewport height. Dark background (deep green to charcoal gradient). Large headline. Subtle animated particles or geometric pattern.
- **Headline:** "Transforming Education Across Africa"
- **Subheadline:** "UMOJA-ai is an AI-assisted platform delivering quality curriculum to every classroom — from the largest cities to the most remote villages."
- **CTA Buttons:** "Learn More" (scroll) + "Partner With Us" (scroll to contact)
- **Animation:** Staggered text reveal on load. Subtle floating geometric shapes in background.
- **DO NOT include:** Pricing, investor language, specific country targets beyond Ghana.

### SECTION 2: The Crisis
- **Layout:** Light background. Three large animated counter stats in cards.
- **Stats to show:**
  - "9 in 10" — Children in Sub-Saharan Africa cannot read by age 10
  - "5.4M" — Additional teachers needed in the region
  - "~1,000,000" — Children out of school in Ghana alone
- **Brief paragraph:** 2-3 sentences framing the crisis as both humanitarian and economic.
- **Animation:** Numbers count up when scrolled into view. Cards fade in staggered.
- **DO NOT include:** Detailed country comparisons, spending gap data, teacher salary analysis.

### SECTION 3: The Solution
- **Layout:** Alternating dark/light sections. Large heading + 3 key feature cards.
- **Features to show (3 cards only — keep it simple):**
  1. "AI-Powered Lessons" — An AI avatar delivers curriculum-aligned lessons, guided by the classroom teacher.
  2. "Works Anywhere" — Solar-powered, offline-capable. Delivered via mobile networks or pre-loaded for areas without coverage.
  3. "Built for Africa" — Designed from the ground up for African classrooms, not adapted from Western products.
- **Tagline:** "We empower teachers. We don't replace them."
- **Animation:** Cards slide in from bottom on scroll. Icon pulse on hover.
- **DO NOT include:** Hardware specs, tablet lock-down details, pico projector specifics, local host architecture.

### SECTION 4: How It Works
- **Layout:** Horizontal step flow (desktop) / vertical (mobile). 5 numbered steps.
- **Steps:**
  1. "Lesson Delivered" — AI avatar presents the lesson via projector
  2. "Teacher Guides" — Teacher controls pace and adds context
  3. "Students Interact" — Questions flow through teacher and AI together
  4. "Progress Assessed" — Built-in formative assessments track understanding
  5. "Outcomes Improve" — Data-driven insights help teachers focus where it matters
- **Animation:** Steps reveal sequentially with connecting line animation.
- **DO NOT include:** Examination administration details, student registration with Ghana Card, monthly offline update schedules.

### SECTION 5: Three-Party Model
- **Layout:** Visual triangle or three-column layout showing interdependency.
- **Three parties:**
  1. **UMOJA-ai** — Technology, content, teacher training
  2. **Government** — Curriculum authority, institutional support, regulation
  3. **Telecom Partners** — Connectivity, infrastructure, distribution
- **Key message:** "No single party can do this alone. Together, we create a self-sustaining education system."
- **Animation:** Triangle draws itself on scroll. Each node highlights sequentially.
- **DO NOT include:** Specific agency names (MoE, GES, NaCCA, NCA), revenue distribution percentages, specific telecom targets, MoU details.

### SECTION 6: Why Ghana
- **Layout:** Map visual or Ghana outline with 4 stat badges overlaid.
- **Points to show:**
  - Stable democracy with strong education commitment
  - 113% mobile penetration — infrastructure is ready
  - 67% mobile money adoption — payment rails exist
  - ECOWAS gateway to West Africa
- **Brief text:** "Ghana is our launchpad. Africa is our destination."
- **Animation:** Stats fade in with subtle map zoom.
- **DO NOT include:** Detailed telecom market analysis, MTN investment figures, market share breakdown, specific regions targeted.

### SECTION 7: Impact Vision
- **Layout:** Dark background. Large quotes or stat callouts.
- **Content:**
  - "Universal basic education could double Africa's GDP per capita by 2050" — World Bank
  - "Each additional year of education boosts incomes by 12.4% in Sub-Saharan Africa"
  - Brief mention of the Educational Fund: "Revenue from the platform creates a self-sustaining fund for school infrastructure, learning materials, and teacher development."
- **Animation:** Parallax text reveal. Stats count up.
- **DO NOT include:** Revenue projections, specific fund allocation percentages, investor return structures, pricing model.

### SECTION 8: Contact Form + CTA
- **Layout:** Split — left side has CTA copy, right side has the form. Dark green background.
- **CTA Headline:** "Join the Movement"
- **CTA Copy:** "Whether you represent a government, telecom company, investment firm, or educational institution — we want to hear from you. UMOJA-ai is built on partnership. Let's talk."
- **Form Fields:**
  - Full Name (required)
  - Email (required)
  - Organization
  - Your Role: dropdown — Government, Telecom, Investor, Educator, Other
  - Country
  - Area of Interest: dropdown — Partnership, Investment, Pilot Program, General Inquiry
  - Message (textarea)
  - Submit button: "Start the Conversation"
- **On submit:** Insert to Supabase `contact_submissions` table. Show success toast.
- **Animation:** Form slides in from right. Success state has a checkmark animation.

---

## 7. Design Tokens (Tailwind Config)

```js
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        umoja: {
          green: {
            50:  '#E8F5E9',
            100: '#C8E6C9',
            200: '#A5D6A7',
            300: '#81C784',
            400: '#66BB6A',
            500: '#4CAF50',
            600: '#43A047',
            700: '#2E7D32',
            800: '#1B5E20',
            900: '#0A3D0A',
            950: '#051F05',
          },
          gold: {
            50:  '#FFF8E1',
            100: '#FFECB3',
            200: '#FFE082',
            300: '#FFD54F',
            400: '#FFCA28',
            500: '#F9A825',
            600: '#F57F17',
            700: '#E65100',
          },
          charcoal: '#1A1A2E',
          navy:     '#16213E',
          slate:    '#263238',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.8s ease-out forwards',
        'count-up':   'countUp 2s ease-out forwards',
        'draw-line':  'drawLine 1.5s ease-out forwards',
        'float':      'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:     { '0%': { opacity: 0, transform: 'translateY(30px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:     { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        drawLine:   { '0%': { width: '0%' }, '100%': { width: '100%' } },
        float:      { '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-15px)' } },
        glowPulse:  { '0%, 100%': { boxShadow: '0 0 20px rgba(76,175,80,0.15)' },
                      '50%': { boxShadow: '0 0 40px rgba(76,175,80,0.3)' } },
      },
    },
  },
};
```

---

## 8. Key Component Specifications

### `lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### `app/api/contact/route.ts`

```ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!   // Use service role server-side
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { error } = await supabase.from('contact_submissions').insert({
      full_name:     body.fullName,
      email:         body.email,
      organization:  body.organization || null,
      role:          body.role || null,
      country:       body.country || null,
      message:       body.message || null,
      interest_type: body.interestType || null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
```

### `RevealOnScroll.tsx` (Framer Motion wrapper)

```tsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function RevealOnScroll({
  children, delay = 0, direction = 'up', className
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const directionMap = {
    up:    { y: 40, x: 0 },
    down:  { y: -40, x: 0 },
    left:  { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### `AnimatedCounter.tsx`

```tsx
'use client';
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  target, prefix = '', suffix = '', duration = 2
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(
        target >= 1000
          ? Math.round(v).toLocaleString()
          : v % 1 === 0 ? Math.round(v).toString() : v.toFixed(1)
      ),
    });
    return controls.stop;
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
```

---

## 9. SEO & Metadata

```tsx
// app/layout.tsx metadata
export const metadata = {
  title: 'UMOJA-ai | AI-Assisted Education for Africa',
  description:
    'UMOJA-ai delivers AI-powered curriculum to classrooms across Africa through mobile networks, empowering teachers and transforming learning outcomes.',
  keywords: [
    'AI education Africa', 'Ghana education', 'edtech Africa',
    'AI classroom', 'educational technology', 'UMOJA-ai',
  ],
  openGraph: {
    title: 'UMOJA-ai | Transforming Education Across Africa',
    description: 'AI-assisted educational platform launching in Ghana.',
    url: 'https://umoja-ai.com',
    siteName: 'UMOJA-ai',
    type: 'website',
  },
};
```

---

## 10. Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@supabase/supabase-js": "^2.45.0",
    "framer-motion": "^11.5.0",
    "react-hook-form": "^7.53.0",
    "lucide-react": "^0.440.0",
    "sonner": "^1.5.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.0",
    "@types/react": "^18.3.0",
    "@types/node": "^22.0.0"
  }
}
```

---

## 11. Cursor Instructions

When opening this project in Cursor, prompt with:

> Build the UMOJA-ai website following the schema in `UMOJA-ai_Website_Schema.md`. Start by:
> 1. Scaffolding the Next.js project with `npx create-next-app@latest umoja-ai --typescript --tailwind --app --src-dir=false`
> 2. Installing dependencies from the schema
> 3. Creating the Supabase table using the SQL provided
> 4. Building components section by section, starting with layout (Navbar, Footer), then Hero, then each section in order
> 5. Each section should use `RevealOnScroll` for entrance animations
> 6. The contact form should POST to `/api/contact` which inserts into Supabase
> 7. Follow the "WHAT TO SHOW vs WHAT TO HOLD BACK" table strictly — this is a public website

---

## 12. Mobile Responsiveness Notes

- Hero: Stack vertically, reduce heading size
- Crisis stats: Single column stacked cards
- How It Works: Vertical step flow with connecting line
- Three-Party Model: Stack vertically instead of triangle
- Contact form: Full-width, stacked fields
- All animations: Reduce motion for `prefers-reduced-motion`
- Minimum tap target: 44x44px for all interactive elements
