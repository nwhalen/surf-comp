import { useState, useEffect } from 'react';
import { fetchBuoyData } from '../api/ndbc';

const useBuoyData = (buoyId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!buoyId) return;

    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchBuoyData(buoyId);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [buoyId]);

  return { data, loading, error };
};

export default useBuoyData;