# AGENT GUIDELINES

This document outlines the technical stack, development practices, and style guidelines for agents operating within this repository. Adhering to these guidelines ensures consistency, maintainability, and efficient collaboration.

---

## 1. Project Overview

This project is a static portfolio website built with fundamental web technologies. It does not employ a complex build pipeline, package manager, or front-end frameworks.

**Tech Stack:**
*   **HTML5:** Semantic markup for content structure.
*   **CSS3:** Custom styling, including a responsive design and theme switching (light/dark mode) using CSS variables.
*   **JavaScript (Vanilla JS):** Client-side interactivity, DOM manipulation, and feature implementation (e.g., language toggle, theme toggle, mobile menu, animations).
*   **Font Awesome:** Icon library loaded via CDN.
*   **AOS (Animate On Scroll):** Animation library loaded via CDN.

---

## 2. Build, Lint, and Test Commands

Given the nature of this static site, there are no formal build processes, linters, or automated testing frameworks configured.

*   **Build:**
    *   There is no explicit build command. The project files (HTML, CSS, JS, assets) are deployed as-is.
    *   Changes made to source files are immediately reflected upon refreshing the browser.

*   **Lint:**
    *   No linter configuration (e.g., ESLint, Stylelint) is present.
    *   Agents are expected to adhere to general best practices for clean, readable, and idiomatic HTML, CSS, and JavaScript. This includes consistent indentation, appropriate naming conventions, and avoiding common anti-patterns.

*   **Test:**
    *   There are no automated tests (e.g., unit tests, integration tests).
    *   **To test changes:**
        1.  Open the `index.html` file in a web browser.
        2.  Manually navigate through the site and interact with features relevant to the changes made.
        3.  Visually inspect the UI and confirm functionality.
        4.  Check the browser's developer console for any JavaScript errors.
    *   For any new features or bug fixes, a thorough manual review in the browser is crucial.

---

## 3. Code Style Guidelines

Maintain consistency with the existing codebase's style and structure.

### 3.1. General Principles

*   **Readability:** Prioritize clear, self-documenting code.
*   **Consistency:** Follow existing patterns for formatting, naming, and structure.
*   **Simplicity:** Prefer straightforward solutions over overly complex ones.

### 3.2. HTML Guidelines

*   **Semantic HTML:** Use appropriate HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, etc.) to structure content.
*   **Indentation:** Use **2 spaces** for indentation.
*   **Attributes:** All attribute values should be enclosed in **double quotes** (`"`).
*   **Comments:** Use HTML comments `<!-- Your comment here -->` for major sections or to explain complex structures.
*   **Accessibility (A11y):**
    *   Ensure all interactive elements have appropriate `aria-label` attributes or visible text.
    *   Use correct heading structures (`<h1>` to `<h6>`).
    *   Provide `alt` attributes for all `<img>` tags.

### 3.3. CSS Guidelines

*   **Naming Conventions:**
    *   Prefer **BEM-like** (Block__Element--Modifier) or highly descriptive class names (e.g., `.header-content`, `.nav-link`, `.project-card`).
    *   Avoid generic class names that lack context.
*   **Units:**
    *   Use `rem` for font sizes, line heights, and most spacing (margins, paddings) to maintain scalability.
    *   `px` can be used for borders, box shadows, and specific small fixed dimensions.
*   **CSS Variables:**
    *   Extensively use CSS Custom Properties (`--variable-name`) for colors, spacing, and other design tokens, especially for theme management.
    *   Define global variables within the `:root` selector.
*   **Indentation:** Use **2 spaces** for indentation.
*   **Declaration Order:** Group related properties (e.g., layout, box model, typography, color, other).
*   **Comments:** Use multi-line comments `/* Your comment here */` for sectioning styles and explaining complex rules.
*   **Specificity:** Be mindful of CSS specificity. Aim for lower specificity where possible to make overrides easier.
*   **Responsiveness:** Implement responsive design using media queries (`@media screen and (max-width: ...)`) to ensure optimal viewing across devices.

### 3.4. JavaScript Guidelines

*   **Naming Conventions:**
    *   Use `camelCase` for variables, functions, and object properties (e.g., `myVariable`, `calculateTotal`, `fetchData`).
    *   Use `PascalCase` for constructor functions or classes (if introduced).
*   **Variable Declaration:**
    *   Prefer `const` for variables whose values do not change after assignment.
    *   Use `let` for variables that will be reassigned.
    *   Avoid `var`.
*   **Semicolons:** Use semicolons at the end of each statement.
*   **Indentation:** Use **2 spaces** for indentation.
*   **Comments:**
    *   Use single-line comments `// Your comment here` for short explanations.
    *   Use multi-line comments `/* Your comment here */` for more extensive explanations or temporary disabling of code.
*   **DOM Manipulation:**
    *   Access DOM elements using `document.getElementById()`, `document.querySelector()`, and `document.querySelectorAll()`.
    *   Manipulate element classes using `classList.add()`, `classList.remove()`, and `classList.toggle()`.
*   **Event Handling:**
    *   Attach event listeners using `addEventListener()`.
    *   Initialize DOM-related JavaScript after the `DOMContentLoaded` event fires.
*   **Error Handling:**
    *   No formal error handling (e.g., `try...catch` blocks) is currently implemented.
    *   For new or critical functionality, consider adding basic error checking and console logging to aid debugging. User-facing error messages are not currently a pattern, but could be introduced for significant issues.
*   **Imports/Modules:**
    *   This project uses vanilla JavaScript without a module system. All scripts are loaded globally via `<script>` tags in `index.html`.
    *   Avoid introducing complex module patterns unless explicitly requested.
*   **Global Variables:** Minimize the use of global variables. Encapsulate logic within functions or the `DOMContentLoaded` listener.

---

## 4. Cursor/Copilot Rules

No specific `.cursor/rules/` or `.github/copilot-instructions.md` files were found in this repository. Agents should defer to the general coding guidelines provided above.
