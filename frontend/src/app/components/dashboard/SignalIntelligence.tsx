import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Target, AlertCircle } from 'lucide-react';
import { ScoredSignal, SelectedSignal, CompetitorAngle, IdentifiedGap } from '../../types/pipeline';

interface SignalIntelligenceProps {
  scoredSignals: ScoredSignal[];
  selectedSignal: SelectedSignal;
  competitorAngles: CompetitorAngle[];
  identifiedGaps: IdentifiedGap[];
}

export function SignalIntelligence({
  scoredSignals,
  selectedSignal,
  competitorAngles,
  identifiedGaps,
}: SignalIntelligenceProps) {
  const chartData = scoredSignals.slice(0, 8).map((signal) => ({
    name: signal.keyword.length > 20 ? signal.keyword.substring(0, 20) + '...' : signal.keyword,
    score: signal.composite_score,
    isSelected: signal.keyword === selectedSignal.keyword,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Selected Signal Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-chart-1" />
                Selected Signal
              </CardTitle>
            </div>
            <Badge variant="default" className="text-lg px-4 py-1">
              {selectedSignal.composite_score.toFixed(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-semibold">{selectedSignal.keyword}</h3>
            {selectedSignal.rationale && (
              <p className="text-sm text-muted-foreground">{selectedSignal.rationale}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Composite Score Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Signal Composite Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isSelected ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitor Angles */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Angles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {competitorAngles.length === 0 && (
              <p className="text-sm text-muted-foreground">No competitor angles identified</p>
            )}
            {competitorAngles.map((angle, index) => (
              <div key={index} className="border-l-2 border-chart-2 pl-3 py-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{angle.angle}</p>
                  {angle.strength !== undefined && (
                    <Badge variant="secondary">{angle.strength}/10</Badge>
                  )}
                </div>
                {angle.competitor && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {angle.competitor}
                  </p>
                )}
                {angle.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {angle.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Identified Gaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-chart-3" />
            Identified Gaps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {identifiedGaps.length === 0 && (
              <p className="text-sm text-muted-foreground">No gaps identified</p>
            )}
            {identifiedGaps.map((gap, index) => (
              <div 
                key={index} 
                className="bg-accent/50 rounded-lg p-3 border border-chart-3/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{gap.gap}</p>
                  {gap.opportunity_score !== undefined && (
                    <Badge variant="default" className="bg-chart-3">
                      {gap.opportunity_score}/10
                    </Badge>
                  )}
                </div>
                {gap.description && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {gap.description}
                  </p>
                )}
                {gap.addressable !== undefined && (
                  <div className="mt-2">
                    <Badge variant={gap.addressable ? "default" : "secondary"} className="text-xs">
                      {gap.addressable ? "Addressable" : "Not Addressable"}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
