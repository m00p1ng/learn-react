import axios from 'axios';
import useSWR from 'swr';

interface UseEntryOptions {
  repoName: string
  owner: string
  path: string
  shouldFetch?: boolean
}

async function filesFetcher(url: string) {
  const { data } = await axios.get(url);

  if (data.type === 'file') {
    return data;
  }

  data.entries.sort((a, b) => {
    if (a.type === 'file' && b.type === 'dir') {
      return 1;
    }
    if (a.type === 'dir' && b.type === 'file') {
      return -1;
    }
    return a.name.localeCompare(b.name);
  });

  return data;
}

export default function useEntry({ repoName, owner, path, shouldFetch }: UseEntryOptions) {
  const _shouldFetch = shouldFetch ?? true;
  const { data, error, isLoading } = useSWR(
    _shouldFetch && `/api/repositories/${owner}/${repoName}/contents/${path}`,
    filesFetcher
  );

  return {
    isLoading,
    error,
    entry: data,
  };
}
