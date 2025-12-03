# Nightborn Todo App

A modern, mini full-stack todo application built with Next.js, React Query, and Tailwind CSS.
### Author: David Alli-Smith

## Features

- **Add tasks**: Users can add new tasks to their list
- **Mark as completed**: Tasks can be marked as completed by checking a box
- **Delete tasks**: Tasks can be removed from the list
- **Edit tasks**: Users can edit existing tasks
- **Statistics**: The application displays the number of completed tasks and the percentage of completion

## Setup Instructions

1. Clone this repository

2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Assumptions & Decisions

- **In-Memory Storage**: Data is stored in memory (no database) - data resets on server restart
- **Modern UI**: Glassmorphism design with dark theme and animated backgrounds
- **Component Architecture**: Reusable components for loading, errors, and UI patterns
- **Client-Side Routing**: Uses Next.js App Router with client components for interactivity
- **React Query**: Used for data fetching, caching, and state management
- **TypeScript**: Full type safety throughout the application.

## Architecture Overview

### The Three-Layer Architecture

```
┌─────────────────────────────────────┐
│         UI Layer (Pages)            │
│  - User interactions                │
│  - React Query hooks                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      API Client Layer               │
│  - Type-safe functions              │
│  - Error handling                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Backend API Layer              │
│  - HTTP endpoints                   │
│  - Validation                       │
│  - Business logic                   │
└─────────────────────────────────────┘
```


## Future Improvements

- **Persistence**: Add database (PostgreSQL/MongoDB) or localStorage for data persistence
- **Authentication**: User accounts and multi-user todo lists
- **Enhanced Features**:
  - Todo categories and tags
  - Advanced sorting (by title, date, status)
  - Search and filter functionality

