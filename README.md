# eonroam.io-www

The public home page at **eonroam.io**. Plain HTML, CSS and JavaScript with no build step, served
by GitHub Pages. The web app itself lives at **app.eonroam.io** (eonroam.io-web).

| File | What it is |
| --- | --- |
| `index.html` | The home page |
| `styles.css`, `site.js` | Its styles and the phone menu |
| `404.html` | Not-found page; forwards app paths to app.eonroam.io (below) |
| `privacy/`, `tos/`, `copyright/`, `copyright/notice/`, `dmca/` | Redirects to the same page on app.eonroam.io |
| `.well-known/apple-app-site-association` | iOS universal links for `/s/*`, copied from eonroam.io-web |
| `CNAME` | The custom domain GitHub Pages serves |
| `.nojekyll` | Stops Jekyll from dropping `.well-known` |

## Run it locally

```bash
python3 -m http.server 3017 --directory eonroam.io-www
```

`http.server` does not serve `404.html` for unknown paths, so the forwarding below only works on GitHub Pages.

## Redirects

The legal pages and share links belong to the web app, but some links point at eonroam.io:

- the iOS app builds share links as `eonroam.io/s/{code}` (`WEB_HOST` in Info.plist)
- the iOS settings and sign-up screens link to `eonroam.io/tos`, `/privacy` and `/copyright`
- share links people have already sent

GitHub Pages has no server-side redirects. The fixed legal paths each have a small page that redirects at once.
`/s/{code}` and the `.html` variants reach `404.html`, which forwards them with their query and hash.
When the iOS app is installed, `/s/*` opens the app through the universal link before any of this runs.

## Deploy on GitHub Pages

1. Push this folder as the root of a repository.
2. Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`.
3. Custom domain: `eonroam.io` (the `CNAME` file sets it). Turn on **Enforce HTTPS** once the certificate is issued.
4. DNS at the registrar:
   - apex `eonroam.io`: `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: `CNAME` to `<github-user>.github.io` (GitHub then redirects www to the apex)
   - `app`: points at the web app's host (Heroku), not GitHub

## Before launch

- Replace `https://apps.apple.com/app/id0000000000` (4 places in `index.html`) with the App Store link.
  The id is on the app's page in App Store Connect.
- Put the app screenshot in the hero: replace the `<svg>` inside `<div class="screen">` with
  `<img src="/images/app-screenshot.png" alt="">`. The CSS already sizes an `img` there.
- Check that Apple can read the universal-link file after the deploy. GitHub Pages serves it
  without an `application/json` type:

  ```bash
  curl -sI https://eonroam.io/.well-known/apple-app-site-association
  ```

  ```bash
  curl -s https://app-site-association.cdn-apple.com/a/v1/eonroam.io
  ```

  If Apple's CDN does not return the file, move the universal links to `applinks:app.eonroam.io`,
  where the web app's `server.js` already serves the file as JSON.
