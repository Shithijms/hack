# DataVex Growth Intelligence Engine - Complete Dashboard

## 🚀 Overview

A production-ready, enterprise-grade dashboard for the DataVex Growth Intelligence Engine. Built with React, TypeScript, and modern best practices to provide a comprehensive view of your content strategy pipeline.

## ✨ Key Features

### 🎯 8 Comprehensive Panels

1. **Keyword Input** - Run pipeline with real-time stage tracking
2. **Signal Intelligence** - Market signals with composite score visualization
3. **Strategy Brief** - Content strategy with authority scoring
4. **Blog Output** - Markdown-rendered content with evolution tracking
5. **LinkedIn Post** - Professional post preview with engagement metrics
6. **Twitter Thread** - Multi-tweet thread with copy functionality
7. **Quality Trace** - Before/after analysis with score deltas
8. **Export Panel** - Complete JSON data export

### 🎨 Design Features

- **Dark Theme by Default** - Optimized for extended viewing sessions
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Industry-Standard Layout** - Card-based design with clear hierarchy
- **Real-time Feedback** - Progress tracking through 7 pipeline stages
- **Interactive Charts** - Powered by Recharts for data visualization
- **Toast Notifications** - User-friendly feedback for actions
- **Copy to Clipboard** - One-click content copying throughout

### 🔧 Technical Highlights

- **TypeScript** - Full type safety matching backend schema
- **No Mock Data** - Strict backend integration
- **Error Handling** - Graceful degradation with helpful messages
- **API Configuration** - Centralized config for easy deployment
- **Responsive Grid** - Adaptive layout for all screen sizes
- **Performance Optimized** - Efficient rendering and state management

## 📦 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Recharts** - Beautiful, responsive charts
- **react-markdown** - Markdown rendering
- **Lucide Icons** - Consistent iconography
- **Sonner** - Toast notifications

## 🏗️ Architecture

```
src/app/
├── config/
│   └── api.ts                    # API configuration
├── types/
│   └── pipeline.ts               # TypeScript definitions
├── hooks/
│   └── usePipeline.ts            # API integration hook
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.tsx         # Main container
│   │   ├── KeywordInput.tsx      # Panel 1
│   │   ├── SignalIntelligence.tsx # Panel 2
│   │   ├── StrategyBrief.tsx     # Panel 3
│   │   ├── BlogOutput.tsx        # Panel 4
│   │   ├── LinkedInPost.tsx      # Panel 5
│   │   ├── TwitterThread.tsx     # Panel 6
│   │   ├── QualityTrace.tsx      # Panel 7
│   │   ├── ExportPanel.tsx       # Panel 8
│   │   └── DashboardSkeleton.tsx # Loading state
│   └── ui/                       # shadcn/ui components
└── App.tsx                       # Entry point
```

## 🔌 Backend Integration

### API Endpoint
```
POST http://localhost:8000/run-pipeline
Content-Type: application/json

{
  "keyword": "your keyword here"
}
```

### Response Structure
See `/src/app/types/pipeline.ts` for complete TypeScript definitions that match your backend response.

## 🚦 Getting Started

1. **Ensure Backend is Running**
   ```bash
   # Your FastAPI backend should be available at
   http://localhost:8000
   ```

2. **Configure CORS** (in your FastAPI app)
   ```python
   from fastapi.middleware.cors import CORSMiddleware
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

3. **Run the Dashboard**
   - The dashboard will automatically connect to your backend
   - Enter a keyword and click "Run Pipeline"
   - View results across all 8 panels

## ⚙️ Configuration

Edit `/src/app/config/api.ts` to change backend URL or stage duration:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    RUN_PIPELINE: '/run-pipeline',
  },
  TIMEOUT: 120000,
} as const;
```

## 📱 Responsive Breakpoints

- **Desktop** (≥1024px): Full grid layout with all panels visible
- **Tablet** (768px-1024px): Adjusted grid with optimized spacing  
- **Mobile** (<768px): Single column, stack layout

## 🎨 Dark Theme

The dashboard uses dark theme by default. All colors are defined in `/src/styles/theme.css` using CSS custom properties for easy theming.

## 📋 Features by Panel

### Panel 1: Keyword Input
- Text input for keyword entry
- "Run Pipeline" button
- 7-stage progress indicator
- Visual progress bar with percentages
- Reset functionality

### Panel 2: Signal Intelligence
- Selected signal highlight card
- Composite score bar chart (top 8 signals)
- Competitor angles list with strengths
- Identified market gaps with opportunity scores

### Panel 3: Strategy Brief
- Prominent authority score badge (color-coded)
- Chosen angle in highlighted card
- Core positioning thesis
- Rejected angles in accordion
- Target audience and differentiators

### Panel 4: Blog Output
- Draft evolution score line chart
- Full markdown rendering with custom styles
- Copy to clipboard button
- Responsive typography

### Panel 5: LinkedIn Post
- Mock LinkedIn UI preview
- Score badges (engagement, clarity, authenticity)
- Formatted post content
- Copy button with toast notification

### Panel 6: Twitter Thread
- Individual tweet cards with thread indicators
- Tweet counter badges
- Character count per tweet
- Copy individual tweets or entire thread
- Score metrics (coherence, engagement, flow)

### Panel 7: Quality Trace
- Version-by-version evolution
- Score deltas with up/down indicators
- Before/after comparisons
- Improvements summary
- Total improvement calculation

### Panel 8: Export Panel
- Pipeline statistics overview
- Download full JSON with timestamp
- File size estimation
- One-click export

## 🔍 Error Handling

- **Network Errors**: Clear message with backend URL reminder
- **API Errors**: Status code and detailed error message
- **Validation Errors**: Input validation with user feedback
- **Loading States**: Progress indicators and stage tracking

## 📚 Documentation

- `/DASHBOARD.md` - Architecture and component details
- `/INTEGRATION.md` - Integration guide with examples
- `/src/app/types/pipeline.ts` - Complete type definitions

## 🎯 Production Checklist

- [ ] Update backend URL in config
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS (required for clipboard API)
- [ ] Test with production data
- [ ] Verify all panels render correctly
- [ ] Test responsive layouts
- [ ] Set up error monitoring
- [ ] Configure appropriate timeouts

## 💡 Best Practices Implemented

- **Type Safety**: Full TypeScript coverage
- **Component Composition**: Modular, reusable components
- **State Management**: Custom hooks for clean separation
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized re-renders with useCallback
- **Accessibility**: ARIA labels and keyboard navigation
- **Responsive Design**: Mobile-first approach
- **Code Quality**: Consistent naming and structure

## 🤝 Contributing

This dashboard is designed to work seamlessly with your FastAPI backend without modification. If you need to extend functionality:

1. Add new TypeScript types in `/src/app/types/pipeline.ts`
2. Create new components in `/src/app/components/dashboard/`
3. Update the main `Dashboard.tsx` to include new panels
4. Maintain strict type safety throughout

## 📞 Support

For questions or issues:
- Review the integration guide: `/INTEGRATION.md`
- Check TypeScript definitions: `/src/app/types/pipeline.ts`
- Verify backend response structure matches types
- Check browser console for detailed error messages

---

**Built with ❤️ for the DataVex Growth Intelligence Engine**
