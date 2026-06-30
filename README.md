
# Frontend Intern Challenge — Task Management Dashboard

A Task Management Dashboard built with React 19, Vite, and TypeScript. Authenticates against the ReqRes API and manages tasks sourced from JSONPlaceholder, with full CRUD handled via a local React Query cache (since JSONPlaceholder is read-only).

## Project Setup & Installation

1. Clone the repository and check out the feature branch:

   git clone https://github.com/dixitabaj/Frontend-Intern-task.git
   cd Frontend-Intern-task
   git checkout feature/task-dashboard

2. Install dependencies:

   npm install

3. Copy the environment variable template:

   cp .env.example .env

   The default values point to the public ReqRes and JSONPlaceholder APIs, so no changes are needed to run locally.

4. Start the dev server:

   npm run dev

   Open the printed http://localhost:5173 URL in your browser.

5. Log in using the pre-filled ReqRes test credentials:
   - Email: eve.holt@reqres.in
   - Password: cityslicka

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Type-checks and builds for production |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint across the project |
| `npm run test` | Runs the Vitest unit test suite |
| `npm run test:ui` | Runs Vitest with its interactive UI |

## Folder Structure

src/
├── api/          # Axios instances (authClient, tasksClient) and API call functions
├── assets/       # Static images/icons
├── components/   # Reusable UI components shared across features (e.g. Sidebar)
├── features/     # Feature-specific logic and components, grouped by domain
│   ├── auth/     # Login schema, AuthContext, useLogin hook
│   └── tasks/    # useTasks hook, TaskList, modals (Create/Edit/Detail/Delete)
├── pages/        # Route-level components (LoginPage, DashboardPage, TasksPage)
├── routes/       # React Router setup and ProtectedRoute guard
├── services/     # App-wide service config (React Query client)
├── types/        # Shared TypeScript interfaces and types
├── utils/        # Helper functions (token storage)
└── App.tsx       # Root component wiring providers and routes

This structure separates feature-specific code (`features/`) from route-level code (`pages/`) and shared/reusable code (`components/`, `utils/`), which keeps the codebase scalable as more features are added.

## Libraries Used & Why

| Library | Purpose |
|---|---|
| React 19 + Vite | Required core stack; Vite gives fast dev server startup and HMR |
| TypeScript | Type safety across components, API responses, and form data; avoids `any` |
| Tailwind CSS v4 | Utility-first styling without writing/maintaining separate CSS files |
| React Router DOM | Client-side routing and the ProtectedRoute auth guard pattern |
| Axios | HTTP client with interceptors for attaching the auth token automatically |
| TanStack React Query | Server state caching, loading/error states, and mutation handling — including local-only create/edit/delete since JSONPlaceholder can't persist writes |
| React Hook Form | Performant, minimal re-render form handling for Login/Create/Edit forms |
| Zod | Schema-based validation paired with React Hook Form via @hookform/resolvers |
| React Toastify | Lightweight toast notifications for create/delete feedback |
| Lucide React | Consistent icon set used across the task table and sidebar |
| Vitest + React Testing Library | Unit testing (bonus feature) — fast, Vite-native test runner |

## Features Implemented

- Authentication: Login form with Zod validation, token persisted to localStorage, protected dashboard routes via ProtectedRoute, logout, and automatic redirect to /dashboard after login.
- Task Listing: Fetches tasks from JSONPlaceholder via React Query. Handles loading, error, and empty states. Supports search by title and filtering by All/Completed/Pending. Paginated at 10 items per page.
- Task Details: Clicking a task opens a modal showing Task ID, Title, Status, User ID, plus Description/Due Date/Priority where available.
- Create Task: Modal form (Title, Description, Due Date, Priority) validated with Zod; new tasks are added to the local React Query cache and appear immediately.
- Edit & Delete: Edit modal updates Title/Status/Priority in the local cache instantly. Delete requires confirmation via a modal before removing the task.
- Responsive Design: Sidebar navigation collapses into a mobile slide-in drawer below the sm breakpoint; the task table scrolls horizontally on small screens.
- Bonus — Skeleton Loading States: Animated placeholder rows render while the initial task fetch is in flight, instead of a blank screen.
- Bonus — Unit Testing: Vitest + React Testing Library suite covering login schema validation, TaskList rendering and interaction, and useTasks hook logic (search, filtering, pagination resets, create/delete cache mutations).

## Assumptions Made

- Since JSONPlaceholder's /todos endpoint doesn't include description, dueDate, or priority fields, these are treated as optional on fetched tasks and only get populated once a task is created locally or edited through the Edit modal.
- The ReqRes login endpoint accepts any password for the given test email, so form validation enforces a minimum length (5 characters) rather than attempting to replicate ReqRes's exact backend validation rules.
- Local-only mutations (create/edit/delete) only persist for the current session via the React Query cache; a page refresh resets task state back to whatever JSONPlaceholder returns.
- "Edit Task" per the spec only allows changing Title, Status, and Priority — Description and Due Date are intentionally not editable, matching the feature requirements exactly.

## Future Improvements

Given more time, the following would be the next priorities:

- Dashboard Overview metric cards (Total/Completed/Pending Tasks) on a dedicated /dashboard summary view.
- A Recharts pie or bar chart visualizing the Completed vs. Pending task ratio.
- Debounced search input to reduce re-renders while typing.
- Persisting local task mutations to localStorage so they survive page refreshes within a session.
- Expanding test coverage to the CRUD modals (CreateTaskModal, EditTaskModal, DeleteConfirmModal) and the AuthContext/useLogin flow.
- Dark mode support via a Tailwind class-based theme toggle.
