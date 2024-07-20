import { useState, useEffect } from 'react';

 function UseBodyFetch(url, area, datos) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request cancelled');
        }
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [url, area, datos]);

  return { data, loading, error };
}
export default UseBodyFetch