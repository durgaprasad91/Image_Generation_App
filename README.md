# AI Studio Mini

A simplified AI studio web application developed with React and TypeScript, showcasing client-side image processing, mock API interaction with retry mechanisms, local storage persistence, and accessible UI components.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Design Notes](#design-notes)
- [Known Limitations & TODOs](#known-limitations--todos)

## Features

- **Image Upload & Preview**: Upload PNG/JPG files (max 10MB). Client-side downscaling to ≤1920px if images are too large.
- **Prompt & Style Input**: Text input for AI prompts and a dropdown for style selection (Editorial, Streetwear, Vintage).
- **Live Summary**: Real-time preview of selected image, prompt, and style.
- **Generate (Mock API)**: Simulates an AI image generation API call with 1-2s delay, 20% failure rate, exponential backoff retries (max 3 attempts), and abort functionality.
- **History**: Stores the last 5 generated items in local storage, allowing restoration to the main preview.
- **Accessibility**: All interactive components are keyboard navigable, have visible focus states, and include appropriate ARIA attributes.

## Tech Stack

- **Frontend**: React.js (Vite) with TypeScript
- **Styling**: Plain CSS (component-specific `.css` files)
- **State Management**: React Hooks (useState, useCallback, useEffect)
- **Build Tool**: Vite
- **Linting & Formatting**: ESLint, Prettier

## Project Structure

```
. (project root)
├── public/
├── src/
│   ├── assets/
│   ├── components/       # Reusable React components
│   │   ├── GenerateButton.tsx
│   │   ├── HistoryList.tsx
│   │   ├── PromptInput.tsx
│   │   ├── Spinner.tsx
│   │   ├── StyleDropdown.tsx
│   │   ├── SummaryPreview.tsx
│   │   └── Upload.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useImageUpload.ts
│   │   ├── useLocalStorage.ts
│   │   └── useMockApi.ts
│   ├── styles/           # Component-specific CSS files
│   │   ├── App.css
│   │   ├── GenerateButton.css
│   │   ├── HistoryList.css
│   │   ├── PromptInput.css
│   │   ├── Spinner.css
│   │   ├── StyleDropdown.css
│   │   ├── SummaryPreview.css
│   │   └── Upload.css
│   ├── utils/            # Utility functions
│   │   ├── fileUtils.ts
│   │   ├── imageUtils.ts
│   │   ├── retry.ts
│   │   └── types.ts
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── .eslintrc.js
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-link>
    cd <your-repo-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Application

To start the development server:

```bash
npm run dev
```

Open your browser to `http://localhost:5173` (or the address shown in your terminal).

## Testing

(No explicit unit or E2E tests are implemented in this version, as per assignment scope. However, the application has been manually tested for functionality and accessibility.)

## Design Notes

### Code Structure & Modularity

I developed the application following a component-based architecture, organized into `components`, `hooks`, `styles`, and `utils` directories for clear separation of concerns:

-   **`src/App.tsx`**: Serves as the main orchestrator, managing global state and integrating all sub-components and hooks.
-   **`src/components/`**: Houses all reusable UI components, each responsible for a specific part of the interface (e.g., `Upload`, `PromptInput`).
-   **`src/hooks/`**: Contains custom React hooks (`useImageUpload`, `useMockApi`, `useLocalStorage`) that encapsulate complex logic and stateful behavior, promoting reusability and clean component code.
-   **`src/styles/`**: Dedicated to component-specific CSS files, providing a clear and maintainable approach to styling without the overhead of a CSS-in-JS library or a framework like Tailwind CSS. My initial attempts to integrate Tailwind CSS proved challenging due to configuration complexities with PostCSS and Vite, leading me to revert to plain CSS for a more straightforward and robust styling solution.
-   **`src/utils/`**: Contains pure utility functions (`downscaleImage`, `retry`, `fileToDataUrl`) that perform specific tasks independently of React, enhancing testability and reusability.

### Styling Philosophy

My approach to styling evolved from an initial attempt with Tailwind CSS to a focus on plain CSS. Each component now has its dedicated CSS file (`src/styles/*.css`), ensuring styles are modular and easy to manage. A global `App.css` (in `src/App.css`) defines the overall layout, typography, and a consistent color palette using CSS variables for easy theme adjustments.

### Accessibility (A11y)

Accessibility was a key consideration in my development process:

-   **Keyboard Navigation**: All interactive elements (buttons, inputs, dropdowns, history items) are navigable using the `Tab` key.
-   **Focus States**: Custom focus styles (e.g., `outline` with `box-shadow`) are applied to provide clear visual feedback for keyboard users.
-   **ARIA Attributes**: Relevant ARIA attributes (`aria-label`, `role`, `aria-live`) are used to enhance semantic meaning and assist screen readers.

## Known Limitations & TODOs

-   **No Unit/E2E Tests**: Due to the timebox, unit and end-to-end tests were not implemented. This is a critical area for improvement.
-   **Error Boundaries**: Robust error boundaries for UI components could be added to gracefully handle unexpected errors.
-   **PWA Features**: Basic Progressive Web App (PWA) features (manifest, offline caching) are not implemented.
-   **More Styles/Theming**: While plain CSS is used, a more sophisticated theming system could be introduced for easier style management and dark mode support.
-   **API Key Management**: For a real application, API keys and sensitive information would need to be securely managed (e.g., environment variables, backend proxy).
-   **Image Upload UX**: Improve feedback during image processing (e.g., progress bar for downscaling).
-   **History UI**: Enhance the visual presentation and interaction of the history list (e.g., delete history item option).
