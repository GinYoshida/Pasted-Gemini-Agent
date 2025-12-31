# Kanji Learning Quiz App

## Overview

A kid-friendly Japanese kanji learning application designed for young learners. The app presents image-based kanji quizzes where users identify the correct kanji character from multiple choice options. Features include progress tracking, bilingual support (Japanese/English), confetti celebrations for correct answers, and an admin interface for managing quiz content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for UI state (language preferences)
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth transitions and feedback animations
- **Build Tool**: Vite with custom Replit plugins for development

The frontend follows a pages-based structure with shared components. Key pages include:
- Landing page with language selection and passcode entry
- Game page for quiz gameplay with immediate feedback
- Logs page for viewing learning progress
- Admin page for managing quiz questions

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful API with centralized route definitions in `shared/routes.ts`
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Validation**: Zod schemas with drizzle-zod integration for type-safe database operations

The server uses a storage layer pattern (`server/storage.ts`) that abstracts database operations, making it easier to swap implementations if needed.

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Tables**:
  - `learning_logs`: Tracks quiz completion scores and timestamps
  - `quiz_questions`: Stores kanji questions with bilingual content, options, and image paths

### Key Design Decisions
1. **Shared Types**: Schema definitions in `/shared` directory enable type safety across client and server
2. **Child-Friendly UI**: Extra-rounded corners, soft watercolor color palette, playful fonts (Fredoka, Varela Round, Kosugi Maru)
3. **Bilingual Support**: Language context provider allows switching between Japanese and English throughout the app
4. **Passcode Protection**: Simple numeric passcode (1234) gates access to game and parent/admin areas

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle Kit for schema migrations (`npm run db:push`)

### Frontend Libraries
- `canvas-confetti`: Celebration effects for correct answers
- `framer-motion`: Animation library for UI transitions
- `@tanstack/react-query`: Server state management and caching
- `date-fns`: Date formatting for learning logs
- shadcn/ui components (Radix UI primitives)

### Development Tools
- Replit-specific Vite plugins for dev banners and error overlays
- esbuild for production server bundling