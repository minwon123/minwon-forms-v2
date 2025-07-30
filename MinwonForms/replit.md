# 가족관계 민원서식 작성 안내 시스템

## Overview

This is a modern kiosk application designed for Korean government offices, specifically focused on providing an electronic whiteboard interface for family registration document guidance. The application displays real government form examples and provides printing functionality for citizen assistance. The application features a React frontend with Express.js backend, utilizing modern UI components optimized for touch screen interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **React Application**: Built with TypeScript and modern React patterns
- **Component Library**: Shadcn/ui provides consistent, accessible UI components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: TanStack Query for API state, React hooks for local state

### Backend Architecture
- **Express.js Server**: RESTful API with TypeScript
- **Database Layer**: Drizzle ORM for type-safe database operations
- **Storage Interface**: Abstracted storage layer with in-memory implementation (ready for PostgreSQL)
- **Development**: Hot reload with tsx, production build with esbuild

### Database Schema
- **Users Table**: Basic user management with id, username, and password fields
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Migration Support**: Drizzle Kit for database migrations

### UI/UX Design
- **Kiosk Interface**: Large, touch-friendly form cards for government services
- **Government Forms**: Birth registration, death registration, marriage registration, etc.
- **Accessibility**: Government-compliant color scheme and accessibility features
- **Idle Timer**: Auto-reset functionality for kiosk environments
- **Instruction Modals**: Print-friendly instruction displays

## Data Flow

1. **Frontend Requests**: React components use TanStack Query to make API calls
2. **API Layer**: Express.js routes handle requests and validate data
3. **Storage Layer**: Abstracted storage interface allows switching between implementations
4. **Database Operations**: Drizzle ORM provides type-safe database interactions
5. **Response Handling**: Frontend components update based on API responses

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives via Shadcn/ui
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Form Handling**: React Hook Form with Zod validation
- **Carousel**: Embla Carousel for image displays

### Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Validation**: Zod for runtime type checking
- **ORM**: Drizzle ORM with PostgreSQL dialect

### Development Tools
- **Build**: Vite for frontend, esbuild for backend
- **Development**: tsx for TypeScript execution
- **Replit Integration**: Cartographer and runtime error overlay for Replit environment

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with auto-restart on changes
- **Database**: Environment variable-based configuration

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Deployment**: Single Node.js process serving both API and static files

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Development Mode**: Automatic detection with appropriate tooling
- **Replit Integration**: Special handling for Replit environment features

The application is designed to be easily deployable on various platforms while maintaining development-friendly features like hot reload and error handling.