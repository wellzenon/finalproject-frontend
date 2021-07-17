import useSWR from "swr";

const fetcher = (...args) =>
  fetch(...args, {
    credentials: "include",
  }).then((res) => res.json());

const useComments = ({ user = "", event = "" }) => {
  const { data, error, mutate } = useSWR(
    `http://localhost:8000/comments/?event=${event}&user=${user}`,
    fetcher
  );

  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};

export { useComments };
