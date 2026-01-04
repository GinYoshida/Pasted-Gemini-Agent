# Kanji Learning Quiz App - Design Guidelines

## Design Approach

**Dual-Interface Strategy**: Reference Duolingo Kids and Khan Academy Kids for the child-facing experience (playful, gamified, encouraging). Reference Linear and Notion for the parent/admin dashboard (clean, data-focused, professional).

**Core Principle**: Maintain visual cohesion through shared spacing and typography scales while using distinct visual treatments for each audience.

---

## Typography

**Child Interface**:
- Display: Fredoka (Google Fonts) - 700 weight for headers
- Body: Nunito - 400 regular, 600 semibold
- Kanji Display: Noto Sans JP - 700 weight, extra-large sizing

**Parent/Admin Interface**:
- Headers: Inter - 600 semibold
- Body: Inter - 400 regular, 500 medium
- Data/Stats: JetBrains Mono - 400 (for numbers)

**Hierarchy**:
- Hero/Main Quiz: text-4xl to text-6xl
- Section Headers: text-2xl to text-3xl
- Body Content: text-base to text-lg
- Captions/Meta: text-sm

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm (p-4, gap-6, my-8, etc.)

**Child Quiz Interface**:
- Full-screen quiz cards (h-screen with safe padding)
- Large tap targets (min 56px/14 Tailwind units)
- Maximum content width: max-w-2xl centered
- Card-based progression system

**Parent Dashboard**:
- Sidebar navigation (w-64, fixed left)
- Main content area with max-w-6xl
- Advertising section: Dedicated card in sidebar + optional banner below header
- Grid layouts: 2-column for stats (md:grid-cols-2), 3-column for detailed metrics (lg:grid-cols-3)

---

## Component Library

**Child Interface Components**:
1. **Quiz Card**: Large rounded container (rounded-3xl) with kanji character centered, shadow-2xl elevation
2. **Answer Buttons**: Chunky rounded buttons (rounded-2xl, p-6) in grid layout, large text
3. **Progress Bar**: Thick animated bar (h-4) with playful rounded ends
4. **Reward Animations**: Star bursts, confetti moments (use Lottie via CDN)
5. **Character Mascot**: Friendly guide positioned bottom-right, encouraging messages in speech bubbles

**Parent Dashboard Components**:
1. **Stat Cards**: Clean rectangles (rounded-lg) with icon, number, label, micro-trend indicator
2. **Progress Charts**: Line graphs for learning trends, bar charts for kanji mastery
3. **Child Selector**: Dropdown or avatar-based switcher in header
4. **Activity Feed**: Timeline-style list of recent quiz sessions
5. **Affiliate Ad Cards**: 
   - Primary: Featured card in sidebar (300x250 equivalent, rounded-lg, subtle border)
   - Secondary: Banner below header (max-h-24, dismissible)
   - Styling: Clearly labeled "Recommended Resources", professional appearance, distinct from dashboard UI with subtle background treatment

**Shared Components**:
1. **Navigation**: Child nav uses large icon buttons; Parent nav uses sidebar with icon+label
2. **Modals**: Overlay with backdrop-blur, child modals more playful, parent modals minimal
3. **Buttons**: Primary actions use large rounded buttons; Secondary actions use ghost/outline variants

---

## Images Section

**Hero Image - Child Interface**:
- **Placement**: App entry/welcome screen
- **Description**: Vibrant illustration of diverse children celebrating around large floating kanji characters in a whimsical sky scene with clouds and stars. Characters should feel accomplished and joyful. Landscape orientation, 1920x1080.
- **Treatment**: Full viewport height on tablet/desktop (h-screen), 60vh on mobile
- **Button Overlay**: "Start Learning!" CTA with backdrop-blur-md background

**Character Mascot**:
- **Description**: Friendly owl or tanuki character wearing a headband with a kanji symbol, holding a brush. Should be cute but not infantilizing, age-appropriate for 6-12 year olds.
- **Usage**: PNG with transparency, positioned absolutely in quiz screens, appears during correct answers

**Parent Dashboard**:
- **No large hero image** - Data-focused layout starts immediately with dashboard grid
- **Ad Section Images**: Publishers provide their own imagery, sized appropriately for card slots

**Quiz Background**:
- **Description**: Subtle pattern of faded kanji characters in grid formation, very low opacity
- **Treatment**: Fixed background, doesn't scroll with content

---

## Advertising Integration (Parent Dashboard)

**Separation Strategy**:
- Visual: Distinct card styling with "Partner Resources" header, subtle border treatment differentiates from dashboard elements
- Spatial: Contained within sidebar section below child stats OR horizontal banner zone
- Interactive: External link indicators, open in new tab behavior

**Ad Specifications**:
- Sidebar Cards: 280x200px slots, max 2 cards stacked
- Banner Slot: Full-width, 728x90 desktop / single card mobile
- Clearly labeled with small "Sponsored" badge
- Professional product imagery appropriate for educational context (books, learning apps, tablets)

---

## Interaction Patterns

**Child Quiz**:
- Swipe gestures for card progression
- Celebratory animations on correct answers (scale bounce, particle effects)
- Gentle wobble on incorrect answers (no harsh red Xs)
- Voice encouragement option (audio feedback)

**Parent Dashboard**:
- Smooth transitions between sections (200ms ease-in-out)
- Hover states show additional data in tooltips
- Filter/sort controls for activity history
- Export report functionality

---

## Accessibility

- Child interface: Minimum font size 18px, high contrast ratios (WCAG AAA where possible)
- Parent interface: Minimum 16px, AAA compliance for data visualization
- Keyboard navigation: Full support, visible focus indicators (ring-4 ring-offset-2)
- Screen reader: Proper ARIA labels on all interactive elements, quiz progress announced
- Touch targets: Minimum 44x44px (child interface 56x56px preferred)