/**
 * API Configuration
 * 
 * Central configuration for backend API integration
 */

export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    RUN_PIPELINE: '/run-pipeline',
    EDIT_BLOGPOST: '/edit-blogpost',
  },
  TIMEOUT: 120000, // 2 minutes
} as const;

export const PIPELINE_CONFIG = {
  STAGE_DURATION: 800, // ms per stage for UI feedback
} as const;
