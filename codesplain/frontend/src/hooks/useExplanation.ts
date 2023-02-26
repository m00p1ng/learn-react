import axios from 'axios';
import useSWR from 'swr';
import getLangFromPath from '../util/getLangFromPath';

interface UserExplanationOptions {
  text: string
  path: string
}

type ExplanationFetcherOptions = [string, UserExplanationOptions]

async function explanationFetcher([url, { text, path }]: ExplanationFetcherOptions) {
  const { data } = await axios.post(`http://localhost:8000${url}`, {
    text,
    language: getLangFromPath(path),
  });
  const choice = data && data.choices && data.choices[0] && data.choices[0];

  return choice.text.trim();
}

export default function useExplanation({ text, path }: UserExplanationOptions) {
  const { data, error, isLoading } = useSWR(
    [`/api/explain`, { text, path }],
    explanationFetcher
  );

  return {
    isLoading,
    error,
    explanation: data,
  };
}
