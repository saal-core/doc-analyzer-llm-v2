import { useState } from "react";

const useApi = ({ method }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const invoke = async (...methodArgs) => {
    try {
      setError(null);
      setLoading(true);
      const response = await method(...methodArgs);
      setData(response);
    } catch (e) {
      setError(e?.message || e?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, invoke };
};

export default useApi;
