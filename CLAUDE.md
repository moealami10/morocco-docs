# Kaghit — Project Context & Working Rules

## What this project is
Kaghit (kaghit.com) is a free Moroccan administrative document website: document generators
(attestation de travail, autorisation parentale, photo CIN), fact-checked guides (casier
judiciaire, acte de naissance), and a goal wizard (Objectifs) tying them together. Vite + React +
TypeScript + Tailwind, client-side only — no backend, no database, documents generated entirely
in the browser. Deployed on Vercel.

## How I want you to work — simple version
1. I tell you what I want.
2. You investigate the actual code — don't assume, read the real files.
3. You propose exactly what you'd change and why. Wait for my go-ahead before touching anything.
4. Once approved, make the change, scoped to exactly what I approved — nothing extra "while you're in there."
5. Run `npm run build` yourself. Confirm it actually succeeds before telling me you're done. If it
   fails, show me the real error, don't quietly patch around it.
6. Tell me what to check/verify afterward.

## Hard rules
- Start every session in Plan Mode. Never switch to Auto-Accept or Auto mode without me asking.
- Never use git worktrees for this project (no --worktree/-w, no automatic worktree creation). If
  one ever gets created for any reason, tell me immediately instead of continuing inside it.
- Before editing anything, confirm the current state is committed. If there are uncommitted
  changes already sitting there, tell me before doing anything else.
- Keep every data structure (TypeScript interfaces, union types) consistent across every file that
  uses it — the build has broken twice from string literals that didn't exactly match the type
  they were supposed to satisfy. Double check this specifically before considering a task done.
- Any new document/guide content involving Moroccan administrative facts (prices, deadlines, legal
  requirements) must be verified against current, real sources — don't reuse old or assumed
  figures. Distinguish clearly between what's a legal requirement, what's commonly requested, and
  what depends on the specific situation — don't overstate any of these as universal.
- Never generate content for these categories without flagging it to me first: powers of attorney,
  legal complaints, divorce/marriage filings, debt acknowledgments, binding contracts (employment,
  rental, sale). These need an actual lawyer or notary, not a generic generator.
- Files placed in `public/` are served from the site root (`/...`), never `/public/...`.

## Current model/effort defaults
Sonnet 5, High effort. Only suggest escalating to Opus if something is conceptually wrong, not if
the issue is incomplete follow-through, missed verification, or a small inconsistency — that's an
effort problem, not a capability problem.
