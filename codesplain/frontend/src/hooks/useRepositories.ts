import axios from 'axios';
import useSWR from 'swr';

async function repositoriesFetcher([url, searchQuery]: [string, string]) {
  const res = await axios.get(`http://localhost:8000${url}`, {
    params: {
      q: searchQuery || '',
      per_page: 10,
    },
  });

  return res.data.items;
}

export default function useRepositories(searchQuery: string) {
  const { data, error, isLoading } = useSWR(
    searchQuery && ['/api/repositories', searchQuery],
    repositoriesFetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}
