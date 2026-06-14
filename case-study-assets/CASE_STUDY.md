# Case Study: Shopping List App

## Origin

This project began as a 6-hour coding challenge for a front end developer
role I applied for. The brief listed 8 user stories, from basic CRUD
through to budget tracking, sharing, and authentication.

I committed to 6 hours and aimed for stories 1, 2, 3, 7 and 8. In the end,
I completed only 1–3, and the result was rougher than I'd have liked. The
feedback was that it wasn't enough for the time given — which was fair.
Looking back, the code had real issues: a direct state mutation bug
(`listOfItems.push()` instead of `setListOfItems()`), dead code, and
minimal structure.

I didn't get the role, and stepped away from job hunting for a while
afterwards. I always intended to come back to this project once I had
the headspace for it.

## The Rebuild

Returning to it for my portfolio, I decided to rebuild from scratch rather
than patch the original. The original was Create React App; this rebuild
uses **Vite + React + TypeScript**, matching my current stack across other
portfolio projects.

### Approach

Working with Claude as a pair-programming collaborator, I:

- Defined the data model (`ShoppingItem`: id, name, checked)
- Planned a story-by-story build, where each story is a working,
  tested, committed increment — never leaving the app in a broken state
- Wrote tests alongside each feature using Vitest + Testing Library

This is an honest record of an AI-assisted build: I made the scoping and
design decisions (data model, component structure, testing conventions,
UX trade-offs), and used Claude to generate code, explain concepts I was
unfamiliar with, and catch issues along the way.

### Stories completed (v1)

1. ✅ View shopping list items
2. ✅ Add items (with duplicate detection, case-insensitive)
3. ✅ Remove items
4. ✅ Mark items as picked up (checkbox + strikethrough)
5. ✅ Persist list via localStorage
6. ✅ Reorder items

### Key decisions

**TypeScript rebuild vs. extending the original** — the original had a
genuine React bug (direct state mutation) and minimal structure. A clean
rebuild in my current stack was faster and more honest than patching code
I'd already flagged as weak.

**`crypto.randomUUID()` over a uuid library** — built into modern browsers,
no extra dependency needed.

**Generic `useLocalStorage` hook** — persistence logic is reusable and
isolated from component logic.

**Story-by-story commits, never broken** — each story is its own commit,
and the app is runnable and tested at every step. This makes the git
history a readable record of incremental delivery.

**Up/down buttons instead of drag-and-drop for reordering (story 6)** —
I originally planned drag-and-drop, but chose simple up/down buttons
instead. They're trivial to implement, need no extra dependency, and are
naturally accessible via keyboard and screen reader without additional
configuration. Drag-and-drop remains a possible future enhancement, but
accessibility-by-default felt like the stronger choice for a portfolio
piece — especially one demonstrating UX thinking, not just feature
completeness.

## What I'd add with more time

- Budget tracking (item cost, running total, spending limit with alert)
- A proper visual design pass — currently functional but unstyled
- Category support, enabling sort by category/cost/alphabetical
- Drag-and-drop reordering as a progressive enhancement alongside the
  existing buttons
- Expanded validation (item name length limits, handling very long lists)

## Status

Stories 1–6 complete, fully tested (23 passing tests). Deployed at
shopping-list.kerryclements.com for reference; full case study and context
at kerryclements.com.
