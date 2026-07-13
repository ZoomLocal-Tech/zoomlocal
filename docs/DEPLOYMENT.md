# Deployment (Firebase Hosting via GitHub Actions)

zoomlocal.in is hosted on **Firebase Hosting**, project **`zoomlocal-77be3`**
(Cloudflare sits in front as DNS/proxy).

Historically the site was deployed by hand (`firebase deploy` from a
laptop), so the git repo drifted out of sync with production. This is now
automated: **merging to `master` builds and deploys to production.**

## Pipelines

| Workflow | Trigger | Result |
|----------|---------|--------|
| `.github/workflows/firebase-deploy.yml` | push to `master` | Builds and deploys to the **live** channel (production, zoomlocal.in) |
| `.github/workflows/firebase-pr-preview.yml` | any pull request | Builds and deploys to a **temporary preview URL**, commented on the PR, so you can review before merging |

## One-time setup (required for the pipelines to work)

Add these in the GitHub repo: **Settings, Secrets and variables, Actions, New repository secret**.

1. **`FIREBASE_SERVICE_ACCOUNT_ZOOMLOCAL_77BE3`**
   A Firebase service-account JSON with deploy rights. Generate it:
   ```bash
   firebase login
   firebase init hosting:github   # in this repo; it creates the service account + secret for you
   ```
   Or manually: Firebase Console, Project settings, Service accounts,
   Generate new private key, then paste the whole JSON as the secret value.

2. **`VITE_SUPABASE_URL`** and **`VITE_SUPABASE_ANON_KEY`**
   The same values used in `.env.example`. They are baked into the build so
   the managed-service contact form works in production.

## Manual deploy (fallback)

```bash
npm ci
npm run build            # generates sitemap + static site into /dist
firebase deploy --only hosting --project zoomlocal-77be3
```

## Local preview

```bash
cp .env.example .env     # fill in real Supabase values (or placeholders)
npm run dev              # http://localhost:5173 (or pass --port)
```
