import { useEffect, useState } from "react";

export function UseBodyFetch(url, options = {}, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(dependencies == null) return
    setLoading(true);
    fetch(url, options)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [dependencies] );

  return { data, loading, error };
}