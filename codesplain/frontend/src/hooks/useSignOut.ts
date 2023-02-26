import useSWR, { mutate } from 'swr';
import axios from 'axios';

async function signOut(path: string) {
  try {
    const { data } = await axios.get(path);
    mutate('/api/user');
    return data;
  } catch (err: any) {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
}

function useSignOut() {
  const { data, error, isLoading } = useSWR('/api/auth/signout', signOut);

  return {
    isSignedOut: data,
    error,
    isLoading,
  };
}

export default useSignOut;
