import { useEffect, useState } from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    // 5秒後にメッセージを非表示にする
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-red-100 border-b border-red-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-red-700">{message}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
