# Sotabosc ✨

**Sotabosc** is a personal writing companion designed to spark human creativity.

The idea is simple: Sotabosc provides prompts, constraints and unexpected starting points that encourage the user to write their own pieces.

It can be used for both **digital writing and analogue writing** — a prompt can be taken from the app and continued in a notebook, journal or anywhere else.

## Concept

> **Sotabosc doesn't write for you. It gives you something to write from.**

The app is intended as a lightweight creative tool rather than an AI content generator. Its purpose is to help writers overcome the blank page, experiment with different forms of writing and develop their own ideas.

## Writing Modes

The current concept includes four main writing modes:

* **Journal** — personal reflections, memories, questions and observations.
* **Automatic Writing** — exercises focused on spontaneity, free association and writing without overthinking.
* **Poetry** — poetic exercises, images, constraints, words and forms.
* **Free Writing** — creative situations, ideas, scenes and other open-ended writing exercises.

There is also a **Surprise Me** option, which can provide a prompt from any writing mode.

## Prompt System

Prompts are not necessarily restricted to a single writing mode.

A prompt can belong to multiple categories and can also have different tags describing its characteristics.

For example:

```ts
{
  id: 1,
  text: "Write about something you have lost without ever naming what it was.",
  categories: ["poetry", "journal"],
  tags: ["loss", "constraint"]
}
```

Possible tags may describe things such as:

* `dark`
* `surreal`
* `memory`
* `identity`
* `relationships`
* `constraint`
* `time`

This allows prompts to overlap naturally instead of forcing every exercise into a single category.

### Time-based prompts

Some writing exercises may include a time-based constraint, while others do not.

The user should eventually be able to choose whether they want:

* prompts with time constraints
* prompts without time constraints
* either type

Time is therefore treated as a characteristic of a prompt rather than a separate writing mode.

The actual timer is an optional writing feature.

## Main Flow

The basic user flow is:

```text
Home
  ↓
Choose a writing mode
  ↓
Receive a Spark
  ↓
Try another / Start writing
  ↓
Write
  ↓
Save
  ↓
Notebook
```

The **Notebook** stores previously written entries so the user can return to them later.

## Current MVP

The first version aims to stay intentionally small.

### Core features

* [ ] Home page
* [ ] Writing mode selection
* [ ] Prompt selection
* [ ] Surprise Me
* [ ] Try another prompt
* [ ] Writing screen
* [ ] Save a writing entry
* [ ] Notebook / saved entries
* [ ] Read previous entries
* [ ] Optional writing timer
* [ ] Prompt filtering by category and tags

The first implementation will use local data and browser storage rather than a backend.

## Future Ideas

These are deliberately **not part of the initial MVP**:

* AI-assisted prompting
* Backend / API
* User accounts
* Cloud storage
* More advanced prompt filtering
* Printable prompts for analogue writing
* Additional writing tools and constraints

If AI is introduced in the future, it should act as a **creative catalyst rather than an author**. It could suggest unusual angles, questions, constraints or approaches without generating the final piece of writing for the user.

## Tech Stack

The project is being developed as a way to practise and regain familiarity with frontend development.

Planned initial stack:

* **Angular**
* **TypeScript**
* **CSS**
* **Git / GitHub**
* **localStorage**

A backend and API may be introduced later if the project requires them.

## Project Philosophy

Sotabosc should remain simple.

The goal is not to build an overwhelming writing platform with endless features, but a small tool that makes someone think:

> *"Okay. I want to write."*
