# Physics 2 Lab Reviewer

A mobile- and desktop-friendly web reviewer for ten Physics 2 labs (A1–A10): full lessons with animated diagrams and typeset formulas, flashcards, quizzes, randomised practice problems, lab calculators, a formula sheet and a glossary. Progress is saved in the browser (localStorage). No backend.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Deploy on Render (Static Site)
1. Push this repo to GitHub.
2. Render dashboard → **New → Static Site** → pick the repo.
3. Build command: `npm install && npm run build`; Publish directory: `dist`.
4. (Or use **New → Blueprint** and Render reads `render.yaml`.)

## Add or edit content
Each lab is one file in `src/labs/` (lesson blocks, terms, formulas, quiz, problem generators). Quizzes, flashcards, glossary and formula sheet are generated from those files automatically.
