# Design Guidelines: Rustlings Web IDE

## Design Approach

**System-Based Approach**: Drawing from VS Code's interface principles and modern IDE patterns. This is a utility-focused productivity tool where efficiency, clarity, and functional density are paramount.

**Key References**: VS Code, Monaco Editor, Linear (for clean data presentation), GitHub (for code-focused UI)

## Core Layout Architecture

### Application Shell Structure
- **Full-viewport layout**: Fixed header (60px height) + main workspace (remaining viewport)
- **Three-column workspace**:
  - Left sidebar: Exercise navigator (280px fixed width, collapsible)
  - Center: Code editor (flexible, min-width: 400px)
  - Right panel: Console output (flexible, min-width: 320px, collapsible)
- **Responsive breakpoint**: Below 1024px, stack vertically (exercise selector → editor → console)

### Header Component
- Logo/brand left (text-based: "Rustlings IDE")
- Exercise title center (truncate with ellipsis)
- Action buttons right: "Run Code", "Show Hint", "Reset", user menu icon
- All items vertically centered with consistent horizontal padding (px-6)

## Typography System

### Font Families
- **Interface text**: System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)
- **Code**: JetBrains Mono or Fira Code via Google Fonts (monospace with ligatures)
- **Headings**: Inter via Google Fonts for exercise titles

### Type Scale
- **Code editor**: 14px base, 1.5 line-height
- **Exercise titles**: 18px semibold
- **Console output**: 13px monospace
- **UI labels**: 12px medium weight
- **Header actions**: 14px medium

## Spacing Primitives

**Tailwind units**: Consistently use 2, 4, 6, 8, 12 for all spacing
- Component padding: p-4 or p-6
- Section gaps: gap-4 or gap-6
- Header/footer: p-6
- Tight spacing (lists): gap-2
- Generous spacing (sections): gap-8 or gap-12

## Component Library

### Exercise Navigator (Left Sidebar)
- **Header section**: "Exercises" title with progress indicator (e.g., "12/84 completed")
- **Search/filter bar**: Input with icon, placeholder "Filter exercises..."
- **Topic groups**: Collapsible accordions for each category (variables, functions, etc.)
- **Exercise items**: 
  - Text label with completion checkbox/indicator
  - Compact layout (h-10 per item)
  - Active state: subtle border-l-4 accent
  - Hover: gentle background shift
- **Bottom action**: "Reset Progress" link

### Code Editor Panel
- **Monaco Editor integration** (full-featured)
- **Toolbar above editor**:
  - File name indicator (read-only display)
  - Line/column position
  - Language indicator: "Rust"
- **Editor chrome**: Minimal borders, focus on code content
- **Footer bar**: Character count, tab size selector

### Console Output Panel
- **Tab system**: "Output" | "Problems" | "Test Results"
- **Output area**:
  - Monospace text preserving formatting
  - Scrollable container (max-height: 100%)
  - Clear visual distinction for errors vs success messages
  - Line numbers for compilation errors
- **Action bar**: Clear console button (icon-only, top-right corner)

### Action Buttons
- **Primary (Run Code)**: Prominent, full button with icon (play symbol from Heroicons)
- **Secondary (Hint, Reset)**: Outline style buttons
- **Icon buttons**: 40px × 40px hit area, centered icons
- **Button groups**: gap-2 between related actions

### Exercise Detail Card (When selected)
- **Header**: Exercise name (text-xl font-semibold) + difficulty badge
- **Description**: Short explanation (text-sm, max-w-prose)
- **Hint section**: Collapsible details element with hint text
- **Metadata footer**: Topic tag, exercise number

### Progress Indicator
- **Overall progress bar**: Thin (h-1) at top of sidebar
- **Completion badges**: Small checkmark icons (Heroicons check-circle)
- **Stats display**: "X of Y completed" in header

## Layout Patterns

### Split Pane Behavior
- **Resizable dividers**: 4px drag handles between panels
- **Collapse triggers**: Double-click divider or dedicated collapse icons
- **Minimum widths**: Enforce minimums to prevent unusable layouts
- **Persistence**: Remember user's preferred layout (localStorage)

### Responsive Adaptations
- **Desktop (≥1024px)**: Three-column layout as described
- **Tablet (768px-1023px)**: Two-column (sidebar collapses to drawer, editor + console side-by-side)
- **Mobile (<768px)**: Single column stack with tab switching between views

## Interactive States

### Focus Management
- **Editor focus**: Subtle container glow (never lose editor context)
- **Active exercise**: Clear visual distinction in navigator
- **Keyboard navigation**: Full keyboard support with visible focus rings

### Feedback Systems
- **Compilation success**: Green checkmark animation in console header
- **Compilation errors**: Red indicator with error count badge
- **Loading states**: Subtle spinner during compilation
- **Empty states**: Helpful prompts ("Select an exercise to begin")

## Accessibility Standards

- **Contrast**: Ensure all text meets WCAG AA (code editor themes pre-validated)
- **Focus indicators**: Visible 2px outlines on all interactive elements
- **ARIA labels**: Proper labeling for icon-only buttons
- **Keyboard shortcuts**: Document and implement (e.g., Cmd/Ctrl+Enter to run)
- **Screen reader**: Announce compilation results in console

## Performance Considerations

- **Code editor**: Load Monaco via CDN, lazy load if needed
- **Exercise data**: Preload exercise metadata, lazy load code content
- **Console output**: Virtualize long output streams (use react-window or similar)
- **Syntax highlighting**: Leverage Monaco's built-in Rust support

## Images

No hero images or marketing imagery needed. This is a pure productivity application focused on code editing functionality.