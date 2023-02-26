import useSWRMutation from 'swr/mutation';
import axios from 'axios';

async function signIn(_: any, { arg }: any) {
  try {
    const { data } = await axios.post('/api/auth/signin', arg);
    return data;
  } catch (err: any) {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
}

function useSignIn() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/user',
    signIn
  );

  return {
    isSignedIn: data,
    error,
    signIn: trigger,
    isLoading: isMutating,
  };
}

export default useSignIn;
