"use client";
import { useEffect, useState } from "react";
import { useKpi } from "./hooks/useKpi";
import { KpiDisplay } from "./components/KpiDisplay";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data, error, isLoading } = useKpi();

  // 初期値の設定
  useEffect(() => {
    const saved = localStorage.getItem('isDarkMode');
    if (saved !== null) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // モード変更時の保存
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-200';
  const headerFooterBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const boxBg = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  useEffect(() => {
    // 初期値を設定
    setCurrentTime(new Date());

    // 1秒ごとに更新
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 初期レンダリング時はローディングを表示
  if (!currentTime || isLoading) {
    return <div className={`min-h-screen ${bgColor} ${textColor} flex items-center justify-center`}>Loading...</div>;
  }

  if (error) {
    return <div className={`min-h-screen ${bgColor} ${textColor} flex items-center justify-center`}>Error: {error}</div>;
  }

  if (!data) {
    return <div className={`min-h-screen ${bgColor} ${textColor} flex items-center justify-center`}>No data available</div>;
  }

  return (
    <div className={`min-h-screen grid grid-rows-[60px_1fr_50px] ${bgColor} ${textColor}`}>
      <header className={`${headerFooterBg} flex items-center justify-between px-4 shadow-md`}>
        <div>
          <h1 className="text-2xl font-bold">KPI速報</h1>
          <p className={`text-sm ${subTextColor}`}>
            <span className="hidden sm:inline">
              {new Date(data.created_at).toLocaleString('ja-JP', { 
                timeZone: 'Asia/Tokyo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
              {' '}
            </span>
            {new Date(data.created_at).toLocaleString('ja-JP', { 
              timeZone: 'Asia/Tokyo',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            }) + ' 現在'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[0, 20, 40].map((minutes) => {
            const date = new Date(currentTime);
            // Asia/Tokyoのタイムゾーンを設定
            const tokyoTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
            tokyoTime.setMinutes(tokyoTime.getMinutes() - minutes);
            return (
              <div
                key={minutes}
                className="flex flex-col items-start w-24"
              >
                <span className={`${subTextColor} text-[10px]`}>
                  {minutes === 0 ? '現在の時刻' : `${minutes}分前の時刻`}
                </span>
                <span className={`font-mono text-base ${textColor}`}>
                  {tokyoTime.getHours().toString().padStart(2, '0')}:
                  {tokyoTime.getMinutes().toString().padStart(2, '0')}:
                  {tokyoTime.getSeconds().toString().padStart(2, '0')}
                </span>
              </div>
            );
          })}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:opacity-80 transition-opacity"
          >
            {isDarkMode ? (
              <span className={`${subTextColor} text-2xl`}>☼</span>
            ) : (
              <span className={`${subTextColor} text-2xl`}>☽</span>
            )}
          </button>
        </div>
      </header>
      
      <main className={`p-2 sm:p-4 ${bgColor} h-full overflow-auto`}>
        <KpiDisplay
          data={data}
          textColor={textColor}
          subTextColor={subTextColor}
          boxBg={boxBg}
        />
      </main>

      <footer className={`${headerFooterBg} flex items-center px-4 py-2 shadow-md`}>
        <div className={`text-sm ${subTextColor} text-left`}>
          <p>・Bufferがマイナスの場合は目標未達を表します</p>
          <p>・データは１分ごとに更新されます</p>
        </div>
      </footer>
    </div>
  );
}
