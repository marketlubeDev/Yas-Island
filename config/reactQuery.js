import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const defaultOptions = {
  queries: {
    retry: (failureCount, error) => {
      // Retry a couple of times for network-like errors; avoid infinite loops on 4xx
      const status = error?.response?.status;
      if (status && status >= 400 && status < 500) return false;
      return failureCount < 2;
    },
    // Avoid refetch loop focus storms
    refetchOnWindowFocus: false,
  },
};

const queryClient = new QueryClient({
  defaultOptions,
  logger: {
    log: console.log,
    warn: console.warn,
    error: (err) => {
      try {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-center",
        });
      } catch {}
      // Also log to console for developers
      console.error(err);
    },
  },
});

export default queryClient;
