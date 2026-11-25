# RL Toolkit – offline flash-card app

## Put it online once (GitHub Pages, free, ~10 minutes)

1. Sign in at github.com (create a free account if needed).
2. Click **+** (top right) → **New repository**. Name it `rl-toolkit`, choose **Public**, click **Create repository**.
3. On the new repository page click **uploading an existing file**. Drag in **all files from this folder**
   (`index.html`, `cards.json`, `sw.js`, `manifest.webmanifest`, the three `icon-*.png` files, this README).
   Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment* set **Source: Deploy from a branch**,
   **Branch: main**, folder **/ (root)**, click **Save**.
5. Wait 1–2 minutes and refresh. The page shows your link: `https://<your-username>.github.io/rl-toolkit/`

Note: a public repository means anyone with the link can see the cards (not your progress, which stays on your devices).
GitHub Pages from a private repository needs a paid GitHub plan.

## Install on the iPhone

1. Open the link in **Safari** (must be Safari).
2. Wait until the maths renders on the first card (this saves everything for offline use).
3. Tap **Share → Add to Home Screen → Add**.
4. Open the **RL Toolkit** icon **once while online** and wait for the maths to render: the home-screen app keeps its own
   offline copy and its own progress, separate from Safari.
5. After that it works with no internet. Rate cards inside the home-screen app, not in Safari.

## On the MacBook

Open the same link in Safari and choose **File → Add to Dock** (or just bookmark it in any browser).

## Progress

- Rate each card 1–5 after flipping. Confidence is a running average, shown as a percentage.
- **Quiz** tab: multiple-choice questions that check understanding (when a result applies, how to use it, how it
  differs from its neighbours). Each card gets a quiz score, kept separate from the confidence you rate yourself;
  the lowest-scoring cards come first. A card's back also has **Test my understanding** for its own questions.
- The round button next to the title switches the theme: automatic (follows the device) → light → dark.
- **New shuffle** orders cards least-confident first (new cards first), shuffling cards of similar confidence.
- **Order: deck order** turns shuffling off: cards come in book order, and tapping a card on the Deck tab continues
  from there (Next goes to the following card). Tap the pill again for weakest-first. The choice is remembered.
- Progress is saved on the device and, once sync is set up, kept the same on all your devices.
- Without sync you can still move it by hand: **Progress → Copy as text** on one device, paste into **Import** on
  the other (newer ratings win). Export a backup occasionally.

## Sync between iPhone and Mac (once, ~3 minutes)

Progress is stored in one private gist (a small private file) on your own GitHub account.

1. Signed in to your personal GitHub account, open
   <https://github.com/settings/tokens/new?scopes=gist&description=RL%20Toolkit%20sync>.
   Leave only **gist** ticked, pick an expiration (e.g. 1 year), click **Generate token** and copy it.
2. In the app: **Progress → Sync across devices**, paste the token, **Connect**.
3. Do the same on each device (the iPhone home-screen app, Safari on the Mac) with the same token.
   Ratings already on a device are merged in, not lost.

It syncs when the app opens, a few seconds after each rating, and when you come back online. Offline ratings are
kept and uploaded later. The dot next to the title shows green when in sync, yellow when changes are waiting,
red on a problem (details on the Progress tab). Resetting progress on one device resets it everywhere.
The token can only read and write your gists; anyone with it could, so keep it private. When it expires,
**Disconnect** and connect with a new one.

Deleting the home-screen app deletes its local copy; with sync on, reconnecting brings the progress back.

## Updating the cards later

Replace `cards.json` in the repository and raise the number in `rl-toolkit-v7` in `sw.js` (to `v8`, and so on).
The app picks up the new version the next time it is opened online (open it twice).
