# Rust Workbook

## Overview

Rust Workbook (rustworkbook.com) is an online Rust coding workbook - an interactive web-based learning platform for Rust programming. It provides a browser-based integrated development environment where users can work through 94 original exercises, compile and run Rust code in real-time, and track their progress. The application features a three-panel IDE layout with exercise navigation, a Monaco code editor, and a console output panel for compilation results. Users who complete all exercises receive a special red crab badge displayed next to their name.

### Routes
- `/` - Main IDE interface for coding exercises
- `/ide` - Main IDE interface for coding exercises (alias)

## User Preferences

Preferred communication style: Simple, everyday language.

## Automated Testing

### Three-Layer Test Automation (Replit-Native)

**Layer 1: Development Testing** (`./scripts/watch-tests.sh`)
- Auto-runs tests on file changes during development
- Immediate feedback for developers
- 39 tests covering all critical paths

**Layer 2: Pre-Checkpoint Validation** (`./scripts/pre-checkpoint.sh`)
- Validates all tests pass before creating project snapshots
- Prevents broken checkpoints
- Ensures rollback points are always functional

**Layer 3: Periodic Health Checks** (`./scripts/periodic-tests.sh`)
- Scheduled deployment runs every 2 hours
- Tests database connectivity and Piston API availability
- Full test suite execution with health reporting
- Deployment instructions in DEPLOYMENT_SCHEDULE.md

**Test Infrastructure**: Vitest + Supertest
- 39 automated tests (100% passing)
- API endpoints, authentication, progress tracking, compilation
- Session-based rate limiting tests
- Database constraint validation
- No manual testing required - all tests defined and executed in code

## System Architecture

### Frontend Architecture

**Technology Stack**: React + TypeScript + Vite
- **UI Framework**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state, local React state for UI
- **Routing**: Wouter for lightweight client-side routing
- **Code Editor**: Monaco Editor (VS Code's editor) via `@monaco-editor/react`

**Design System**: Custom VS Code-inspired interface with system font stack, JetBrains Mono for code, and a comprehensive color token system supporting light/dark themes. Layout uses a fixed header with resizable three-column workspace (exercise navigator, editor, console).

**Key Architectural Decisions**:
- **Why Monaco Editor**: Provides production-grade code editing with syntax highlighting, IntelliSense-like features, and familiar VS Code keybindings
- **Why TanStack Query**: Manages server state with automatic caching, background refetching, and optimistic updates without manual state management
- **Why Tailwind + shadcn/ui**: Rapid UI development with consistent design tokens while maintaining flexibility through utility classes

### Backend Architecture

**Technology Stack**: Express.js + Node.js + TypeScript
- **Runtime**: Node.js with ES modules
- **Server Framework**: Express with custom middleware for logging and JSON parsing
- **Build Tool**: esbuild for production bundling, tsx for development
- **Development Server**: Vite dev server in middleware mode for HMR

**API Design**: RESTful endpoints with Zod schema validation
- `GET /api/exercises` - Retrieve all exercises
- `GET /api/exercises/:id` - Get specific exercise
- `GET /api/hint/:id` - Retrieve exercise hint
- `POST /api/compile` - Execute Rust code compilation
- `GET /api/stats` - Public endpoint returning user statistics (totalUsers, monthlyUsers, dailyUsers, topReferrers)
- `GET /api/progress` - Get authenticated user's completed exercises
- `POST /api/progress/:id` - Mark exercise as complete for authenticated user

**Code Execution Strategy**: Server-side Rust compilation using Node.js child_process
- Temporary file creation in OS temp directory with unique identifiers
- Compilation timeout: 30 seconds
- Execution timeout: 10 seconds
- Automatic cleanup of temporary files after execution
- **Security Note**: Currently NOT sandboxed - see Security Considerations section

**Key Architectural Decisions**:
- **Why Express**: Lightweight, well-understood HTTP server with extensive middleware ecosystem
- **Why Server-Side Compilation**: Enables consistent Rust toolchain across all clients without requiring users to install Rust locally
- **Tradeoffs**: Server-side execution introduces security risks (documented in SECURITY.md) but provides better UX than client-side WASM compilation

### Data Storage Solutions

**Exercise Storage**: In-memory storage using Map data structure
- All exercise data is hardcoded in `server/exercises-data.ts`
- **30 exercises** covering chapters 1-22 of the Rustlings curriculum
- Topics: intro, variables, functions, if, primitive_types, vecs, move_semantics, structs, enums, strings, options, error_handling, modules, hashmaps, lifetimes, tests, iterators, threads, smart_pointers, macros, conversions
- No database required for exercise content
- DatabaseStorage class implements IStorage interface with database-backed progress tracking

**Progress Tracking**: PostgreSQL database (per-user)
- User progress stored in `user_progress` table with unique constraint on `(userId, exerciseId)`
- Tracks completed exercises per authenticated user
- Synchronized with client-side display in real-time via TanStack Query
- Last-viewed exercise cached in localStorage for session persistence

**Database Schema**: PostgreSQL with Drizzle ORM
- `users` table: Stores user accounts (id, email, firstName, lastName, profileImageUrl)
- `sessions` table: Stores express-session data for authentication
- `user_progress` table: Tracks completed exercises per user
- Schema defined in `shared/schema.ts`
- Migrations applied via `npm run db:push`

**Key Architectural Decisions**:
- **Why Database**: Enables multi-user progress tracking with authentication
- **Why Per-User Progress**: Each user has independent progress tracking
- **Why Unique Constraint**: Prevents duplicate progress entries for same exercise

### Authentication and Authorization

**Implementation**: Replit Auth (OpenID Connect)
- **Provider**: Replit's built-in authentication service
- **Supported Methods**: Google, GitHub, X (Twitter), Apple, email/password
- **Session Management**: PostgreSQL-backed sessions via `connect-pg-simple`
- **Token Handling**: Automatic token refresh with persistence

**Authentication Flow**:
1. Unauthenticated users land on landing page (/)
2. Click "Get Started" redirects to `/api/login`
3. Replit Auth handles authentication
4. Callback to `/api/callback` creates session
5. User redirected to IDE (/ide)

**Route Protection**:
- `/` (Landing): Accessible to all, redirects authenticated users to `/ide`
- `/ide` (IDE): Protected, redirects unauthenticated users to `/`
- Protected API endpoints: `/api/progress`, `/api/compile` require authentication

**Security Features**:
- HTTPS-only cookies in production
- Session storage in PostgreSQL (not in-memory)
- CSRF protection via session middleware
- Single canonical OIDC strategy (no host header injection)
- Token refresh with automatic persistence
- **Custom Domain Handling**: rustworkbook.com is prioritized as canonical domain
- **Domain Redirect**: Automatic 301 redirect from replit.app domains to rustworkbook.com
- **Session Cookie Configuration**: Domain-scoped cookies for rustworkbook.com with SameSite=lax

**Referrer Tracking**:
- Captures UTM source params (`utm_source`, `ref`) or HTTP Referer header on first visit
- Stored in session, then persisted to user record on signup
- Cleared after successful use to prevent reuse across logins
- Available in `/api/stats` topReferrers for growth analytics

**Key Architectural Decisions**:
- **Why Replit Auth**: Managed authentication with zero setup for users
- **Why OpenID Connect**: Industry-standard protocol with token refresh
- **Why Database Sessions**: Enables session persistence across server restarts
- **Session Cookie Security**: Secure flag only enabled in production (allows local development)
- **Custom Domain Priority**: Ensures users always stay on rustworkbook.com for consistent experience

### Code Validation and Compilation

**Validation Layer**: Zod schemas
- `compileRequestSchema` validates incoming compilation requests
- Type-safe request/response handling through shared schema types
- Runtime validation prevents malformed requests

**Compilation Pipeline**:
1. Request validation via Zod schema
2. Create unique temporary directory
3. Write user code to temporary `.rs` file
4. Execute `rustc` via Node.js `child_process.exec`
5. Capture stdout, stderr, and exit code
6. Return structured `CompilationResult`
7. Clean up temporary files

**Result Parsing**: Console panel parses Rust compiler errors
- Regex-based extraction of error types, messages, and file locations
- Structured error display with syntax highlighting

## External Dependencies

### Third-Party Services

**None Currently Required**: Application runs entirely self-contained
- No external API calls for core functionality
- No analytics or telemetry services
- No CDN dependencies (fonts loaded from Google Fonts CDN in HTML)

### Development and Build Tools

**Replit-Specific**:
- `@replit/vite-plugin-runtime-error-modal` - Development error overlay
- `@replit/vite-plugin-cartographer` - Development tooling
- `@replit/vite-plugin-dev-banner` - Development environment indicator

**Database Tooling**:
- Drizzle Kit for schema migrations
- `@neondatabase/serverless` - Neon Postgres serverless driver (configured but not actively used)

### Required System Dependencies

**Rust Toolchain**: Must be installed on server
- `rustc` compiler must be available in PATH
- Application executes `rustc` directly via shell commands
- No version pinning - uses whatever rustc is installed

**Node.js Runtime**: Required for server execution
- ES modules support required
- Child process execution capabilities

### UI Component Libraries

**shadcn/ui**: Radix UI primitives with custom styling
- 30+ Radix UI component packages for accessible, unstyled primitives
- Custom Tailwind styling layer
- Components include: Dialog, Dropdown Menu, Tabs, Accordion, Toast, Resizable Panels, etc.

**Monaco Editor**: Full VS Code editor in browser
- `@monaco-editor/react` wrapper for React integration
- Provides Rust syntax highlighting, code folding, and editor features

**Icons**: Lucide React for consistent iconography throughout UI

### Potential Production Dependencies (Recommended)

For production deployment, consider adding:
- **Docker**: Container-based isolation for Rust code execution
- **Judge0 or Piston API**: Third-party sandboxed code execution services
- **WebAssembly**: Compile Rust to WASM for client-side execution
- **PostgreSQL Database**: For multi-user progress tracking and authentication