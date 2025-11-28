# Coding Conventions

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand (if needed)

## TypeScript Guidelines
- **Strict Mode**: Always enabled.
- **No `any`**: Avoid `any` type; use `unknown` or specific types.
- **Interfaces vs Types**: Use `interface` for object definitions and `type` for unions/intersections.
- **Props**: Define component props using an interface named `[ComponentName]Props`.

## React Components
- **Functional Components**: Use functional components with hooks.
- **Naming**: PascalCase for component filenames and functions (e.g., `Button.tsx`).
- **Folder Structure**: Colocate related files (test, styles, utils) with the component.
  ```
  components/
  └── Button/
      ├── index.tsx
      ├── Button.tsx
      └── Button.test.tsx
  ```
- **Exports**: Use named exports.

## Tailwind CSS
- **Utility First**: Use utility classes over custom CSS.
- **Ordering**: Follow the recommended class order (layout -> box model -> typography -> visual -> misc). Use `prettier-plugin-tailwindcss`.
- **Customization**: Extend the theme in `tailwind.config.ts` rather than hardcoding magic values.

## File Naming
- **Components**: PascalCase (`MyComponent.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS.ts`)
