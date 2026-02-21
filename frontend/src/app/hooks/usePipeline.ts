import { useState, useCallback } from 'react';
import { PipelineResponse, PipelineStage } from '../types/pipeline';
import { API_CONFIG, PIPELINE_CONFIG } from '../config/api';

export function usePipeline() {
  const [data, setData] = useState<PipelineResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<PipelineStage>('idle');

  const stages: PipelineStage[] = [
    'collecting_signals',
    'scoring_signals',
    'analyzing_competition',
    'identifying_gaps',
    'crafting_strategy',
    'generating_blog',
    'optimizing_content',
  ];

  const simulateStages = async () => {
    for (const currentStage of stages) {
      setStage(currentStage);
      await new Promise(resolve => setTimeout(resolve, PIPELINE_CONFIG.STAGE_DURATION));
    }
  };

  const runPipeline = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setError('Please enter a keyword');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setStage('idle');

    try {
      // Start stage simulation
      const stagePromise = simulateStages();

      // Make API call
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RUN_PIPELINE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }

      const result: PipelineResponse = await response.json();

      // Wait for stages to complete
      await stagePromise;

      setData(result);
      setStage('complete');
    } catch (err) {
      let errorMessage = 'Failed to run pipeline';
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage = `Failed to connect to backend. Please ensure the FastAPI server is running at ${API_CONFIG.BASE_URL}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setStage('error');
      console.error('Pipeline error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const editBlogPost = useCallback(async (updatedBlog: string) => {
    if (!data) {
      throw new Error('No pipeline data available to edit');
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EDIT_BLOGPOST}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blog_post_id: data.blog_post_id,
        blog_final: updatedBlog,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Edit blog post failed (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    const updatedBlogFinal = typeof result?.blog_final === 'string' ? result.blog_final : updatedBlog;

    setData({
      ...data,
      ...result,
      blog_final: updatedBlogFinal,
    });

    return updatedBlogFinal;
  }, [data]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setStage('idle');
  }, []);

  return {
    data,
    loading,
    error,
    stage,
    runPipeline,
    editBlogPost,
    reset,
  };
}
