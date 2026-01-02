# SCRIPTEEZE

**A creator-first social media agency landing page built with modern web technologies.**

We Build Stories That Sell.

## 🚀 Tech Stack

- **React 19** - UI Library
- **Vite 7** - Build Tool & Dev Server
- **TypeScript** - Type Safety (Strict Mode)
- **GSAP** - Premium Animations
- **Modern CSS** - Custom Properties, Flexbox, Grid

## ✨ Features

- **Dark Navy Theme** with Gold/Amber Accents
- **GSAP Animations** with cinematic easing
- **Scroll-triggered Animations** via Intersection Observer
- **Respects `prefers-reduced-motion`** for accessibility
- **Desktop-first, Fully Responsive** design
- **Performance Optimized** with minimal bundle size

## 📦 Project Structure

```
src/
├── components/          # React components
│   ├── Hero/           # Full-screen hero section
│   ├── Philosophy/     # Trust & values section
│   ├── Services/       # Interactive service cards
│   ├── Experience/     # Authority section
│   ├── Team/           # Creator showcase
│   ├── IdealClient/    # Target audience
│   ├── FinalCTA/       # Contact & closing
│   └── Footer/         # Minimal footer
├── hooks/              # Custom React hooks
│   └── useScrollAnimation.ts
├── utils/              # Utility functions
│   └── animations.ts   # GSAP animation utilities
├── styles/             # Global styles
│   └── index.css       # Design system & variables
├── App.tsx             # Main application
└── main.tsx            # Entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-bg-primary` | `#0A0F1C` | Main background |
| `--color-bg-secondary` | `#0E1426` | Alternate sections |
| `--color-accent-primary` | `#F5A623` | Gold accent |
| `--color-accent-secondary` | `#D4940A` | Dark gold |
| `--color-text-primary` | `#FFFFFF` | Headings |
| `--color-text-secondary` | `rgba(255,255,255,0.8)` | Body text |

### Typography

- **Headings**: Outfit (800, 700, 600)
- **Body**: Inter (400, 500, 600)

### Animations

All animations are handled through GSAP with custom utilities in `src/utils/animations.ts`:

- `fadeIn()` - Fade with upward motion
- `staggerFadeIn()` - Staggered entrance
- `slideIn()` - Directional slide
- `scaleFadeIn()` - Scale + fade combo
- `drawLine()` - Line drawing animation

## 📄 Sections

1. **Hero** - Full viewport, animated gradient background, word-by-word text reveal
2. **Philosophy** - Split layout with animated dividers
3. **Services** - 6 interactive cards with hover effects
4. **Experience** - Numbered authority points
5. **Team** - Horizontal scroll creator showcase
6. **Ideal Client** - Animated checkmark list
7. **Final CTA** - Contact with watermark logo
8. **Footer** - Minimal with back-to-top

## 📱 Responsive Breakpoints

- Mobile: < 600px
- Tablet: 600px - 900px
- Desktop: 900px+
- Large Desktop: 1200px+

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 📝 License

© 2024 Scripteeze. All rights reserved.

---

**Contact**: info@scripteeze.in  
**Instagram**: [@scripteeze](https://instagram.com/scripteeze)
