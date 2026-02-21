// TypeScript types matching FastAPI backend response

export interface RawSignal {
  keyword: string;
  search_volume?: number;
  competition?: string;
  trend?: string;
  [key: string]: any;
}

export interface ScoredSignal {
  keyword: string;
  composite_score: number;
  volume_score?: number;
  trend_score?: number;
  competition_score?: number;
  [key: string]: any;
}

export interface SelectedSignal {
  keyword: string;
  composite_score: number;
  rationale?: string;
  [key: string]: any;
}

export interface CompetitorAngle {
  angle: string;
  competitor?: string;
  strength?: number;
  description?: string;
  [key: string]: any;
}

export interface IdentifiedGap {
  gap: string;
  opportunity_score?: number;
  description?: string;
  addressable?: boolean;
  [key: string]: any;
}

export interface StrategyBrief {
  chosen_angle: string;
  rejected_angles: string[];
  core_positioning_thesis: string;
  authority_score: number;
  target_audience?: string;
  key_differentiators?: string[];
  [key: string]: any;
}

export interface BlogEvolution {
  version: number;
  score: number;
  improvements?: string;
  timestamp?: string;
  [key: string]: any;
}

export interface LinkedInData {
  final_draft: string;
  scores: {
    engagement_score?: number;
    clarity_score?: number;
    authenticity_score?: number;
    overall_score?: number;
    [key: string]: any;
  };
}

export interface Tweet {
  tweet_number: number;
  content: string;
  character_count?: number;
  [key: string]: any;
}

export interface TwitterData {
  tweets: Tweet[];
  scores: {
    coherence_score?: number;
    engagement_potential?: number;
    thread_flow_score?: number;
    overall_score?: number;
    [key: string]: any;
  };
}

export interface PipelineResponse {
  raw_signals: RawSignal[];
  scored_signals: ScoredSignal[];
  selected_signal: SelectedSignal;
  competitor_angles: CompetitorAngle[];
  identified_gaps: IdentifiedGap[];
  strategy_brief: StrategyBrief;
  blog_final: string;
  blog_evolution: BlogEvolution[];
  linkedin: LinkedInData;
  twitter: TwitterData;
}

export type PipelineStage = 
  | 'idle'
  | 'collecting_signals'
  | 'scoring_signals'
  | 'analyzing_competition'
  | 'identifying_gaps'
  | 'crafting_strategy'
  | 'generating_blog'
  | 'optimizing_content'
  | 'complete'
  | 'error';
