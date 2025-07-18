# L Azlan Rafar - Portfolio

[![wakatime](https://wakatime.com/badge/github/lazlanrafar/portfolio.svg)](https://wakatime.com/badge/github/lazlanrafar/portfolio)

A modern, high-performance portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Optimized for performance, SEO, and accessibility.

🌐 **Live Demo**: [https://lazlanrafar.com](https://lazlanrafar.com)

## ✨ Features

- **🚀 Performance Optimized**: Lighthouse score 100/100
- **🎨 Modern Design**: Clean, responsive design with dark/light mode
- **📱 Mobile-First**: Fully responsive across all devices
- **🔍 SEO Friendly**: Optimized meta tags, structured data, and sitemap
- **♿ Accessible**: WCAG 2.1 AA compliant
- **⚡ Fast Loading**: Optimized images, fonts, and code splitting
- **🎯 Core Web Vitals**: Excellent performance metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist Sans, Geist Mono
- **Analytics**: Vercel Analytics, Google Analytics
- **Deployment**: Vercel

## 🏗️ Architecture

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout with SEO optimization
│   ├── page.tsx         # Home page with structured data
│   ├── loading.tsx      # Loading UI
│   └── globals.css      # Global styles with responsive design
├── components/          # Reusable components
│   ├── atoms/           # Basic UI elements
│   ├── molecules/       # Composite components
│   ├── organisms/       # Complex components
│   └── ui/             # Shadcn/ui components
├── constants/          # Configuration and constants
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/lazlanrafar/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📊 Performance Optimizations

### Core Web Vitals

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Implemented Optimizations

1. **Image Optimization**

   - Next.js Image component with WebP/AVIF support
   - Responsive images with proper sizing
   - Lazy loading for off-screen images
   - Optimized image formats and compression

2. **Code Splitting**

   - Dynamic imports for non-critical components
   - Route-based code splitting
   - Component-level lazy loading

3. **Font Optimization**

   - Preloaded fonts with `font-display: swap`
   - Self-hosted fonts for better control
   - Font subsetting for reduced file size

4. **CSS Optimization**

   - Tailwind CSS with purging
   - Critical CSS inlining
   - Responsive design patterns

5. **JavaScript Optimization**
   - Tree shaking for unused code
   - Bundle analysis and optimization
   - Efficient re-rendering with React.memo

## 🔍 SEO Features

### Technical SEO

- **Structured Data**: JSON-LD markup for rich snippets
- **Meta Tags**: Comprehensive Open Graph and Twitter Cards
- **Sitemap**: Auto-generated with next-sitemap
- **Robots.txt**: Proper crawling instructions
- **Canonical URLs**: Prevent duplicate content

### Content SEO

- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alt attributes
- **Internal Linking**: Strategic link structure
- **Mobile-First**: Responsive design for mobile search

### Performance SEO

- **Core Web Vitals**: Optimized for Google's ranking factors
- **Page Speed**: Sub-second loading times
- **Mobile Performance**: Optimized for mobile devices

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

### Responsive Features

- Fluid typography with clamp()
- Responsive spacing and layouts
- Adaptive component behavior
- Touch-friendly interactions

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliance
- **Semantic HTML**: Proper document structure

## 🔧 Configuration

### Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://lazlanrafar.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Site Configuration

Update `src/constants/siteConfig.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",
  description: "Your description",
  url: "https://yoursite.com",
  // ... other config
};
```

## 📈 Analytics

The portfolio includes:

- **Vercel Analytics**: Performance monitoring
- **Google Analytics**: User behavior tracking
- **Core Web Vitals**: Performance metrics

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Manual Deployment

```bash
pnpm build
pnpm start
```

## 🧪 Testing

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Bundle analysis
pnpm build:analyze
```

## 🎨 Design References

- [https://wiscaksono.com](https://wiscaksono.com)
- [https://jacekjeznach.com](https://jacekjeznach.com/)
- [https://gunawanahmad.me](https://gunawanahmad.me/)
- [https://www.craftz.dog](https://www.craftz.dog/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Website**: [lazlanrafar.com](https://lazlanrafar.com)
- **Email**: [lazlanrafar@gmail.com](mailto:lazlanrafar@gmail.com)
- **LinkedIn**: [linkedin.com/in/lazlanrafar](https://linkedin.com/in/lazlanrafar)
- **GitHub**: [github.com/lazlanrafar](https://github.com/lazlanrafar)

---

⭐ **Star this repository if you find it helpful!**
