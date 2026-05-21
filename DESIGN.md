---
name: Words of Life Christian Ministries
description: A compass in the dark — cinematic, typography-led church website for WLCM Philippines.
colors:
  abyssal-deep: "#002E38"
  teal-vault: "#074F56"
  cold-shore: "#E6EDEF"
  ember: "#EC662C"
typography:
  display:
    fontFamily: "Vogun, serif"
    fontSize: "clamp(3rem, 10vw, 9rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Vogun, serif"
    fontSize: "clamp(2rem, 5vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Outfit, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.2em"
rounded:
  none: "0px"
  2xl: "1rem"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.abyssal-deep}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "#d4581d"
    textColor: "{colors.abyssal-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cold-shore}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
  button-ghost-hover:
    backgroundColor: "rgba(230, 237, 239, 0.10)"
    textColor: "{colors.cold-shore}"
  nav-pill:
    backgroundColor: "rgba(0, 46, 56, 0.20)"
    textColor: "{colors.cold-shore}"
    rounded: "{rounded.full}"
    padding: "0 32px"
    height: "64px"
  nav-pill-scrolled:
    backgroundColor: "rgba(0, 46, 56, 0.95)"
    textColor: "{colors.cold-shore}"
  chip-info:
    backgroundColor: "rgba(230, 237, 239, 0.05)"
    textColor: "rgba(230, 237, 239, 0.60)"
    rounded: "{rounded.full}"
    padding: "8px 16px"
---

# Design System: Words of Life Christian Ministries

## 1. Overview

**Creative North Star: "The Compass in the Dark"**

WLCM's visual system is built on a single premise: navigation by faith in the absence of easy clarity. The dominant surface is ocean-floor dark — a darkness that earns meaning rather than evokes mood. Type is the signal. Vogun, WLCM's custom serif, appears at full-screen scale and functions as a landmark: a declaration that tells you exactly where you are. Outfit handles everything functional with military precision. The single accent, Ember, does not decorate. It points. Every appearance of Ember is directional — a CTA, an active state, a live indicator, a label that says "go here."

The system refuses two failure modes simultaneously. The first is the generic megachurch SaaS template: stock photography of praying hands, warm gradient CTAs, "Join Us This Sunday" in Proxima Nova, a hero section with a faded cross background. The second is the startup-minimalist white page that reduces faith to a brand statement — all-white, 14px light Outfit, "We believe in community" floating in a sea of padding. WLCM is darker and more specific than either. It assumes the person reading it is capable of being moved.

The admin layer breaks the register deliberately. Content managers need legibility, not atmosphere. Admin surfaces flip to Cold Shore and white — the cinematic darkness steps aside. That flip is a feature, not a bug.

**Key Characteristics:**
- Typography-led: Vogun at display scale IS the design moment
- Flat tonal depth: no resting shadows; depth through layered opacities and tonal steps
- One accent: Ember on no more than 10% of any public-facing surface
- Pill geometry throughout: nav container, buttons, chips, tags — never square corners on interactive elements
- Case as register: UPPERCASE = formal/institutional authority, lowercase = intimate/approachable confession

## 2. Colors: The Abyssal Palette

Four tokens. Ocean floor, a lit interior, the shore above, and a single ember.

### Primary
- **Ember** (#EC662C): the compass needle. Navigation CTAs, active nav states, label overlines, live-indicator dots, focus borders on inputs. Never used as background fill, never decorative. If Ember is everywhere, it points nowhere.

### Neutral
- **Abyssal Deep** (#002E38): the base surface. Every public-facing page begins here. A near-black with strong teal undertone — never a flat #000 or #111. Its character comes from the hue.
- **Teal Vault** (#074F56): elevated surfaces, gradient layers, the "lit interior" within the deep. Used in gradients from-deep-teal, as hover backgrounds, in component surfaces that need to read as slightly raised without a shadow.
- **Cold Shore** (#E6EDEF): primary text and all foreground elements. Not white — tinted toward the palette's teal axis. Against Abyssal Deep it reads as warmth; against white it reveals its cool blue-gray cast.

**The One Ember Rule.** Ember appears on no more than 10% of any given public-facing screen at any moment. Its scarcity is the mechanism. The instant it fills backgrounds, trims every component, or appears in body copy, it stops pointing and starts cluttering. Count it.

**The Light-Flip Rule.** Admin and tool surfaces flip to the light register (Cold Shore base, white-50 panels, Abyssal Deep text). The dark cinematic aesthetic serves atmosphere on public pages; it impedes productivity in the admin layer. The flip is a register change, not a contradiction.

## 3. Typography: Two Instruments, One Voice

**Display Font:** Vogun (custom serif, Medium 500) — `serif` fallback only.
**Body Font:** Outfit (Google Fonts, variable 100–800) — `sans-serif` fallback.

**Character:** Vogun is the authority — declarative, weighty, made for scale. Outfit is the instrument of precision — functional, spaced, working hard at small sizes. Neither explains itself to the reader. The pairing derives legitimacy from restraint: Vogun appears rarely; when it does, it commands.

### Hierarchy
- **Display** (Vogun 500, clamp(3rem, 10vw, 9rem), line-height 1, tracking -0.04em): Full-screen hero lockups, the WLCM wordmark treatment, maximum-scale section anchors. UPPERCASE for institutional declarations ("WORDS OF LIFE"), lowercase for intimate confessions ("reach out."). Never use display weight in running text or below 2rem.
- **Headline** (Vogun 500, clamp(2rem, 5vw, 5rem), line-height 1.1, tracking -0.02em): Section introductions, modal titles, large CTAs in the full-screen nav. The lowercase "reach out." pattern — intimate, direct, not performing authority.
- **Title** (Outfit 600, 1.125rem, line-height 1.4): Card headings, sidebar titles, admin panel section labels, dropdown item names.
- **Body** (Outfit 400, 1rem, line-height 1.7): Paragraph copy, descriptions, modal body, form helper text. Cap line length at 65ch to maintain legibility at wide viewports.
- **Label** (Outfit 700, 0.625rem, line-height 1, tracking 0.2em, UPPERCASE): Nav links, button text, overlines, section tags, floating input labels. The sharpest instrument in the system.

**The Vogun Threshold Rule.** Vogun below 1.5rem is forbidden. Its letterforms are built for scale; collapsed, they lose legibility and authority simultaneously. Below the threshold, Outfit carries everything.

**The Case Register Rule.** UPPERCASE Vogun declares; it is the voice of the institution. Lowercase Vogun confides; it is the voice of a person. The same word — "reach out" vs. "REACH OUT" — carries entirely different weight. Choose deliberately, never by default.

## 4. Elevation

The system is flat by default. There are no resting-state shadows on surfaces, cards, or containers. Depth is conveyed through three mechanisms: tonal layering (Abyssal Deep → Teal Vault → opacity-stacked linen), backdrop-blur on floating elements, and the clip-path reveal system for images.

The single elevation exception is the Ember glow: a diffuse orange shadow on primary CTAs that signals interactability. It is a halo, not a lift.

**The Flat-By-Default Rule.** Surfaces rest at the same level. Shadows appear only as a response to state — a CTA's glow on hover, a dropdown's disambiguation shadow over content below. Decorative box-shadows on cards, sections, and containers are prohibited.

### Shadow Vocabulary
- **Ember Glow** (`0 20px 60px rgba(236, 102, 44, 0.20)`): Primary CTA buttons only. The halo that says "press me." Applied via `shadow-2xl shadow-harvest-orange/20`.
- **Float Shadow** (`0 25px 50px rgba(0,0,0,0.25)` combined with `backdrop-blur-xl`): Dropdowns and floating overlays that must read above the surface below. The blur is load-bearing — it provides disambiguation without a hard edge.

## 5. Components

### Buttons
- **Shape:** Fully rounded (border-radius 9999px) — pill throughout. Never a square corner on an interactive element.
- **Primary:** Ember (#EC662C) fill, Abyssal Deep (#002E38) text. Outfit Bold, Label scale (0.625rem), UPPERCASE, tracking 0.2em. Padding: 8px 20px standard, 12px 28px hero/modal. Ember Glow shadow on hover.
- **Hover:** Background darkens ~10% (`#d4581d`). Framer `whileHover: { scale: 1.05 }`, `whileTap: { scale: 0.95 }`.
- **Ghost:** Transparent fill, Cold Shore/30 border, Cold Shore text. Hover: Cold Shore/10 background. Used for secondary actions alongside a Primary — "Watch Live" beside "Plan a Visit."
- **Never:** A rectangular button with square corners. Never gradient fills. Never gradient text inside a button.

### Chips / Info Tags
- **Style:** Pill shape. Cold Shore/5 fill, Cold Shore/10 border, Cold Shore/60 text at Label scale. Non-interactive.
- **Live indicator variant:** 6px Ember circle with `animate-pulse` inside the chip, preceding the text. Used for "Watch Live" and service-time announcements.
- **Rule:** Chips are metadata, not CTAs. They don't hover, don't animate on interaction, don't carry Ember as fill.

### Inputs / Fields
- **Style:** Transparent background, no box model. Border-bottom only at Cold Shore/10 opacity. `outline: none`. No border-radius. The form exists in open space, not in a container.
- **Placeholder:** Vogun at Headline scale, ~5% opacity. The placeholder is atmosphere, not instruction — it creates the feeling of a space waiting to receive something, not a form field demanding data.
- **Focus:** Border-bottom transitions from Cold Shore/10 → Ember. Floating label fades in at `absolute -top-6 left-0` — Outfit Bold, Label scale, Ember color — visible only on `focus-within`.
- **The Open Form Rule.** No rectangular input wrappers, no background-fill boxes, no rounded corners on text fields. The underline-only treatment preserves the open, planar aesthetic. A box breaks the surface.

### Navigation
- **Desktop pill container:** Full-width header, inner pill at max-w-7xl, rounded-full, Abyssal Deep/20 frosted glass at rest → Abyssal Deep/95 + shadow after 30px scroll. Backdrop-blur-md. Transition: 500ms.
- **Nav links:** Outfit Bold, Label scale, UPPERCASE, tracking 0.15em. Default Cold Shore, active Ember, hover Ember. Active state: animated Ember underline (Framer `layoutId="navUnderline"`, 2px height).
- **CTA cluster:** "Plan a Visit" (Primary button) + "Watch Live" (Ghost button with Ember live dot). Right side of nav.
- **Mobile full-screen menu:** Hamburger → clip-path circle expand from top-right corner (`circle(0% at calc(100% - 60px) 36px)` → `circle(200%...)`). Curve: `[0.77, 0, 0.175, 1]`, 750ms. Menu items: Vogun Headline scale, Cold Shore text, Ember on hover. Grouped by section.
- **Mobile bottom bar:** Three pill buttons fixed at viewport bottom (hidden on lg+). Gradient fade from Abyssal Deep/95 to transparent. Primary + 2× Ghost layout.

### Admin Surfaces
- **Register flip:** Admin pages use Cold Shore (#E6EDEF) as the base background. Abyssal Deep for text. White/50 for panel fills. The cinematic dark aesthetic does not apply here.
- **Admin nav (sidebar + header):** Standard product UI patterns. No Vogun display headlines. Outfit throughout. Ember used only for primary action buttons and active states, same rules as public side.
- **Purpose:** Utility wins over atmosphere in the admin layer. Legibility, density, and clear state signaling matter more than the cinematic brand.

## 6. Do's and Don'ts

### Do:
- **Do** use Ember to point, never to decorate. Every Ember element should direct attention to an action or signal a state. If it doesn't do either, remove it.
- **Do** reserve Vogun for display and headline scale. One Vogun line per screen-section is often enough. Let silence do work.
- **Do** vary UPPERCASE vs. lowercase Vogun with intention. The case choice carries tonal weight. UPPERCASE declares, lowercase confides.
- **Do** use underline-only inputs with transparent backgrounds. The open form aesthetic is part of the surface design, not just a style preference.
- **Do** flip to the light register for admin and tool surfaces. The dark aesthetic is for the world-facing site; the internal tools need legibility.
- **Do** use the house easing curve `cubic-bezier(0.77, 0, 0.175, 1)` for significant transitions (menu open/close, clip-path reveals). Ease-out-quart or expo for smaller state transitions.
- **Do** honor `prefers-reduced-motion` — especially for clip-path reveals, the circle menu expand, Framer scroll-driven sequences, and the pulse animations.
- **Do** keep WCAG AA contrast ratios intact. Cold Shore (#E6EDEF) on Abyssal Deep (#002E38) passes comfortably; verify any time opacity modifiers are added to text.

### Don't:
- **Don't** use stock photography of praying hands, faded cross imagery, or gradient CTAs. This is the exact visual language WLCM is departing from. These images say "generic church website" before a word is read.
- **Don't** put meaningful content on an all-white background with 14px light-weight Outfit. That is the startup-minimalist path that reduces faith to a brand statement.
- **Don't** apply gradient text (`background-clip: text` + gradient background). Ember is used as a solid color. Decorative gradient text is prohibited.
- **Don't** use border-left greater than 1px as a colored accent stripe on any callout, card, or list item. Use a background tint, an Ember overline, or a leading icon instead.
- **Don't** use Vogun below 1.5rem. The letterforms lose legibility and the authority collapses.
- **Don't** put Ember on more than 10% of any public-facing screen. Count the Ember surface area. If it's drifting toward 20%, something decorative has crept in.
- **Don't** add decorative box-shadows or glassmorphism effects to card surfaces. The system is flat at rest; frosted-glass cards on top of a dark background break the tonal depth strategy and read as generic "dark UI."
- **Don't** use bounce or elastic easing. The house curve and ease-out-expo only. Playful motion is off-brand.
- **Don't** put identical-grid layouts of same-sized cards with icon + heading + text. That is the SaaS dashboard cliché. Vary size, weight, and density before reaching for the card grid.
