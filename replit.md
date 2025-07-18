# Shared Services Management Application

## Overview

This is a full-stack web application built for managing custodial services operations. The application uses a modern tech stack with React frontend, Express backend, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds
- **Component Structure**: Modular component architecture with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reload with tsx

### Build and Deployment Strategy
- **Development**: Concurrent frontend (Vite) and backend (tsx) servers
- **Production**: Backend bundled with esbuild, frontend built with Vite
- **Static Assets**: Served from dist/public directory

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Schema Location**: `shared/schema.ts` using Drizzle ORM
- **Migrations**: Managed through Drizzle Kit in `migrations/` directory

### API Structure
- **Base Path**: All API routes prefixed with `/api`
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **Error Handling**: Centralized error middleware with status code mapping

### Frontend Features
- **Navigation**: Simple two-page application with Home and Custodial sections
- **UI Components**: Complete Shadcn/UI component library
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation

### Authentication System
- **Storage**: PostgreSQL database with DatabaseStorage implementation
- **Session Management**: Express sessions with PostgreSQL backend
- **User Schema**: Username/password with Drizzle Zod validation

### Inspection System
- **Database Schema**: PostgreSQL tables for inspections with 11 rating categories
- **API Endpoints**: RESTful API for creating and retrieving inspections
- **Rating System**: 1-5 star rating system based on custodial criteria
- **Form Validation**: Zod schema validation for inspection data

## Data Flow

1. **Client Requests**: React frontend makes API calls through TanStack Query
2. **API Processing**: Express server handles requests with route-based middleware
3. **Data Access**: Storage interface abstracts database operations
4. **Response**: JSON responses with error handling and logging
5. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **react-hook-form**: Form state management and validation

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **Drizzle Kit**: Database migration and schema management

### UI Framework
- **Shadcn/UI**: Pre-built components with Tailwind CSS
- **Class Variance Authority**: Component variant management
- **Lucide React**: Icon library for UI components

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR on client directory
- **Backend**: tsx for TypeScript execution with hot reload
- **Database**: Drizzle migrations with push command for schema sync

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server to `dist/index.js`
- **Static Serving**: Express serves built frontend from dist/public
- **Environment**: NODE_ENV=production with optimized builds

### Database Configuration
- **Connection**: DATABASE_URL environment variable required
- **Migrations**: Automatic schema push via `npm run db:push`
- **Dialect**: PostgreSQL with Neon serverless compatibility
- **Session Store**: PostgreSQL-backed session storage for production

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared directories for code organization
2. **Type Safety**: End-to-end TypeScript with shared schema definitions
3. **Component Library**: Shadcn/UI for consistent design system and rapid development
4. **Database Strategy**: Drizzle ORM chosen for type safety and PostgreSQL compatibility
5. **State Management**: TanStack Query for server state, avoiding complex client state management
6. **Build Strategy**: Separate bundling for frontend and backend with optimized production builds

## Recent Changes

**January 17, 2025**
- Added PostgreSQL database support with Drizzle ORM
- Implemented custodial inspection system with comprehensive rating criteria
- Created DatabaseStorage class replacing in-memory storage  
- Added inspection API endpoints (/api/inspections)
- Built interactive star rating system for facility assessments
- Integrated inspection form with backend database storage
- Converted application to Progressive Web App (PWA) with manifest.json and service worker
- Updated color scheme throughout app to match retro propaganda poster aesthetics
- Added mobile installation instructions on home page for iOS and Android devices
- Created custom PWA icons in retro theme colors matching the application design
- Simplified application to focus only on Home and Custodial sections, removing all other service departments
- Added support for two types of inspections: single room and whole building with conditional form fields and validation
- Implemented room verification system for whole building inspections requiring specific room types (Cafeteria, Athletic & Bleachers, at least 1 restroom, at least 3 classrooms, 3 office/admin areas, hallways, minimum 2 stairwells)