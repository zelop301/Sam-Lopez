# 🚀 Purely Static Deployment Guide & GitHub Integration

This guide explains how to deploy the **Sammium Tech Industries** hub as a **purely static website** on popular hosting providers (like GitHub Pages, Vercel, or Netlify) without needing any custom Node.js server!

---

## 📦 1. How to Build the Static Site Locally

If you are developing this on your computer:
1. Make sure you have [Node.js](https://nodejs.org) installed.
2. Open your terminal in the project directory.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Build the static distribution bundle:
   ```bash
   npm run build
   ```
5. All your static assets, HTML, CSS, and JavaScript will be compiled into the **`dist/`** folder. This folder is completely self-contained and ready to be hosted on any static host!

---

## 🐙 2. How to Publish on GitHub & GitHub Pages (100% Free)

You can easily publish this project on GitHub and host it directly with **GitHub Pages**:

### Step 2.1: Initialize and Push to GitHub
1. Create a new repository on [GitHub](https://github.com) named `sammium-tech` (keep it public if using free GitHub Pages).
2. Initialize and push your repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Sammium Tech Industries"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sammium-tech.git
   git push -u origin main
   ```

### Step 2.2: Host on GitHub Pages (Via GitHub Actions - Easiest & Best)
To automate the build and deployment on every push:
1. In your project, create a file at `.github/workflows/deploy.yml` with the following content:
   ```yaml
   name: Deploy Static Content to Pages

   on:
     push:
       branches: ["main"]

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: true

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Set up Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```
2. Commit and push this file to GitHub!
3. Go to your GitHub repository -> **Settings** -> **Pages**.
4. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
5. Your site will automatically build and publish to `https://YOUR_USERNAME.github.io/sammium-tech/` in under a minute!

---

## ⚡ 3. Deploying on Vercel or Netlify (Highly Recommended)

Vercel and Netlify are extremely popular, blazing-fast, and 100% free for personal use. They automatically handle build processes for Vite/React out-of-the-box:

### For Vercel:
1. Sign up/log in at [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository (`sammium-tech`).
4. Vercel will automatically detect **Vite** as the framework.
5. Click **Deploy**! Your site is live in 20 seconds.

### For Netlify:
1. Log in at [Netlify](https://netlify.com).
2. Click **Add new site** -> **Import from Git**.
3. Select your repository.
4. Netlify will set the build command to `npm run build` and publish directory to `dist` automatically.
5. Click **Deploy site**!

---

## 🤖 4. How the AI Brand Assistant Works Offline

When running on purely static hosts (like GitHub Pages or Vercel) where server-side Node.js code does not run:
*   We've built a **Smart Offline-First Parser** directly inside the client side!
*   If the website fails to connect to a backend chat API, the assistant (**Aura**) will immediately pivot to a resilient local responder.
*   It analyzes prospective sponsors' questions and provides complete, beautifully styled answers regarding **Sammium Tech Industries' rates, channel statistics, hardware specifications, and email/booking details** in real time!
*   This means your brand hub remains **100% functional, interactive, and helpful** even with zero servers!

---

## 🌐 5. Optional: Host on PHP Servers (e.g., InfinityFree / Hostinger)

If you'd like the AI Brand Assistant to run live Gemini requests *without* managing a Node.js server, we have pre-packaged a **lightweight PHP script** in `public/api/chat.php`:
1. Host your built `dist/` files on any PHP-enabled web host (many are completely free).
2. In your PHP hosting control panel, configure the environment variable `GEMINI_API_KEY` with your secret key.
3. The built static files will automatically forward inquiries to the local PHP script, which securely calls Gemini on your behalf!
