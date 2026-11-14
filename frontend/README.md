# GitScope

Frontend landing page for GitScope, a tool that turns public GitHub profiles and repositories into a structured technical report.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Sora, Manrope, and JetBrains Mono via `next/font`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run lint
npm run build
npm run start
```

## Scope

This repository contains the frontend only. There is no API, authentication, or database code. The GitHub username form is the only integration point for future backend work, through its `onSubmit` handler.
