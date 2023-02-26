import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

async function fileFetcher(url: string) {
  const res = await axios.get(url);

  return res.data;
}

export default function useFile(owner: string, repoName: string, path: string) {
  const { data, error, isLoading } = useSWR(
    path && `/api/repositories/${owner}/${repoName}/contents/${path}`,
    fileFetcher
  );
  const [lastFile, setLastFile] = useState({ content: '', path: '_def' });

  useEffect(() => {
    if (data) {
      setLastFile({
        ...data,
        content: atob(data.content),
      });
    }
  }, [data]);

  return {
    file: lastFile,
    isLoading,
    error,
  };
}
