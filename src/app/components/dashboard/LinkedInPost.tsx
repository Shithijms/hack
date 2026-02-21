import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, Check, Linkedin } from 'lucide-react';
import { LinkedInData } from '../../types/pipeline';
import { toast } from 'sonner';

interface LinkedInPostProps {
  linkedin: LinkedInData;
}

export function LinkedInPost({ linkedin }: LinkedInPostProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkedin.final_draft);
      setCopied(true);
      toast.success('LinkedIn post copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'bg-secondary';
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-chart-3';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const scores = [
    { label: 'Engagement', value: linkedin.scores.engagement_score },
    { label: 'Clarity', value: linkedin.scores.clarity_score },
    { label: 'Authenticity', value: linkedin.scores.authenticity_score },
    { label: 'Overall', value: linkedin.scores.overall_score },
  ].filter(score => score.value !== undefined);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-[#0077B5]" />
            LinkedIn Post
          </CardTitle>
          <Button onClick={handleCopy} variant="outline" size="sm">
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Badges */}
        {scores.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {scores.map((score, index) => (
              <Badge 
                key={index} 
                className={`${getScoreColor(score.value)} text-white`}
              >
                {score.label}: {score.value?.toFixed(1)}
              </Badge>
            ))}
          </div>
        )}

        {/* LinkedIn Post Preview */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          {/* Mock LinkedIn Header */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
              <span className="text-white font-semibold">DV</span>
            </div>
            <div>
              <div className="font-semibold">DataVex Growth Intelligence</div>
              <div className="text-xs text-muted-foreground">Just now • 🌐</div>
            </div>
          </div>

          {/* Post Content */}
          <div className="whitespace-pre-line text-sm leading-relaxed">
            {linkedin.final_draft}
          </div>

          {/* Mock LinkedIn Actions */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border text-muted-foreground">
            <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <span>👍</span> Like
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <span>💬</span> Comment
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <span>🔄</span> Repost
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
              <span>📤</span> Send
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}