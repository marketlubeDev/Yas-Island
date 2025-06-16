import { QueryClient } from "@tanstack/react-query";


const defaultOptions = {
//   queries: {
//     refetchOnWindowFocus: true,
//     staleTime: 0,
//     cacheTime: 1000 * 60 * 10,
//     retry: 3,
//     refetchInterval: 60000,
//   },
};

const queryClient = new QueryClient({
  defaultOptions,
});

export default queryClient;