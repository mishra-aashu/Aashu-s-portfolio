# Colors and Fonts Used in Portfolio

## Colors

### Custom Hex Color Codes
- `#646cffaa` - Used for logo hover drop-shadow (with alpha transparency)
- `#61dafbaa` - Used for React logo hover drop-shadow (with alpha transparency)
- `#888` - Used for .read-the-docs text color
- `#06b6d4` - Used in favicon gradient (cyan)
- `#8b5cf6` - Used in favicon gradient (purple)

### Tailwind CSS Color Classes Used
The project extensively uses Tailwind's default color palette. Here are the main color families used:

#### Cyan Blues
- `cyan-400`, `cyan-500` - Primary accent colors for buttons, links, and highlights
- `cyan-600` - Background gradients

#### Purples
- `purple-400`, `purple-500`, `purple-600` - Secondary accents and gradients

#### Slate Grays
- `slate-950` - Main background color
- `slate-900` - Card backgrounds
- `slate-800`, `slate-700` - Borders and secondary backgrounds
- `slate-400`, `slate-300`, `slate-200` - Text colors
- `slate-500` - Muted text

#### Other Colors
- `white` - Primary text and icons
- `fuchsia-500` - Gradient accents
- `blue-600` - Button gradients
- `green-400`, `green-500` - Success states
- `red-400`, `red-500` - Error states
- `yellow-400` - Warning states
- `pink-400`, `pink-500` - Accent colors
- `orange` - Git icon
- `yellow` - Three.js icon

### Gradients Used
- `from-cyan-400 to-fuchsia-500` - Logo gradient
- `from-cyan-500 to-blue-600` - Hire Me button
- `from-cyan-400 via-blue-500 to-purple-600` - Hero name gradient
- `from-purple-600/20` - Background blur effects
- `from-cyan-600/20` - Background blur effects

## Fonts

### Font Families
The project uses Tailwind's default font stacks:

- **font-sans** - Default sans-serif font for body text and most UI elements
  - Stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`

- **font-mono** - Monospace font for code-like elements
  - Stack: `ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Fira Code", "Droid Sans Mono", "Source Code Pro", Menlo, Consolas, "Liberation Mono", monospace`
  - Used in: Form inputs, labels, and terminal-style elements

### Font Weights and Sizes

#### Headlines
- **Hero Title**: `text-6xl md:text-9xl font-bold` - Main name display
- **Section Headings**: `text-4xl md:text-5xl font-bold` - About, Skills, Projects, Contact
- **Card Titles**: `text-2xl font-bold` - Project and skill section titles
- **Subheadings**: `text-xl font-bold` - Within sections

#### Body Text
- **Large Body**: `text-lg` - Descriptions and paragraphs
- **Regular Body**: Default size - Most text content
- **Small Text**: `text-sm` - Metadata, labels, and secondary info
- **Extra Small**: `text-xs` - Form labels and timestamps

#### Font Weights Used
- `font-light` - Hero subtitle
- `font-medium` - Buttons and navigation
- `font-semibold` - Emphasized text
- `font-bold` - Headlines and strong emphasis

### Text Styling
- **Tracking**: `tracking-tight`, `tracking-wider` - Letter spacing adjustments
- **Leading**: `leading-relaxed`, `leading-none` - Line height control
- **Case**: `uppercase` - For labels and emphasis