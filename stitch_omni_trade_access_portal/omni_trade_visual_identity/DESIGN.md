---
name: Omni-Trade Visual Identity
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c2c6db'
  on-secondary: '#2b3040'
  secondary-container: '#414658'
  on-secondary-container: '#b0b4c9'
  tertiary: '#bcc7de'
  on-tertiary: '#263143'
  tertiary-container: '#8691a7'
  on-tertiary-container: '#1f2a3c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dee1f7'
  secondary-fixed-dim: '#c2c6db'
  on-secondary-fixed: '#161b2b'
  on-secondary-fixed-variant: '#414658'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

The design system is engineered to project the precision of financial automation with the forward-leaning aesthetic of high-tech SaaS. It utilizes a refined **Glassmorphism** style, moving away from flat patterns toward a tactile, layered environment that suggests depth and data complexity.

The visual language balances the "Dark Mode" gravity of deep navy with the energy of electric blue, ensuring the platform feels like a high-performance cockpit. It emphasizes clarity through high-contrast typography and subtle luminosity, signaling a trustworthy environment where algorithmic speed meets human-readable insights.

## Colors

The palette is anchored in a deep navy background to reduce eye strain during long trading sessions. The **Electric Blue (#3B82F6)** serves as the primary action color, used sparingly for critical interactive elements and data highlights to maintain its "electric" impact.

White and off-white (#F8FAFC) provide high-contrast legibility for data. Tertiary shades are utilized for surface layering, while semi-transparent "Glass" fills allow the background depth to permeate through the interface. Secondary accents for financial status (Success/Green, Error/Red) are calibrated for high vibrance against the dark canvas.

## Typography

This design system employs a dual-font strategy. **Manrope** is used for headlines to provide a refined, modern geometric character that feels premium and stable. **Inter** handles body copy and functional labels, chosen for its exceptional legibility in data-dense SaaS environments.

For specialized financial data (tickers, prices, execution logs), a secondary monospace-leaning font or the "data-mono" variant is recommended to ensure numerical alignment and a technical "terminal" feel. Letter spacing is tightened on headlines for a more "locked-in" appearance and expanded on labels for clarity.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** with fixed maximum width for desktop viewing. A rigid 4px baseline grid ensures vertical rhythm across data tables and forms. 

Spacing is intentionally generous around high-level containers (24px - 32px) to prevent the dark UI from feeling claustrophobic, while internal component spacing remains tight (8px - 12px) to maintain the density required for professional trading tools. All margins and paddings must be multiples of the 4px base unit.

## Elevation & Depth

Elevation is communicated through **Glassmorphism** and tonal stacking rather than traditional drop shadows. 

1.  **Base Layer:** The deepest background (#0A0F1E).
2.  **Surface Layer:** Tonal shift to #1E293B for sidebar or navigation backgrounds.
3.  **Glass Layer:** Semi-transparent cards with a 12px-20px backdrop blur and a 1px solid border (rgba 255, 255, 255, 0.08). This creates a "frosted" effect that sits above the base.
4.  **Interactive Layer:** Primary buttons and active states use a subtle outer glow (0px 0px 15px rgba(59, 130, 246, 0.4)) to simulate light emission from the "electric" accent.

## Shapes

The design system adopts a **Rounded** language (0.5rem / 8px base) to soften the technical nature of the platform and make it feel more approachable. 

- **Small Components (Buttons, Inputs):** 8px radius.
- **Medium Components (Cards, Modals):** 12px - 16px radius.
- **Large Sections (Main Containers):** 24px radius for a distinctive, modern "app-like" containerized feel.
- **Status Indicators:** Fully circular (pill-shaped) for badges and tags.

## Components

### Buttons
- **Primary:** Electric blue fill, white text. Hover state: Lighten blue by 10% and apply a subtle glow.
- **Secondary (Glass):** Transparent background, 1px white (8% opacity) border. Hover: Background becomes 12% opacity white.
- **Transitions:** All state changes should use a 200ms ease-in-out transition for a premium, fluid feel.

### Cards
- Utilizes the "Glass Layer" definition. High-precision data should be housed in cards with 12px padding and a subtle 1px top-border highlight to simulate light hitting the edge.

### Input Fields
- Dark background (#0F172A), 1px border. On focus: Border changes to Electric Blue, and a subtle blue inner shadow is applied. Labels use the "label-caps" typography style for a technical aesthetic.

### Data Visualization
- Charts should use the Electric Blue for the primary data line. Use gradients (Electric Blue to Transparent) for area charts to reinforce the "glow" aesthetic.

### Tables
- No vertical borders. Use horizontal dividers with 5% white opacity. Row hover: 8% white opacity background to highlight the active data point.