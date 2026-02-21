import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, FileJson } from 'lucide-react';
import { PipelineResponse } from '../../types/pipeline';
import { toast } from 'sonner';

interface ExportPanelProps {
  data: PipelineResponse;
}

export function ExportPanel({ data }: ExportPanelProps) {
  const handleDownload = () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const keyword = data.selected_signal.keyword
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      link.download = `datavex-${keyword}-${timestamp}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Pipeline data downloaded successfully!');
    } catch (err) {
      console.error('Failed to download:', err);
      toast.error('Failed to download data');
    }
  };

  // Calculate some stats
  const stats = [
    { label: 'Total Signals', value: data.scored_signals.length },
    { label: 'Competitor Angles', value: data.competitor_angles.length },
    { label: 'Market Gaps', value: data.identified_gaps.length },
    { label: 'Blog Iterations', value: data.blog_evolution.length },
    { label: 'Twitter Tweets', value: data.twitter.tweets.length },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileJson className="h-5 w-5" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Download the complete pipeline results as JSON for further analysis or integration.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-accent/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-2xl font-semibold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Export Button */}
        <Button 
          onClick={handleDownload}
          className="w-full"
          size="lg"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Full JSON
        </Button>

        {/* Data Size Info */}
        <div className="text-xs text-muted-foreground text-center">
          File size: ~{Math.ceil(JSON.stringify(data).length / 1024)} KB
        </div>
      </CardContent>
    </Card>
  );
}