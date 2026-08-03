# 🌳 FocusTree

**Get the task done, grow a tree.** A single-file, offline productivity app built around the
anti-burnout techniques on the poster: finish something, and it plants a tree in your forest
forever. Bigger task, bigger tree. No points, no levels, no badges — just the work and the
record of it.

```
open index.html
```

That's the whole install. One file, no build step, no backend, no account, no network calls.
Everything lives in `localStorage` on your machine.

---

## How a session goes

Every time you open it, the app counts you in — **5 · 4 · 3 · 2 · 1 · GO** in big yellow
numbers, then drops you straight into the brain dump. No dashboard, no menu, no chance to
drift. (Any key or click skips it.)

From there the flow is a rail across the top, and each step ends in one button that pushes
you to the next:

> **DUMP → PLAN → FOCUS → FOREST**

| Step | What you do |
| --- | --- |
| **1 · Dump** | Empty your head into one box. Don't sort it — just get it out. |
| **2 · Plan** | Triage the dump into 1 major, 3 medium, 5 small. Flag the frog. |
| **3 · Focus** | One task, one timer, everything else visibly parked. |
| **4 · Forest** | The trees you earned. |

At the end of the day, **Close the day** runs the shutdown ritual so work stops leaking into
the evening.

---

## The techniques, and where they live

| Technique | In the app |
| --- | --- |
| **The 5-second rule** | The 5·4·3·2·1·GO countdown on every app launch and every focus session — action before hesitation. |
| **The 1-3-5 rule** | The planner: 1 major, 3 medium, 5 small, hard-capped. A 4th medium is simply refused. |
| **The Pomodoro method** | 25/5 timer that auto-rolls into breaks, with a long break every 4th round. |
| **The 2-minute rule** | The Quick wins bar — type it, hit *Do it now*, a 2:00 clock runs, done. It plants a shrub. |
| **Eat the frog** | Flag one task 🐸. It gets pinned to the top with a nudge, and *Start focusing* picks it automatically. |
| **Stop multitasking** | Exactly one task can be active. The rest sit dimmed under "parked while you focus", and switching mid-session asks you to confirm. |
| **Break big tasks down** | Any task expands into steps. They're checklists for you, not a score. |
| **A "not to do" list** | A deliberate parking lot. Tasks and dumped thoughts get demoted here instead of deleted — and can come back. |
| **Brain dump** *(added)* | Capture first, categorize later. Each item triages three ways: plan it, do it now, or don't do it. |
| **Shutdown ritual** *(added)* | End the day on purpose: see today's trees, carry over or drop what's left, set tomorrow's frog, close. |

---

## The trees

Each finished task plants one tree, drawn as procedural SVG from a seeded PRNG — so a tree
looks the same every time you come back, but no two are alike.

- **Species is random** at plant time: oak, birch, maple, willow, or pine.
- **Size comes only from the task size** — that's the only rule:

  | Task | Tree |
  | --- | --- |
  | Quick win (<2 min) | shrub |
  | Small | small tree |
  | Medium | mid tree |
  | Major | big tree |

Nothing to grind and no meter to feed. Pomodoros are for focusing; the tree arrives when the
task is actually done.

---

## Data

Everything is kept under the `focustree.v1` key in `localStorage`:

```js
{
  version: 1,
  tasks:    [{ id, title, size, frog, steps, done, createdAt, completedAt }],
  inbox:    [{ id, text, capturedAt }],
  notToDo:  [{ id, text, addedAt }],
  forest:   [{ id, seed, species, size, plantedAt, taskTitle }],
  stats:    { streak, lastActiveDay, totalPomos, lastShutdown, round },
  settings: { focusMin, breakMin, longBreakMin, roundsBeforeLong, sound },
  timer:    { taskId, mode, endsAt, paused, remainingMs, round },
  activeId: null
}
```

Finished tasks leave the planner when the day rolls over; unfinished ones carry over. Trees
never leave. The timer stores an absolute `endsAt`, so it survives reloads and a throttled
background tab. If `localStorage` is blocked or corrupt, the app falls back to in-memory
state rather than breaking.

Want a different Pomodoro length? Edit `settings.focusMin` in the stored object, or change
the defaults in `fresh()` inside `index.html`.

## Keyboard

| Key | Does |
| --- | --- |
| `Space` | Start / pause the timer (on Focus) |
| `1` `2` `3` `4` | Dump · Plan · Focus · Forest |
| `N` | Jump to the capture box |
| `Esc` | Close a dialog |
| any key | Skip the countdown |

## Notes

Dark only, by design — it's the poster's palette. Respects `prefers-reduced-motion`
(animations and the leaf burst turn off). Sound is generated with WebAudio, unlocks on your
first interaction, and toggles from the header.
