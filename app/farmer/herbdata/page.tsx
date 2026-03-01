import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HerbDataPage({
  searchParams,
}: {
  searchParams: Promise<{ address?: string }>;
}) {
  const { address } = await searchParams;

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">No herb ID provided</h1>
          <p className="text-green-900 mb-6 text-sm sm:text-base">Please enter a herb ID to search.</p>
          <Link href="/" className="inline-block bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-green-700 transition">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const herb = await prisma.publishRecord.findUnique({
    where: { id: address },
    include: { user: { select: { name: true } } },
  });

  if (!herb) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Herb Not Found</h1>
          <p className="text-green-900 mb-6 text-sm sm:text-base">
            No herb found for ID:{" "}
            <code className="bg-green-100 px-1 rounded text-xs break-all">{address}</code>
          </p>
          <Link href="/" className="inline-block bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-green-700 transition">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-green-50 min-h-screen">
      <div className="mb-6">
        <Link
          href="/"
          className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-3 py-2 sm:px-4 sm:py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium text-sm sm:text-base">Back</span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">{herb.herbName}</h1>
        <p className="text-xs text-gray-400 mb-6 font-mono break-all">Herb ID: {herb.id}</p>

        <div className="space-y-2 text-green-900 text-sm sm:text-base">
          <p><b>Published by:</b> {herb.user?.name ?? "Unknown"}</p>
          <p><b>Farm / Wallet ID:</b> {herb.wallet}</p>
          <p><b>Amount (₹):</b> {herb.amount}</p>
          <p><b>Quantity:</b> {herb.quantity}</p>
          <p><b>Season:</b> {herb.season}</p>
          <p><b>Fertilizers Used:</b> {herb.fertilizers}</p>
          <p><b>Growing Duration:</b> {herb.duration}</p>
          {herb.photoName && <p><b>Photo:</b> {herb.photoName}</p>}
          <p>
            <b>Published on:</b>{" "}
            {new Date(herb.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={`/trackherb?address=${herb.id}`}
            className="inline-block bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-green-700 transition"
          >
            Track Herb Journey
          </Link>
        </div>
      </div>
    </div>
  );
}
