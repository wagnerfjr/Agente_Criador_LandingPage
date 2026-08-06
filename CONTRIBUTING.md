# Contributing to LR Fit Method

Thanks for your interest in contributing! This document provides guidelines for development.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/Agente_Criador_LandingPage.git`
3. Add upstream: `git remote add upstream https://github.com/wagnerfjr/Agente_Criador_LandingPage.git`
4. Install dependencies: `npm install`

## Development Workflow

### Creating a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Before Committing
```bash
# Validate content
npm run validate-content

# Build the project
npm run build

# Run linter
npm run lint

# Run tests (if available)
npm test
```

### Committing Changes
Use atomic commits with clear messages:

```bash
git commit -m "feat: add new landing page section

- Description of what changed
- Why it was changed
- Related issue #123"
```

**Commit types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting (no logic change)
- `refactor:` Code reorganization
- `test:` Test additions
- `chore:` Dependencies, tooling

### Pushing & Creating PR
```bash
git push origin feature/your-feature-name
```

Then open a PR against `master`. Use the PR template provided in `.github/pull_request_template.md`.

## Code Standards

### React Components
- Use functional components with hooks
- Keep components small and focused
- Props should be documented
- Use TypeScript-style JSDoc comments

Example:
```jsx
/**
 * Button component with multiple variants
 * @param {React.ReactNode} children - Button content
 * @param {string} variant - 'primary', 'secondary', 'outline', 'ghost'
 * @param {function} onClick - Click handler
 */
export default function Button({ children, variant = 'primary', onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### CSS
- Use TailwindCSS for styling
- Organize classes logically
- Avoid inline styles

### File Naming
- Components: `PascalCase` (e.g., `Hero.jsx`)
- Utilities: `camelCase` (e.g., `logger.js`)
- Styles: `kebab-case` (e.g., `theme-colors.css`)

## Content Updates

All copy and configuration comes from `lrfit.content.json`. This is the single source of truth.

**Never hardcode strings.** Instead:
1. Add to `lrfit.content.json`
2. Import and use in components
3. Run `npm run validate-content` to check for `PENDENTE` placeholders

## Testing

When adding features:
1. Write tests for utility functions
2. Test components in browser
3. Check performance metrics
4. Verify with different screen sizes

## Documentation

- Update README.md if adding features
- Add inline comments for complex logic
- Document new hooks/utilities
- Update SDD if architecture changes

## Pull Request Guidelines

**Before submitting:**
- Rebase against `master`: `git rebase origin/master`
- Run full validation: `npm run validate-content && npm run build && npm test`
- Ensure no console errors/warnings
- Add screenshots for UI changes

**What gets merged:**
- Passing build/lint/tests
- Clear commit history
- Comprehensive PR description
- At least one approval

## Reporting Issues

Use GitHub Issues with:
- Clear title and description
- Steps to reproduce (bugs)
- Expected vs actual behavior
- Environment (browser, OS, Node version)
- Screenshots/logs if applicable

## Getting Help

- Check existing issues/PRs
- Read the SDD documentation
- Ask in issues with a clear question
- Email: wagnerfjr@gmail.com

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Acknowledge contributions
- Report harassment to wagnerfjr@gmail.com

---

**Questions?** Open an issue or email wagnerfjr@gmail.com

Thank you for contributing! 🙏
