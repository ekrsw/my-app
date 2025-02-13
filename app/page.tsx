import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[80px_1fr_80px] bg-gray-900 text-white">
      <header className="bg-gray-800 flex items-center justify-between px-8">
        <div>
          <h1 className="text-3xl font-bold">KPI速報</h1>
          <p className="text-sm text-gray-400">2025-02-03 20:26:33 現在</p>
        </div>
        <div className="flex gap-4">
          {[0, 20, 40].map((minutes) => {
            const date = new Date();
            date.setMinutes(date.getMinutes() - minutes);
            return (
              <div
                key={minutes}
                className="bg-gray-700 rounded-lg px-3 py-2 relative"
              >
                <span className="absolute top-1 left-1.5 text-gray-400 text-[10px]">
                  {minutes === 0 ? '現在の時刻' : `${minutes}分前の時刻`}
                </span>
                <span className="font-mono mt-4 block text-center text-sm">
                  {date.getHours().toString().padStart(2, '0')}:
                  {date.getMinutes().toString().padStart(2, '0')}:
                  {date.getSeconds().toString().padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </header>
      
      <main className="p-8 bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 h-full">
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
