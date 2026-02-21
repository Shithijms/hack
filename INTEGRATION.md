# DataVex Integration Guide

## Quick Start

1. **Start the Backend**
   ```bash
   # Ensure your FastAPI backend is running
   uvicorn main:app --reload --port 8000
   ```

2. **Start the Dashboard**
   ```bash
   # The frontend will be available at the configured port
   npm run dev
   ```

3. **Test the Integration**
   - Enter a keyword (e.g., "AI automation tools")
   - Click "Run Pipeline"
   - Watch the progress through 7 stages
   - Review results in all 8 panels

## API Contract

### Request Format

```json
POST http://localhost:8000/run-pipeline
Content-Type: application/json

{
  "keyword": "your keyword here"
}
```

### Expected Response Structure

The dashboard expects the following JSON structure from your backend:

```typescript
{
  raw_signals: Array<{
    keyword: string;
    search_volume?: number;
    competition?: string;
    trend?: string;
    // ... other fields
  }>;
  
  scored_signals: Array<{
    keyword: string;
    composite_score: number;
    volume_score?: number;
    trend_score?: number;
    competition_score?: number;
    // ... other fields
  }>;
  
  selected_signal: {
    keyword: string;
    composite_score: number;
    rationale?: string;
    // ... other fields
  };
  
  competitor_angles: Array<{
    angle: string;
    competitor?: string;
    strength?: number;
    description?: string;
    // ... other fields
  }>;
  
  identified_gaps: Array<{
    gap: string;
    opportunity_score?: number;
    description?: string;
    addressable?: boolean;
    // ... other fields
  }>;
  
  strategy_brief: {
    chosen_angle: string;
    rejected_angles: string[];
    core_positioning_thesis: string;
    authority_score: number;
    target_audience?: string;
    key_differentiators?: string[];
    // ... other fields
  };
  
  blog_final: string; // Markdown format supported
  
  blog_evolution: Array<{
    version: number;
    score: number;
    improvements?: string;
    timestamp?: string;
    // ... other fields
  }>;
  
  linkedin: {
    final_draft: string;
    scores: {
      engagement_score?: number;
      clarity_score?: number;
      authenticity_score?: number;
      overall_score?: number;
      // ... other fields
    };
  };
  
  twitter: {
    tweets: Array<{
      tweet_number: number;
      content: string;
      character_count?: number;
      // ... other fields
    }>;
    scores: {
      coherence_score?: number;
      engagement_potential?: number;
      thread_flow_score?: number;
      overall_score?: number;
      // ... other fields
    };
  };
}
```

## Configuration

### Changing the Backend URL

Edit `/src/app/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://your-backend:port',
  ENDPOINTS: {
    RUN_PIPELINE: '/run-pipeline',
  },
  TIMEOUT: 120000,
} as const;
```

### Adjusting Stage Duration

For faster/slower UI feedback, modify `STAGE_DURATION` in `/src/app/config/api.ts`:

```typescript
export const PIPELINE_CONFIG = {
  STAGE_DURATION: 800, // milliseconds per stage
} as const;
```

## CORS Configuration

Your FastAPI backend must allow CORS requests from the frontend. Add this to your FastAPI app:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Features

### Copy to Clipboard
- Blog post: Single click to copy entire markdown content
- LinkedIn post: Copy formatted post text
- Twitter thread: Copy individual tweets or entire thread

### Data Export
- Download complete pipeline results as JSON
- Filename includes keyword and timestamp
- Formatted JSON with 2-space indentation

### Real-time Progress
- 7 pipeline stages with visual progress bar
- Stage-by-stage feedback during processing
- Parallel API call and UI simulation

### Error Handling
- Network errors display helpful messages
- Backend errors show status codes
- Automatic retry guidance for connection issues

## Responsive Design

The dashboard is fully responsive:
- **Desktop (>1024px)**: Full grid layout with all panels visible
- **Tablet (768px-1024px)**: Adjusted grid with stacked panels
- **Mobile (<768px)**: Single column layout

## Theme

Dark theme is enabled by default. All components use CSS variables from `/src/styles/theme.css` for consistent theming.

## TypeScript Types

All types are defined in `/src/app/types/pipeline.ts` and strictly match your backend response schema. The dashboard uses these types for full type safety.

## Troubleshooting

### "Failed to connect to backend"
- Ensure FastAPI is running on port 8000
- Check CORS configuration
- Verify network connectivity

### "API Error (4xx/5xx)"
- Check backend logs for detailed error messages
- Verify request payload structure
- Ensure all required fields are present

### Charts not displaying
- Verify `scored_signals` array has valid numeric scores
- Check `blog_evolution` contains valid score data
- Ensure browser supports SVG rendering

### Copy to clipboard fails
- Enable clipboard permissions in browser
- Use HTTPS in production (required for clipboard API)
- Check browser console for detailed errors

## Production Checklist

- [ ] Update `API_CONFIG.BASE_URL` to production backend
- [ ] Configure CORS to allow only your domain
- [ ] Enable HTTPS for clipboard functionality
- [ ] Test with real backend data
- [ ] Verify all 8 panels render correctly
- [ ] Test on multiple browsers and devices
- [ ] Set up error logging/monitoring
- [ ] Configure appropriate API timeouts

## Support

For issues or questions about the dashboard implementation, refer to:
- `/DASHBOARD.md` - Architecture and component overview
- `/src/app/types/pipeline.ts` - Complete TypeScript definitions
- Backend API documentation
