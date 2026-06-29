<h1 align="center">Convert Image 2 PDF</h1>

<p align="center">
  A privacy-first web application that converts images to PDF files — entirely in your browser, with no uploads, no accounts, and no data collection.
</p>

---

## Table of Contents

- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Available Scripts](#available-scripts)
- [Browser Support](#browser-support)

---

## Running Locally

### Prerequisites

Make sure you have the following installed before you begin:

| Tool | Minimum Version | Check |
|------|----------------|-------|
| [Node.js](https://nodejs.org/) | 18.x or higher | `node -v` |
| npm | 9.x or higher | `npm -v` |

> **Tip:** Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions. Run `nvm use` inside the project if an `.nvmrc` is present.

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/alakeldev/file-converter-app.git
cd file-converter-app
```

---

### Step 2 — Install dependencies

```bash
npm install
```

This installs all packages listed in `package.json`, including Next.js, React, jsPDF, Tailwind CSS, Framer Motion, and Preline UI.

---

### Step 3 — Start the development server

```bash
npm run dev
```

Once started, open your browser and navigate to:

```
http://localhost:3000
```

The development server supports Fast Refresh — changes to source files are reflected instantly in the browser without a full page reload.

---

### Step 4 — Build for production (optional)

To create an optimised production build:

```bash
npm run build
```

To run the production build locally after building:

```bash
npm run start
```

The production server will also be available at `http://localhost:3000`.

---

### Troubleshooting

**Port 3000 is already in use**

```bash
npm run dev -- --port 3001
```

**Dependency issues after pulling new changes**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Lint errors**

```bash
npm run lint
```

---

## Project Structure

```
file-converter-app/
├── app/
│   ├── components/
│   │   └── common/
│   │       ├── BackgroundBeamsWithCollision.js  # Animated background (Framer Motion)
│   │       ├── FileUpload.js                    # Core converter UI and logic
│   │       ├── NavBar.js                        # Top navigation bar
│   │       └── PrelineScript.js                 # Preline UI initialiser
│   ├── lib/
│   │   └── utils.js                             # cn() utility (clsx + tailwind-merge)
│   ├── policy/
│   │   └── page.js                              # Privacy Policy page
│   ├── globals.css                              # Global styles + Tailwind directives
│   ├── layout.js                                # Root layout (fonts, metadata)
│   └── page.js                                  # Home page
├── public/                                      # Static assets (SVGs)
├── eslint.config.mjs                            # ESLint configuration
├── jsconfig.json                                # Path aliases (@/*)
├── next.config.mjs                              # Next.js configuration
├── postcss.config.mjs                           # PostCSS (required by Tailwind)
├── tailwind.config.mjs                          # Tailwind CSS configuration
└── package.json
```

---

## How It Works

All conversion happens **locally in the browser**. No image data is ever sent to a server.

1. **Image selection** — The user picks an image file via the file input. A temporary object URL is created with `URL.createObjectURL()` and shown as a preview. When a new image is selected, the previous object URL is revoked immediately to free memory.

2. **PDF generation** — On clicking "Download PDF File", the selected image is loaded into a browser `Image` element to read its natural pixel dimensions. The pixel dimensions are converted to points (pt) using the standard 96 dpi baseline (`pixels × 72 / 96`). A `jsPDF` document is created with the exact page size matching the image, the image is added to fill the page, and the PDF is serialised to a `Blob`.

3. **Download** — A temporary `<a>` element with the `download` attribute triggers the browser's native file-save dialog. Both the preview object URL and the download blob URL are revoked after use to avoid memory leaks.

4. **Privacy** — The application has no backend. No network requests are made during conversion. No analytics, tracking scripts, or third-party data processors are used.

---

## Features

- **Image to PDF conversion** — Convert any browser-supported image format (JPEG, PNG, WebP, GIF, BMP, etc.) to a single-page PDF.
- **Custom file name** — Optionally specify the output file name before downloading; defaults to `mypdf.pdf`.
- **Correct PDF dimensions** — The generated PDF page matches the image's exact pixel dimensions converted to points, producing a properly sized document at standard screen resolution.
- **Live preview** — A preview of the selected image is shown before conversion.
- **Loading feedback** — The convert button shows a spinner and is disabled during processing to prevent duplicate actions.
- **Error handling** — Friendly error messages are shown if the image fails to load or the conversion encounters a problem.
- **Fully local processing** — Everything runs in-browser; no uploads, no accounts, no data collection.
- **Responsive design** — Works on desktop and mobile browsers.
- **Reduced motion support** — Background beam animations are disabled automatically when the operating system's "reduce motion" accessibility setting is enabled.
- **Privacy Policy page** — Available at `/policy`, explaining the no-data-collection approach.

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org/) | React framework, App Router, server-side rendering |
| [React 19](https://react.dev/) | UI component model |
| [jsPDF](https://github.com/parallax/jsPDF) | Client-side PDF generation |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer-motion.com/) | Animated background beams |
| [Preline UI](https://preline.co/) | UI component library |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging utility |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with Fast Refresh at `http://localhost:3000` |
| `npm run build` | Create an optimised production build in `.next/` |
| `npm run start` | Serve the production build at `http://localhost:3000` |
| `npm run lint` | Run ESLint using the Next.js core web vitals ruleset |

---

## Browser Support

The application works in all modern browsers that support the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API) and [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static):

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

Internet Explorer is not supported.

