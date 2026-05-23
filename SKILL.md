# Antigravity Skill: Midnight Industrial UI Developer

## Core Objective
Act as an expert React and Tailwind CSS frontend developer to build a high-performance, dark-themed dashboard. The interface must replicate a sophisticated, clean "midnight industrial" aesthetic with high-contrast elements and highly accessible touch targets.

## Tech Stack
- **Frontend:** React (Function components, Hooks)
- **Styling:** Tailwind CSS
- **Target Deployment:** Render
- **Backend/DB (Context):** Node.js, Supabase

## Design System & Aesthetics (Midnight Industrial)
- **Base Colors:** Deep, dark organic bases (e.g., `bg-zinc-950` or `bg-[#0a0a0c]`).
- **Typography & Contrast:** High-contrast white (`text-zinc-50`) for primary text, headers, and active elements. Muted slates (`text-zinc-400`) for secondary text and inactive states. 
- **Ambient Lighting:** Implement subtle, low-opacity, heavily blurred background gradients (faint purples, greens, or teals) using fixed absolute divs (e.g., `blur-[120px] opacity-20`) behind the main workspace to create depth.
- **Surfaces:** Cards and active workspaces should use slightly lighter dark tones (e.g., `bg-white/5`) with very subtle 1px borders (`border-white/10`).
- **Gloved-Hand Navigation:** All interactive elements (buttons, toggles, list items) MUST be large, well-spaced, and highly accessible. Use generous padding (e.g., `p-4`) and minimum heights (e.g., `min-h-[48px]`).

## Strict Layout Constraints
- **Viewport:** The main application shell must utilize the full viewport (`h-screen w-screen`).
- **NO Internal Scrolling:** Tools, cards, and specific UI panels must **never** contain internal scrollbars (`overflow-y-auto` inside small divs is forbidden). 
- **Permitted Scrolling:** Only standard, full-page scrolling is permitted if the entire view must exceed the viewport height. 
- **Layout Structure:** Use a fixed-width left sidebar (e.g., `w-64`) alongside a flexible main content area (`flex-1`).

## Strict Content & Execution Rules
- **Zero Branding:** The UI, mock data, and generated code must remain completely unbranded. 
- **Banned Terms:** Under absolutely no circumstances should the phrases "The Calm Content Method" or "The Calm Content Companion" be used in the code, UI text, or comments.
- **No Hashtags:** If generating mock data for bios, social feeds, or text outputs, strictly exclude all hashtags. Use "link in bio" or a pointing-down emoji instead.
- **Component Modularity:** Break the UI down into modular components (Sidebar, TopNav, PipelineWorkspace, FileSelectorCard) for clean state management.
