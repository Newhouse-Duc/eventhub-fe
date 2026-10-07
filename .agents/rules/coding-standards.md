---
name: Frontend Coding Standards
description: Enforce Prettier formatting rules and Next.js standards for AI code generation
---

# Frontend Coding Standards

Whenever you write or modify code in this frontend repository, you **MUST** strictly adhere to the following formatting and styling rules to ensure consistency with the existing codebase and `.prettierrc`:

1. **Quotes**: Always use double quotes (`"`) for strings and JSX attributes (as defined by `"singleQuote": false`).
2. **Semicolons**: Always terminate statements with a semicolon (`;`).
3. **Indentation**: Use 2 spaces for indentation.
4. **Trailing Commas**: Use ES5 trailing commas in objects and arrays (`"trailingComma": "es5"`).
5. **Print Width**: Attempt to keep line length under 100 characters.
6. **TailwindCSS**: Sort Tailwind classes automatically (align with `prettier-plugin-tailwindcss`).
8. **Imports**: Group third-party imports first, then internal alias imports (`@/...`), then relative imports.

## Clean Code & Architecture Consistency (Lean Code)
1. **Consistency**: NEVER introduce a new coding style if a pattern already exists. Follow the exact naming conventions, error handling, and folder structures already present.
2. **Lean Code**: Do not write redundant logic, unused variables, or "garbage code". Keep functions small and focused on a single responsibility (SRP).
3. **No Hacks**: If a workaround is needed, reconsider the design. Avoid patching things up just to make them work.
4. **State Management**: Consistently use Redux Toolkit (RTK Query) for API calls. Do not mix `fetch`/`axios` with RTK Query.
