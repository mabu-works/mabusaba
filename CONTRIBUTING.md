# Contributing

This project follows a unified development workflow shared across the
maintainer's repositories (adopted from aegis-app/aegis-bot).

## Development workflow

1. **Open an issue first.** Every change starts with an issue (use the
   issue templates). Describe the purpose, the planned work, and the
   definition of done.
2. **Create a branch from `main`** named `<type>/<issue-number>-<slug>`,
   e.g. `feat/12-add-event-section`, `fix/9-theme-flash`, `docs/3-readme`.
3. **Implement and test.** Run the checks locally before opening a PR:
   - `npm test` — unit tests for the redirect config and theme logic
   - `npm run build` — production build (static export into `out/`)
4. **Open a pull request.** Fill in the PR template and link the issue
   with `Closes #<number>`.
5. **Merge with "Rebase and merge"** to keep the history of `main`
   linear, then delete the branch.

## Commit messages

Commit messages use **Conventional Commits with English subjects**:

```
feat: add an events section to the top page
fix: keep the saved theme when storage is unavailable
docs: update documentation for v1.0.0
```

Types in use: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`.

## Deployment

Deployment is CLI-only (GitHub integration is disconnected):

```bash
vercel deploy --prod
```

Pushing to `main` does not deploy anything by itself.

## Releases

Releases are cut from `main`: bump the version, tag `vX.Y.Z`, and publish
a GitHub Release with notes only (no binaries are attached).

## Notes

- Never commit secrets. Local Vercel linkage (`.vercel/`) and `.env*`
  files are git-ignored.
- Short links (`/discord`, `/x`, `/note`) live in `vercel.json`; keep
  `lib/site.mjs` in sync — the test suite checks that they match.
