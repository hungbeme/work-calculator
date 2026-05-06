---
name: Industrial Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  h1:
    fontFamily: Work Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
  h3:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.55'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 20px
  container-max: 1280px
---

## Brand & Style

The design system is anchored in the concept of "Industrial Precision." It bridges the gap between the rugged reliability of a factory floor and the sophisticated efficiency of modern SaaS. The brand personality is professional and reliable, prioritizing utility over decoration to ensure the interface feels fast and unobtrusive for workers and managers.

The visual style follows a **Modern Corporate** aesthetic with a heavy emphasis on **Minimalism**. It utilizes soft shadows to create depth without clutter, ensuring that the primary focus remains on data entry and earnings tracking. The goal is to evoke a sense of calm and control in a high-activity environment.

## Colors

The palette is functional and high-contrast. **Deep Blue (#1E3A8A)** serves as the primary anchor, used for navigation, primary actions, and brand identification to signal stability. **Green (#22C55E)** is reserved strictly for positive financial data, completed tasks, and success states, providing a clear psychological reward for work progress.

The background uses **Light Gray (#F9FAFB)** to reduce eye strain and differentiate the UI from the standard white backgrounds of consumer apps. Neutrals are tiered to provide hierarchy: slate grays are used for secondary text and borders to maintain a crisp, clean look.

## Typography

This design system employs a dual-font strategy. **Work Sans** is used for headlines to provide a grounded, professional structure that feels authoritative. **Inter** is used for all body copy, inputs, and data points due to its exceptional legibility and systematic performance in dense layouts.

Numerical data—specifically time logs and currency—should utilize `data-mono` (Inter with tabular lining figures) to ensure that columns of numbers align perfectly for quick scanning.

## Layout & Spacing

The layout utilizes a **Fixed Grid** system for desktop (12 columns) and a **Fluid Grid** for tablet and mobile devices to accommodate workers on the move. A strict 8px spacing scale (with a 4px half-step) ensures mathematical harmony and visual consistency across all screens.

Information density should be kept "Medium." Provide enough whitespace to prevent the UI from feeling cramped, but keep related data points tight enough that users don't have to scroll excessively to see their daily totals.

## Elevation & Depth

Depth is achieved through **Ambient Shadows** and **Tonal Layers**. Instead of harsh black shadows, this design system uses soft, diffused shadows tinted with the primary blue (e.g., `rgba(30, 58, 138, 0.08)`) to maintain a clean aesthetic.

- **Level 0 (Base):** Light Gray background (#F9FAFB).
- **Level 1 (Cards):** White surfaces with a subtle 1px border (#E2E8F0) and no shadow.
- **Level 2 (Interactive):** White surfaces with a soft shadow (8px blur, 4px Y-offset) to indicate hover states or floating elements.
- **Level 3 (Modals):** Highly diffused shadow (24px blur, 12px Y-offset) to pull focus.

## Shapes

The shape language is defined as **Rounded**. A base radius of `0.5rem` (8px) is applied to standard buttons, input fields, and small cards. This softness balances the "industrial" nature of the app, making the software feel modern and approachable rather than cold or technical.

Large containers and dashboard widgets use `rounded-lg` (16px) to clearly define workspace boundaries.

## Components

**Buttons:** Primary buttons use the Deep Blue background with white text. Success actions (e.g., "Clock Out" or "Submit Earnings") use the Green accent. Use a subtle scale-down effect (98%) on click to provide tactile feedback.

**Input Fields:** Use a white background with a 1px border. On focus, the border shifts to Deep Blue with a 3px soft outer glow (ring) to highlight the active entry point.

**Cards:** Dashboard widgets should be contained in white cards with a `1px` border. Use "Label-caps" typography for card headers to distinguish metadata from content.

**Status Chips:** Use subtle, desaturated background tints with high-contrast text (e.g., a very light green background with dark green text) for status indicators like "Verified" or "Pending."

**Work Timer:** A specialized component featuring large `data-mono` typography and a high-contrast "Stop/Start" toggle to ensure visibility in low-light or high-distraction factory environments.