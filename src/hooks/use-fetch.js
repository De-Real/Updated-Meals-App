import { useCallback, useState } from "react";

const useFetch = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (requestConfig, applyFn) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request error!");
      }

      const results = await response.json();
      if (!requestConfig.method) {
        applyFn(results);
      }
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  });

  return {
    error,
    isLoading,
    fetchData,
  };
};

export default useFetch;
