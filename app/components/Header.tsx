export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">KPI速報</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">
                  ホーム
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
