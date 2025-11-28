# Project Rules

## General
- **No Comments**: Do not add comments to newly generated code unless absolutely necessary for complex logic explanation. The code should be self-documenting.
- **Strict Mode**: TypeScript strict mode must be enabled. No `any` types.

## Tech Stack
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS v4. Use utility classes; avoid custom CSS files.
- **Icons**: Use `react-icons` (Material Design `md` set preferred) instead of CDNs.
- **State**: Use React `useState` and `useEffect` for local state.

## Components
- **Functional**: Use React Functional Components.
- **Naming**: PascalCase for components (`MyComponent.tsx`), camelCase for functions/hooks.
- **Props**: Define explicit interfaces for component props.

## Testing & Quality
- **Linting**: Ensure `npm run lint` passes before finishing a task.
- **Responsiveness**: All UI must be fully responsive (mobile, tablet, desktop).
- **Dark Mode**: Support dark mode using Tailwind's `dark:` variant.

## File Structure
- **Routes**: Place pages in `src/app/`.
- **Components**: Place reusable components in `src/components/`.
- **Tests**: Place feature-specific components in `src/app/tests/[feature]/components/` if they are not shared.