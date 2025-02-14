"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

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
    <div className="min-h-screen grid grid-rows-[80px_1fr_80px] bg-gray-900 text-white">
      <header className="bg-gray-800 flex items-center justify-between px-8">
        <div>
          <h1 className="text-3xl font-bold">KPI速報</h1>
          <p className="text-sm text-gray-400">
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
        <div className="flex gap-2">
          {[0, 20, 40].map((minutes) => {
            const date = new Date(currentTime);
            // Asia/Tokyoのタイムゾーンを設定
            const tokyoTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
            tokyoTime.setMinutes(tokyoTime.getMinutes() - minutes);
            return (
              <div
                key={minutes}
                className="bg-gray-700 rounded-lg px-3 py-2 relative"
              >
                <span className="absolute top-1 left-1.5 text-gray-400 text-[10px]">
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
        </div>
      </header>
      
      <main className="p-4 bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 h-full">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="bg-gray-700 rounded-lg flex items-center justify-center text-xl font-bold text-gray-100"
            >
              Box {i + 1}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 flex items-center justify-center">
        <p className="text-lg">Footer</p>
      </footer>
    </div>
  );
}
