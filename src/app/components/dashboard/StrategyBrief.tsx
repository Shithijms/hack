import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Lightbulb, XCircle, FileText, Award } from 'lucide-react';
import { StrategyBrief as StrategyBriefType } from '../../types/pipeline';

interface StrategyBriefProps {
  strategyBrief: StrategyBriefType;
}

export function StrategyBrief({ strategyBrief }: StrategyBriefProps) {
  const getAuthorityColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-chart-3';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Authority Score Badge - Prominent */}
      <Card className="border-2 border-chart-1">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4">
            <Award className="h-8 w-8 text-chart-1" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Authority Score</p>
              <div className={`inline-flex items-center justify-center rounded-full px-6 py-2 ${getAuthorityColor(strategyBrief.authority_score)} text-white`}>
                <span className="font-bold text-2xl">{strategyBrief.authority_score.toFixed(1)}</span>
                <span className="text-lg ml-1">/10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chosen Angle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-chart-3" />
            Chosen Angle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-accent/50 rounded-lg p-6 border-l-4 border-chart-1">
            <p className="font-medium text-lg leading-relaxed">
              {strategyBrief.chosen_angle}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Core Positioning Thesis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Core Positioning Thesis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {strategyBrief.core_positioning_thesis}
          </p>
        </CardContent>
      </Card>

      {/* Rejected Angles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-muted-foreground" />
            Rejected Angles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {strategyBrief.rejected_angles.length === 0 ? (
            <p className="text-sm text-muted-foreground">No rejected angles</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {strategyBrief.rejected_angles.map((angle, index) => (
                <AccordionItem key={index} value={`angle-${index}`}>
                  <AccordionTrigger className="text-sm hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-normal">
                        #{index + 1}
                      </Badge>
                      <span className="text-left">{angle}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-muted-foreground pl-4 pt-2">
                      This angle was considered but rejected in favor of the chosen positioning strategy.
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Additional Strategy Details */}
      {(strategyBrief.target_audience || strategyBrief.key_differentiators) && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {strategyBrief.target_audience && (
              <div>
                <h4 className="text-sm font-medium mb-2">Target Audience</h4>
                <p className="text-sm text-muted-foreground">
                  {strategyBrief.target_audience}
                </p>
              </div>
            )}
            {strategyBrief.key_differentiators && strategyBrief.key_differentiators.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Key Differentiators</h4>
                <ul className="space-y-1">
                  {strategyBrief.key_differentiators.map((diff, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-chart-1 mt-1">•</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
