# SCRIPTEEZE

**A creator-first social media agency landing page built with modern web technologies.**

We Build Stories That Sell.

## 🚀 Tech Stack

- **Next.js 16** - Full-stack React framework and Node.js server
- **React 18** - UI library
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

# Run the production server after building
npm run start
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
| `npm run start` | Start the production Node.js server |

## 📝 License

© 2024 Scripteeze. All rights reserved.

---

**Contact**: info@scripteeze.in  
**Instagram**: [@scripteeze](https://instagram.com/scripteeze)

## Contact submissions on Hostinger

The contact form is handled by the Next.js route at `POST /api/contact`. Valid
submissions are appended to `server/submissions.csv` on the Node.js server. The
CSV is created automatically on the first successful submission.

### Hostinger environment variables

Add these under **Website Dashboard → Environment Variables**, then redeploy:

```env
CONTACT_EXPORT_TOKEN=use-a-long-random-secret-with-at-least-24-characters
CONTACT_DATA_DIR=./server
```

Generate a strong export token locally with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

`CONTACT_DATA_DIR` is optional and defaults to `server` in the application root.
You can download `server/submissions.csv` directly through Hostinger File Manager.
Because application deployments can replace files, export or back up this CSV
before changing repositories or performing any deployment that replaces the app
directory. If Hostinger gives you a separate persistent writable directory, set
`CONTACT_DATA_DIR` to that absolute path.

### Secure CSV export

The export endpoint is `GET /api/contact/export` and requires the secret token in
an `Authorization` header. Download the CSV to Windows with PowerShell:

```powershell
$headers = @{ Authorization = "Bearer YOUR_CONTACT_EXPORT_TOKEN" }
Invoke-WebRequest "https://scripteeze.in/api/contact/export" `
  -Headers $headers `
  -OutFile "$HOME\Downloads\scripteeze-submissions.csv"
```

The token is never accepted in the URL, which keeps it out of browser history and
most server access logs.
