"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  if (!currentTime) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen grid grid-rows-[60px_1fr_50px] ${bgColor} ${textColor}`}>
      <header className={`${headerFooterBg} flex items-center justify-between px-4 shadow-md`}>
        <div>
          <h1 className="text-2xl font-bold">KPI速報</h1>
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
      
      <main className={`p-2 ${bgColor} h-full`}>
        <div className="flex flex-col gap-2 h-full">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <div
              className={`${boxBg} rounded-lg flex items-center justify-center text-xl font-bold ${textColor} shadow-md h-40 sm:h-full w-full sm:w-[400px] flex-shrink-0`}
            >
              Box 1
            </div>
            <div
              className={`${boxBg} rounded-lg p-4 shadow-md h-40 sm:h-full w-full overflow-auto`}
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left p-2 whitespace-nowrap">氏名</th>
                    <th className="hidden lg:table-cell text-left p-2 whitespace-nowrap">シフト</th>
                    <th className="text-left p-2 whitespace-nowrap">ACW</th>
                    <th className="text-left p-2 whitespace-nowrap">ATT</th>
                    <th className="text-left p-2 whitespace-nowrap">CPH</th>
                    <th className="text-left p-2 whitespace-nowrap">クローズ</th>
                  </tr>
                </thead>
                <tbody>
                  {/* サンプルデータ */}
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="p-2 whitespace-nowrap">山田 太郎</td>
                      <td className="hidden lg:table-cell p-2 whitespace-nowrap">9:00-18:00</td>
                      <td className="p-2 whitespace-nowrap">00:30</td>
                      <td className="p-2 whitespace-nowrap">02:45</td>
                      <td className="p-2 whitespace-nowrap">4.5</td>
                      <td className="p-2 whitespace-nowrap">12</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <div
              className={`${boxBg} rounded-lg flex items-center justify-center text-xl font-bold ${textColor} shadow-md h-40 sm:h-full w-full`}
            >
              Box 3
            </div>
            <div
              className={`${boxBg} rounded-lg flex items-center justify-center text-xl font-bold ${textColor} shadow-md h-40 sm:h-full w-full sm:w-[400px] flex-shrink-0`}
            >
              Box 4
            </div>
          </div>
        </div>
      </main>

      <footer className={`${headerFooterBg} flex items-center px-2 py-2 shadow-md`}>
        <div className={`text-sm ${subTextColor} text-left`}>
          <p>・CPHは暫定値です</p>
          <p>・データは１分ごとに更新されます</p>
        </div>
      </footer>
    </div>
  );
}
