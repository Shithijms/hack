import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { BlogEvolution } from '../../types/pipeline';

interface QualityTraceProps {
  blogEvolution: BlogEvolution[];
}

export function QualityTrace({ blogEvolution }: QualityTraceProps) {
  if (blogEvolution.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Quality Trace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No evolution data available
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate deltas between versions
  const traces = blogEvolution.map((evolution, index) => {
    if (index === 0) {
      return {
        ...evolution,
        delta: null,
        isImprovement: null,
      };
    }

    const previousScore = blogEvolution[index - 1].score;
    const delta = evolution.score - previousScore;
    
    return {
      ...evolution,
      delta,
      isImprovement: delta > 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Quality Trace
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {traces.map((trace, index) => (
            <div 
              key={index} 
              className="border border-border rounded-lg p-4 relative"
            >
              {/* Version Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Version {trace.version}</Badge>
                  <Badge 
                    variant="default" 
                    className="bg-chart-1"
                  >
                    Score: {trace.score.toFixed(2)}
                  </Badge>
                </div>
                
                {/* Delta Badge */}
                {trace.delta !== null && (
                  <Badge 
                    variant={trace.isImprovement ? "default" : "destructive"}
                    className={trace.isImprovement ? "bg-green-500" : ""}
                  >
                    {trace.isImprovement ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {trace.delta > 0 ? '+' : ''}{trace.delta.toFixed(2)}
                  </Badge>
                )}
              </div>

              {/* Improvements */}
              {trace.improvements && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Changes:</h4>
                  <p className="text-sm text-muted-foreground">
                    {trace.improvements}
                  </p>
                </div>
              )}

              {/* Timestamp */}
              {trace.timestamp && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {trace.timestamp}
                </div>
              )}

              {/* Before/After Indicator */}
              {index > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Before:</span>
                      <span className="ml-2 font-medium">
                        {blogEvolution[index - 1].score.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">After:</span>
                      <span className="ml-2 font-medium">
                        {trace.score.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Summary */}
          {traces.length > 1 && (
            <div className="bg-accent/50 rounded-lg p-4 border border-chart-1/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Improvement</span>
                <Badge className="bg-chart-1 text-white">
                  {traces[0].delta !== null && (
                    <>
                      {(traces[traces.length - 1].score - traces[0].score).toFixed(2)} points
                    </>
                  )}
                  {traces[0].delta === null && (
                    <>
                      {(traces[traces.length - 1].score - traces[0].score).toFixed(2)} points
                    </>
                  )}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
