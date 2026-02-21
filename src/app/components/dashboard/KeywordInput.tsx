import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Loader2, Play, RotateCw } from 'lucide-react';
import { PipelineStage } from '../../types/pipeline';

interface KeywordInputProps {
  onSubmit: (keyword: string) => void;
  loading: boolean;
  stage: PipelineStage;
  onReset?: () => void;
}

const STAGE_LABELS: Record<PipelineStage, string> = {
  idle: 'Ready',
  collecting_signals: 'Collecting market signals...',
  scoring_signals: 'Scoring signal strength...',
  analyzing_competition: 'Analyzing competitive landscape...',
  identifying_gaps: 'Identifying market gaps...',
  crafting_strategy: 'Crafting content strategy...',
  generating_blog: 'Generating blog content...',
  optimizing_content: 'Optimizing for channels...',
  complete: 'Pipeline complete',
  error: 'Error occurred',
};

const STAGE_PROGRESS: Record<PipelineStage, number> = {
  idle: 0,
  collecting_signals: 14,
  scoring_signals: 28,
  analyzing_competition: 42,
  identifying_gaps: 56,
  crafting_strategy: 70,
  generating_blog: 85,
  optimizing_content: 95,
  complete: 100,
  error: 0,
};

export function KeywordInput({ onSubmit, loading, stage, onReset }: KeywordInputProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim() && !loading) {
      onSubmit(keyword.trim());
    }
  };

  const handleReset = () => {
    setKeyword('');
    onReset?.();
  };

  const progress = STAGE_PROGRESS[stage];
  const isComplete = stage === 'complete';
  const isError = stage === 'error';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Input</CardTitle>
        <CardDescription>
          Enter a keyword to run the DataVex Growth Intelligence Engine
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="e.g., AI automation tools"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          {!loading && !isComplete && (
            <Button type="submit" disabled={!keyword.trim()} className="w-full sm:w-auto">
              <Play className="mr-2 h-4 w-4" />
              Run Pipeline
            </Button>
          )}
          {(loading || isComplete) && (
            <Button type="button" onClick={handleReset} variant="outline" className="w-full sm:w-auto">
              <RotateCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
        </form>

        {(loading || isComplete || isError) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {STAGE_LABELS[stage]}
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}