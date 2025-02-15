import { useState, useEffect } from 'react';
import { KpiData } from '../types/kpi';

export function useKpi() {
  const [data, setData] = useState<KpiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await fetch('/api/kpi');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
      console.error('Error fetching KPI data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1分ごとに更新
    return () => clearInterval(interval);
  }, []);

  return { data, error, isLoading, refetch: fetchData };
}
