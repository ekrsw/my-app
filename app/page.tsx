"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const headerFooterBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const boxBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
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
  if (!currentTime) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen grid grid-rows-[80px_1fr_50px] ${bgColor} ${textColor}`}>
      <header className={`${headerFooterBg} flex items-center justify-between px-2`}>
        <div>
          <h1 className="text-3xl font-bold">KPI速報</h1>
          <p className={`text-sm ${subTextColor}`}>
            {currentTime.toLocaleString('ja-JP', { 
              timeZone: 'Asia/Tokyo',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })} 現在
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[40, 20, 0].map((minutes) => {
            const date = new Date(currentTime);
            // Asia/Tokyoのタイムゾーンを設定
            const tokyoTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
            tokyoTime.setMinutes(tokyoTime.getMinutes() - minutes);
            return (
              <div
                key={minutes}
                className={`${boxBg} rounded-lg px-3 py-2 relative`}
              >
                <span className={`absolute top-1 left-1.5 ${subTextColor} text-[10px]`}>
                  {minutes === 0 ? '現在の時刻' : `${minutes}分前の時刻`}
                </span>
                <span className="font-mono mt-4 block text-center text-sm">
                  {tokyoTime.getHours().toString().padStart(2, '0')}:
                  {tokyoTime.getMinutes().toString().padStart(2, '0')}:
                  {tokyoTime.getSeconds().toString().padStart(2, '0')}
                </span>
              </div>
            );
          })}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center justify-center w-8 h-8 rounded-lg ${boxBg} hover:opacity-80 transition-opacity`}
          >
            {isDarkMode ? (
              <span className="text-yellow-500 text-lg">☀</span>
            ) : (
              <span className="text-lg">🌙</span>
            )}
          </button>
        </div>
      </header>
      
      <main className={`p-2 ${bgColor}`}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 h-full">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`${boxBg} rounded-lg flex items-center justify-center text-xl font-bold ${textColor}`}
            >
              Box {i + 1}
            </div>
          ))}
        </div>
      </main>

      <footer className={`${headerFooterBg} flex items-center px-2 py-2`}>
        <div className={`text-sm ${subTextColor} text-left`}>
          <p>・CPHは暫定値です</p>
          <p>・データは１分ごとに更新されます</p>
        </div>
      </footer>
    </div>
  );
}
