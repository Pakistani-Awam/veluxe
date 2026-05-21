This repository has been converted to a pure static site for GitHub Pages.

What I did:
- Backed up Next/React configuration files into `archive_next/configs/`.
- Removed the original Next-related config files from the project root so the workspace contains only static HTML/CSS/JS that can be served by GitHub Pages.

Notes:
- The `app/`, `components/`, `ui/`, `hooks/` and other Next source folders are still present in the workspace. If you want them archived as well, I can move them into `archive_next/` on request.
- To preview locally, you can run a static server from the project root, for example:

```powershell
python -m http.server 8000
# or
npx serve .
```

If you'd like, I can now:
- Move the remaining Next source folders (`app/`, `components/`, `ui/`, `hooks/`, `lib/`) into `archive_next/`.
- Remove any remaining build/dependency files.
- Add a minimal `README.md` explaining how to deploy to GitHub Pages.
