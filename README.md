# Shopping List App

A shopping list app built with React, TypeScript, and Vite, featuring item
management, persistence, and reordering.

🔗 **Live demo:** [shopping-list.kerryclements.com](https://shopping-list.kerryclements.com)
📝 **Case study:** [kerryclements.com/portfolio/shopping-list](https://kerryclements.com/portfolio/shopping-list)

## About

This started as a recruitment coding challenge: a 6-hour timed exercise to
build a shopping list app from a set of user stories. This repo is a
ground-up rebuild for my portfolio, taking the same brief without the time
constraint, built with my current stack and tested throughout.

Read the [case study](https://kerryclements.com/portfolio/shopping-list) for
the full story, including what changed from the original attempt and the
design decisions made along the way.

## Features

- View, add, and remove shopping list items
- Mark items as picked up
- Reorder items
- Persists between visits via localStorage
- Duplicate detection (case-insensitive)

## Tech stack

- React + TypeScript
- Vite
- Vitest + React Testing Library

## Running locally

```bash
npm install
npm run dev
```

## Running tests

```bash
npm run test
```

## Licence

MIT. See [LICENSE](./LICENSE) for details.
