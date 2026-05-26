# lazlanrafar.com

Personal portfolio of **L Azlan Rafar** — Software Engineer from Bali, Indonesia.

## Tech Stack

- **Next.js 16** — App Router, SSG
- **Tailwind CSS v4** — utility-first styling
- **TypeScript**
- **Framer Motion** — animations
- **microCMS** — headless CMS for project content
- **next-themes** — dark / light mode

## Getting Started

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Fill in MICROCMS_API_KEY, MICROCMS_BASE_URL, and NEXT_PUBLIC_GA_ID

# Start dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MICROCMS_API_KEY` | microCMS API key |
| `MICROCMS_BASE_URL` | microCMS API base URL |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |

## Project Structure

```
app/                  # Next.js App Router pages
components/
  atoms/              # Single-purpose elements
  molecules/          # Composite components
  organisms/          # Full page sections
  templates/          # Layout wrappers
  motion/             # Animation wrappers
lib/
  data.ts             # All static personal data
  microcms.ts         # microCMS API client
public/icons/tech/    # Tech stack SVG icons
```

## Scripts

```bash
bun dev       # Development server
bun build     # Production build
bun start     # Start production server
bun lint      # ESLint
```
