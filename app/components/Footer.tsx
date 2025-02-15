export default function Footer() {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} KPI速報. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
