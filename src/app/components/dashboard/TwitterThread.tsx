import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, Check, Twitter } from 'lucide-react';
import { TwitterData } from '../../types/pipeline';
import { toast } from 'sonner';

interface TwitterThreadProps {
  twitter: TwitterData;
}

export function TwitterThread({ twitter }: TwitterThreadProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyTweet = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      toast.success(`Tweet ${index + 1} copied to clipboard!`);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleCopyAll = async () => {
    try {
      const allTweets = twitter.tweets
        .map((tweet, index) => `${index + 1}/${twitter.tweets.length}\n\n${tweet.content}`)
        .join('\n\n---\n\n');
      await navigator.clipboard.writeText(allTweets);
      setCopiedAll(true);
      toast.success('All tweets copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2000);
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
    { label: 'Coherence', value: twitter.scores.coherence_score },
    { label: 'Engagement', value: twitter.scores.engagement_potential },
    { label: 'Flow', value: twitter.scores.thread_flow_score },
    { label: 'Overall', value: twitter.scores.overall_score },
  ].filter(score => score.value !== undefined);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            Twitter Thread
          </CardTitle>
          <Button onClick={handleCopyAll} variant="outline" size="sm">
            {copiedAll ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Copied All!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy All
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

        {/* Thread Overview */}
        <div className="text-sm text-muted-foreground">
          {twitter.tweets.length} tweet{twitter.tweets.length !== 1 ? 's' : ''} in thread
        </div>

        {/* Tweet Cards */}
        <div className="space-y-4">
          {twitter.tweets.map((tweet, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-lg p-4 shadow-sm relative"
            >
              {/* Thread Indicator */}
              {index < twitter.tweets.length - 1 && (
                <div className="absolute left-[30px] top-[60px] w-0.5 h-8 bg-chart-2" />
              )}

              {/* Tweet Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">DV</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">DataVex Growth</div>
                    <div className="text-xs text-muted-foreground">@datavex • Just now</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {index + 1}/{twitter.tweets.length}
                </Badge>
              </div>

              {/* Tweet Content */}
              <div className="ml-[52px] mb-3">
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {tweet.content}
                </p>
                {tweet.character_count !== undefined && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {tweet.character_count} characters
                  </div>
                )}
              </div>

              {/* Tweet Actions */}
              <div className="ml-[52px] flex items-center gap-4 text-muted-foreground">
                <button className="text-xs hover:text-foreground transition-colors">
                  💬 Reply
                </button>
                <button className="text-xs hover:text-foreground transition-colors">
                  🔄 Retweet
                </button>
                <button className="text-xs hover:text-foreground transition-colors">
                  ❤️ Like
                </button>
                <Button
                  onClick={() => handleCopyTweet(tweet.content, index)}
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-7 text-xs"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="mr-1 h-3 w-3 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}