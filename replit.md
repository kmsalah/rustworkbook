# Rustlings Web IDE

## Overview

Rustlings Web IDE is an interactive web-based learning platform for Rust programming. It provides a browser-based integrated development environment where users can work through Rustlings exercises, compile and run Rust code in real-time, and track their progress. The application features a three-panel IDE layout with exercise navigation, a Monaco code editor, and a console output panel for compilation results.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- No database required for exercise content
- MemStorage class implements IStorage interface for potential future database migration

**Progress Tracking**: Browser localStorage
- Progress data (completed exercises, current exercise) stored client-side
- Persists across page refreshes
- No user authentication or server-side progress tracking

**Database Configuration**: PostgreSQL schema defined with Drizzle ORM
- Schema defined in `shared/schema.ts`
- Drizzle configuration points to PostgreSQL via `DATABASE_URL` environment variable
- **Current Status**: Database not actively used; schema exists for future features like user accounts or server-side progress tracking

**Key Architectural Decisions**:
- **Why No Database**: Simplifies deployment and reduces infrastructure requirements for basic learning tool
- **Why localStorage for Progress**: Enables progress tracking without authentication overhead
- **Future Consideration**: Database schema exists for migration path when multi-user or cloud sync features are needed

### Authentication and Authorization

**Current Implementation**: No authentication system
- Application operates in single-user mode
- No user accounts, login, or session management
- Progress tracking is purely client-side

**Security Model**: Trust-based
- Assumes trusted users in controlled environments
- Code execution happens server-side without user isolation
- See SECURITY.md for deployment constraints

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