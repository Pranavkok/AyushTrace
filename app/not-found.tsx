// app/error.tsx
'use client';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
          Under Maintenance
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-6">
          Will be added in next update 🚀
        </p>
        <Link
          href="/"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 text-sm sm:text-base"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
