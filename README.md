# Physics 2 Reviewer

A mobile- and desktop-friendly web reviewer for Physics 2: ten lecture modules (M1–M10: fluids, thermal physics, electrostatics, capacitors, circuits, magnetism, induction, optics) and ten labs (A1–A10), each with a full lesson, animated diagrams, typeset formulas, flashcards, quizzes and randomised practice problems, plus lab calculators, a formula sheet and a glossary. Progress is saved in the browser (localStorage). No backend.

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
Each module is one file in `src/modules/` and each lab one file in `src/labs/` (lesson blocks, terms, formulas, quiz, problem generators). Quizzes, flashcards, glossary and formula sheet are generated from those files automatically.
