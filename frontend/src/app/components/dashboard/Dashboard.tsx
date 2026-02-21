import { KeywordInput } from './KeywordInput';
import { SignalIntelligence } from './SignalIntelligence';
import { StrategyBrief } from './StrategyBrief';
import { BlogOutput } from './BlogOutput';
import { LinkedInPost } from './LinkedInPost';
import { TwitterThread } from './TwitterThread';
import { QualityTrace } from './QualityTrace';
import { ExportPanel } from './ExportPanel';
import { usePipeline } from '../../hooks/usePipeline';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, Zap } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

export function Dashboard() {
  const { data, loading, error, stage, runPipeline, reset } = usePipeline();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">DataVex Growth Intelligence Engine</h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered content strategy & generation pipeline
                </p>
              </div>
            </div>
            {data && (
              <div className="text-sm text-muted-foreground sm:text-right">
                Keyword: <span className="font-medium text-foreground">{data.selected_signal.keyword}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <ScrollArea className="h-[calc(100vh-81px)]">
        <div className="container mx-auto px-4 py-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p>{error}</p>
                  {error.includes('Failed to fetch') || error.includes('localhost:8000') ? (
                    <p className="text-xs mt-2">
                      Make sure the FastAPI backend is running at http://localhost:8000
                    </p>
                  ) : null}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Panel 1 - Keyword Input */}
            <KeywordInput
              onSubmit={runPipeline}
              loading={loading}
              stage={stage}
              onReset={reset}
            />

            {/* Results Grid - Show when data is available */}
            {data && (
              <>
                {/* Panel 2 - Signal Intelligence */}
                <section>
                  <h2 className="mb-4">Signal Intelligence</h2>
                  <SignalIntelligence
                    scoredSignals={data.scored_signals}
                    selectedSignal={data.selected_signal}
                    competitorAngles={data.competitor_angles}
                    identifiedGaps={data.identified_gaps}
                  />
                </section>

                {/* Panel 3 - Strategy Brief */}
                <section>
                  <h2 className="mb-4">Strategy Brief</h2>
                  <StrategyBrief strategyBrief={data.strategy_brief} />
                </section>

                {/* Panel 4 - Blog Output */}
                <section>
                  <h2 className="mb-4">Blog Output</h2>
                  <BlogOutput
                    blogFinal={data.blog_final}
                    blogEvolution={data.blog_evolution}
                  />
                </section>

                {/* Panels 5 & 6 - Social Media Grid */}
                <section>
                  <h2 className="mb-4">Social Media Content</h2>
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Panel 5 - LinkedIn */}
                    <LinkedInPost linkedin={data.linkedin} />

                    {/* Panel 6 - Twitter */}
                    <TwitterThread twitter={data.twitter} />
                  </div>
                </section>

                {/* Panels 7 & 8 - Quality & Export Grid */}
                <section>
                  <h2 className="mb-4">Analysis & Export</h2>
                  <div className="grid gap-6 lg:grid-cols-3">
                    {/* Panel 7 - Quality Trace (2 columns) */}
                    <div className="lg:col-span-2">
                      <QualityTrace blogEvolution={data.blog_evolution} />
                    </div>

                    {/* Panel 8 - Export (1 column) */}
                    <ExportPanel data={data} />
                  </div>
                </section>
              </>
            )}

            {/* Empty State */}
            {!data && !loading && !error && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">No Data Yet</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Enter a keyword above and click "Run Pipeline" to generate your growth intelligence report.
                </p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}