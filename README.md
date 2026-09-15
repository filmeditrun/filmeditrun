# Filmeditrun.co.uk - Cinematic Creatives

Welcome to the official repository for **Filmeditrun.co.uk**, built with **Astro**, styled with **Tailwind CSS**, and powered by **TinaCMS** for visual content management.

## Project Structure

Inside your Astro project, you'll see the following folder structure:

```text
filmeditrun/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── services.astro
│       ├── about.astro
│       └── contact.astro
├── astro.config.mjs
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally before deploying |

## Deployment on Netlify

This static site is configured for lightning-fast hosting on Netlify:
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`