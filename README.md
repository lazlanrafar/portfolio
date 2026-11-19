# lazlanrafar.com

Personal portfolio of **L Azlan Rafar** — Software Engineer from Bali, Indonesia.

## Tech Stack

- **Next.js 16** — App Router, SSG
- **Tailwind CSS v4** — utility-first styling
- **TypeScript**
- **Framer Motion** — animations
- **KadoCMS** — headless CMS for project content
- **next-themes** — dark / light mode

## Getting Started

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
# Fill in KADOCMS_URL, KADOCMS_API_KEY, and NEXT_PUBLIC_GA_ID

# Start dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `KADOCMS_URL` | KadoCMS project address, e.g. `https://lazlanrafar.kado.lazlanrafar.com` |
| `KADOCMS_API_KEY` | KadoCMS Delivery API key (`djk_...`, read access) |
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
  data.ts             # Site name, URL and nav links
  profile.ts          # Owner profile from KadoCMS (bio, skills, experience, About lists)
  kadocms.ts          # KadoCMS API client (rich text to HTML, media URLs)
public/icons/tech/    # Tech stack SVG icons
```

## Scripts

```bash
bun dev       # Development server
bun build     # Production build
bun start     # Start production server
bun lint      # ESLint
```
