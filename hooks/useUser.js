import useSWR from "swr";
import { fetcher } from "lib";

const useUser = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:8000/user/",
    fetcher
  );

  const logOut = async () => {
    try {
      await fetcher("http://localhost:8000/auth/logout");
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    logOut: logOut,
    mutate: mutate,
  };
};

export { useUser };
