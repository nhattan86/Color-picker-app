# Color-picker-app: An Advanced Color Picker

A modern, feature-rich color picker built with Next.js, React, and shadcn/ui. This application provides multiple ways to select and manipulate colors, with support for RGB, HSL, and HEX formats.

## Features

- 🎨 Multiple color selection methods:
  - RGB sliders
  - HSL sliders
  - Native color picker
  - Average color from canvas
- 📋 Copy color codes in various formats:
  - HEX
  - RGB
  - HSL
- 🔄 Real-time color preview
- 📱 Responsive design
- 🎯 Precise color control
- 🎭 Modern UI with shadcn/ui components

## Prerequisites

- Node.js 16.8 or later
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nhattan86/Color-picker-app.git
cd color-picker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required shadcn/ui components:
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add input
npx shadcn-ui@latest add slider
```

4. Install additional dependencies:
```bash
npm install lucide-react
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
color-picker/
├── app/
│   ├── components/
│   │   └── ColorPicker.tsx    # Main color picker component
│   ├── layout.tsx
│   └── page.tsx               # Main page component
├── public/
├── styles/
│   └── globals.css            # Global styles
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Usage

The color picker component can be imported and used in any React component:

```tsx
import ColorPicker from './components/ColorPicker'

export default function YourComponent() {
  return <ColorPicker />
}
```

## Customization

### Themes
The application uses Tailwind CSS for styling. You can customize the theme by modifying the `tailwind.config.js` file.

### Components
All components are built using shadcn/ui, which provides a set of accessible and customizable components. You can modify their appearance by adjusting the corresponding component styles.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
