import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

const useUser = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:8000/user/",
    fetcher
  );

  const logUserOut = async () => {
    try {
      await fetcher("http://localhost:8000/auth/logout");
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    logUserOut: logUserOut,
    mutate: mutate,
  };
};

export { useUser };
