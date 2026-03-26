# Skill Registry

This file contains all available skills and conventions for the project. It is mode-independent infrastructure.

## User-Level Skills

Located in `~/.config/opencode/skills/`:

| Skill | Trigger | Description |
|-------|---------|-------------|
| `go-testing` | Go tests, Bubbletea TUI testing | Go testing patterns for Gentleman.Dots, including Bubbletea TUI testing |
| `sdd-archive` | Archive completed change | Sync delta specs to main specs and archive a completed change |
| `sdd-verify` | Verify implementation | Validate that implementation matches specs, design, and tasks |
| `skill-creator` | Create new AI skills | Creates new AI agent skills following the Agent Skills spec |
| `sdd-propose` | Create proposal | Create a change proposal with intent, scope, and approach |
| `sdd-apply` | Implement tasks | Implement tasks from the change, writing actual code following the specs and design |
| `sdd-spec` | Write specifications | Write specifications with requirements and scenarios (delta specs for changes) |
| `sdd-tasks` | Break down tasks | Break down a change into an implementation task checklist |
| `sdd-design` | Technical design | Create technical design document with architecture decisions and approach |
| `sdd-explore` | Explore ideas | Explore and investigate ideas before committing to a change |
| `sdd-init` | Initialize SDD | Initialize Spec-Driven Development context in any project |

## Project Conventions

| File | Description |
|------|-------------|
| `AGENTS.md` | Agent guidelines and code style for this project |

## Project Context

- **Project**: portfolio
- **Type**: Static website
- **Tech Stack**: HTML5, CSS3, Vanilla JS, Font Awesome (CDN), AOS (CDN)
- **Architecture**: Static site, no build tools, no package manager
- **Testing**: Manual (no automated tests)
- **Linting**: None configured
- **Code Style**:
  - 2 spaces indentation
  - BEM-like CSS naming
  - CSS variables for theming
  - Semantic HTML
  - Accessibility (aria-labels, alt tags)
  - const/let (no var)
  - camelCase for JS, BEM for CSS
