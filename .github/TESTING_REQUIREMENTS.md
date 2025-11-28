# Testing Requirements

## Frameworks
- **Unit/Component Testing**: Vitest + React Testing Library
- **E2E Testing**: Playwright

## Coverage Goals
- **Statements**: 80%
- **Branches**: 70%
- **Functions**: 80%
- **Lines**: 80%

## What to Test
- **Utilities**: Unit test all utility functions, especially edge cases.
- **Components**:
  - Test rendering with different props.
  - Test user interactions (clicks, inputs).
  - Test conditional rendering logic.
  - **Do not** test implementation details or third-party libraries.
- **Pages**: Use E2E tests to verify critical user flows (e.g., "User can complete a Display Test").

## Test File Location
- Colocate tests with the source file: `MyComponent.test.tsx` next to `MyComponent.tsx`.

## Naming
- Describe the behavior being tested.
  ```typescript
  it('should call onSubmit when the form is valid', () => { ... })
  ```
