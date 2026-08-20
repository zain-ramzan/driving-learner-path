# Driving Learner Path — Ground-Truth UI Specification

## Source and content boundary

The learning catalogue must use **only** public titles, durations, descriptions, playlists, thumbnails, and links supplied by the user-provided YouTube channel: `https://www.youtube.com/@warraichpatentebinpunjabi2783`. The site must not introduce driving rules, explanations, claims, quizzes, lesson summaries, translations, or curriculum content from any other source. It may use neutral interface labels such as “Chapter”, “Lesson”, “Complete”, and “Next lesson” to organize the channel material.

## Reference direction

This design is based on the user-supplied ChatGPT-inspired interface specification, adapted for a self-paced video learning environment. It must reproduce the reference's **interaction principles**, not ChatGPT branding, logos, exact icons, or wording.

### Product character

The product should feel like a calm, conversational learning workspace. The learner sees their course path, the active YouTube lesson, source attribution, and one clear next action. It must not resemble a traditional e-learning dashboard with dense cards, gamified rewards, promotional banners, or visual noise.

### Shell and layout

On desktop, the application has a narrow persistent sidebar (approximately 264px) and one generous central workspace. The sidebar holds the product brand, a “New learning path” reset action, search, Home, Course Path, a compact chapter list, recently viewed channel lessons, and settings/reset access. A right panel is optional and opens only for contextual source details. On mobile, the sidebar becomes a drawer and the completion/composer region remains immediately reachable.

### Workspace and completion flow

The workspace begins with an upper-middle welcome and a quiet prompt-like selector that asks the learner to choose or continue a lesson. Once a lesson is selected, the interface becomes a clean conversation/document canvas: a short learner intent, the embedded YouTube player, exact source metadata, then one dominant acknowledgement button labelled `Mark lesson complete`. Completion persists locally in the browser. The following lesson unlocks and becomes the clear suggested next action. No lesson is marked complete automatically, and no score is implied.

### Visual system

Use a soft neutral light interface: background `#FFFFFF`, warm sidebar `#F7F7F5`, secondary surface `#F4F4F2`, primary text `#181817`, secondary text `#6B6B68`, and borders `#E5E5E2`. Use a restrained original course accent—deep road green `#0D7C66`—only for selected, focus, and completion states. Maintain a visually compatible dark mode with `#212121` canvas, `#171717` sidebar, `#2A2A2A` elevated surfaces, and subdued typography. Typography is `Manrope` with tabular numerals for video duration and progress counts. Spacing follows an 8px scale; separation is primarily whitespace rather than repeated cards or borders.

### Components and interaction principles

The main composer is a softly rounded `24–28px` control of approximately `680–780px` on desktop, with contextual suggestions below it. The active lesson lives in an uncluttered document-like canvas rather than a large nested card. Use one dominant action per region, with secondary links or compact chips for switching chapters, viewing the source on YouTube, and reopening previously completed lessons. Keep progressive disclosure: source details and reset options live behind contextual controls. Use a keyboard-accessible command-style search for lesson titles and source identifiers.

### Motion and accessibility

Motion is brief and functional only: 180–240ms opacity/transform transitions for lesson changes and unlocked items, with `prefers-reduced-motion` support. All interactive controls must be keyboard accessible, retain visible focus outlines, meet practical 44px mobile touch targets, and have sufficient contrast. Completion must never be communicated by color alone; use a check icon and clear text.

### Explicit exclusions

Do not use OpenAI or ChatGPT branding. Do not imitate exact proprietary marks, icons, copy, or visual assets. Do not add non-channel driving content. Do not use a gamified streak, points, coins, fictional progress claims, fake student reviews, prominent hero banners, carousel sections, permanent floating chat controls, decorative gradients, or a wall of cards.
