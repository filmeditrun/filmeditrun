# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ☁️ Cloudflare Pages Deployment

When deploying this project to **Cloudflare Pages**:

1. **Build Settings**:
   * **Framework preset**: `Astro`
   * **Build command**: `npm run build` (or `npm run tina:build` if generating TinaCMS admin)
   * **Build output directory**: `dist`
   * **Node version**: `>=22.12.0` (set environment variable `NODE_VERSION: 22.12.0` in Cloudflare Pages dashboard)

2. **Automatic Edge Caching (`public/_headers`)**:
   * Cloudflare Pages automatically detects the [`public/_headers`](file:///Users/scott/Desktop/filmeditrun-site/filmeditrun/public/_headers) file.
   * All static, content-hashed assets (local fonts in `dist/_astro/*.woff2`, styles, and images) are automatically cached permanently on Cloudflare's global edge network (`max-age=31536000, immutable`).
   * HTML pages are set to revalidate instantaneously upon new git deployments.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

