# Documentation Standards

## README.md
Every major directory and package should have a `README.md` explaining:
- **Purpose**: What does this module/component do?
- **Usage**: How to use it (code examples).
- **Props/API**: Detailed list of inputs and outputs.

## Code Comments
- **Why, not What**: Explain *why* a complex piece of logic exists, not just what the code is doing.
- **JSDoc**: Use JSDoc for all exported functions and components.
  ```typescript
  /**
   * Calculates the total price including tax.
   * @param price - The base price.
   * @param taxRate - The tax rate as a decimal (e.g., 0.1 for 10%).
   * @returns The total price.
   */
  export const calculateTotal = (price: number, taxRate: number): number => { ... }
  ```

## Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example: `feat(auth): implement login with google`
