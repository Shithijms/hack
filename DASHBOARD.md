# DataVex Growth Intelligence Engine - Dashboard

## Overview

Production-grade dashboard for the DataVex Growth Intelligence Engine, built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

### 8 Comprehensive Panels

1. **Keyword Input** - Pipeline execution with real-time stage tracking
2. **Signal Intelligence** - Market signals, composite scores, competitor analysis, and gap identification
3. **Strategy Brief** - Chosen angle, positioning thesis, authority scores, and rejected alternatives
4. **Blog Output** - Markdown-rendered content with evolution tracking
5. **LinkedIn Post** - Styled preview with engagement metrics
6. **Twitter Thread** - Multi-tweet thread with individual copy functionality
7. **Quality Trace** - Before/after diffs with score deltas
8. **Export Panel** - Full JSON data export with statistics

## Architecture

### File Structure

```
src/app/
├── types/
│   └── pipeline.ts          # TypeScript interfaces matching backend
├── hooks/
│   └── usePipeline.ts       # API integration & state management
├── components/
│   └── dashboard/
│       ├── Dashboard.tsx           # Main container
│       ├── KeywordInput.tsx        # Panel 1
│       ├── SignalIntelligence.tsx  # Panel 2
│       ├── StrategyBrief.tsx       # Panel 3
│       ├── BlogOutput.tsx          # Panel 4
│       ├── LinkedInPost.tsx        # Panel 5
│       ├── TwitterThread.tsx       # Panel 6
│       ├── QualityTrace.tsx        # Panel 7
│       └── ExportPanel.tsx         # Panel 8
└── App.tsx                  # Entry point with dark theme
```

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Recharts** - Data visualization
- **react-markdown** - Markdown rendering
- **Lucide React** - Icons

## Backend Integration

### API Configuration

- **Base URL**: `http://localhost:8000`
- **Endpoint**: `POST /run-pipeline`
- **Request**: `{ "keyword": string }`
- **Response**: Complete pipeline results (see `types/pipeline.ts`)

### Features

- Client-side data fetching
- Real-time pipeline stage tracking
- Graceful error handling
- Loading states with progress indicators
- No mock data - strict backend integration

## Usage

1. Enter a keyword in the input field
2. Click "Run Pipeline" to start processing
3. Watch real-time progress through 7 stages
4. Review results across all 8 panels
5. Copy content to clipboard or export full JSON

## Theme

Dark theme is enabled by default for optimal viewing experience.

## Components

All components are fully responsive and follow industry-standard design patterns:

- Card-based layouts for clear information hierarchy
- Consistent spacing and typography
- Color-coded badges for quick metric identification
- Interactive elements with proper feedback
- Accessible UI following WCAG guidelines

## Development Notes

- All TypeScript types strictly match backend response structure
- No hardcoded mock data
- Error boundaries for graceful failure handling
- Optimized for performance with proper React patterns
- Responsive design for desktop and tablet viewports
