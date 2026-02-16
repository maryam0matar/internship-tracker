# Deployment Guide - Internship Tracker

Follow these steps to publish your application live on Vercel.

## 1. Set up a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository called `internship-tracker`.
2. Do **not** initialize with a README or .gitignore.
3. In your local terminal, run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/internship_tracker.git
   git branch -M main
   git push -u origin main
   ```

## 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign in with GitHub.
2. Click **Add New** > **Project**.
3. Import the `internship-tracker` repository.
4. In the **Environment Variables** section, add the following:
   - `DATABASE_URL`: Your PostgreSQL connection string (recommend using Vercel Postgres).
   - `NEXTAUTH_SECRET`: Generate a random string (e.g., `openssl rand -base64 32`).
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., `https://internship-tracker.vercel.app`).
   - `GITHUB_ID`: (Optional) For GitHub Auth.
   - `GITHUB_SECRET`: (Optional) For GitHub Auth.

## 3. Database Setup (Vercel Postgres)
1. In the Vercel dashboard, go to the **Storage** tab.
2. Click **Create** > **Postgres**.
3. Once created, click **Connect to Project** and select `internship-tracker`.
4. This will automatically inject the `DATABASE_URL` environment variable.
5. Redeploy the project to apply the changes.

## 4. Run Migrations
1. You can run migrations in the Vercel dashboard using the **Deployment Lifecycle** or locally by pointing your `DATABASE_URL` to the production DB and running:
   ```bash
   npx prisma db push
   ```
