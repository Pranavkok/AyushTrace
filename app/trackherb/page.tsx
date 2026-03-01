import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TrackHerbPage({
  searchParams,
}: {
  searchParams: Promise<{ address?: string }>;
}) {
  const { address } = await searchParams;

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">No Herb ID</h1>
          <p className="text-green-900 mb-6">Please provide a herb ID to track.</p>
          <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Go Back</Link>
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
      <div className="flex items-center justify-center min-h-screen bg-green-50 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Herb Not Found</h1>
          <p className="text-green-900 mb-6">
            No tracking information found for ID:{" "}
            <code className="bg-green-100 px-1 rounded text-xs break-all">{address}</code>
          </p>
          <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Go Back</Link>
        </div>
      </div>
    );
  }

  const transfers = await prisma.transferRecord.findMany({
    where: { herbAddress: address },
    orderBy: { createdAt: "asc" },
    include: { extraInfo: true },
  });

  const steps = ["Farmer", "Lab Test", "Trader", "Manufacturer"];
  // Step 0 (Farmer) is always done if publish record exists
  // Steps 1+ are done based on transfers added
  const completedSteps = Math.min(1 + transfers.length, steps.length);

  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <div className="mb-6 self-start">
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

      <h1 className="text-3xl font-bold text-green-800 mb-8">{herb.herbName} — Journey</h1>

      {/* Progress Steps */}
      <div className="flex justify-between items-center w-full max-w-xl mb-8">
        {steps.map((step, idx) => {
          const done = idx < completedSteps;
          return (
            <div key={idx} className="flex flex-col items-center relative w-1/4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold z-10 ${done ? "bg-green-600" : "bg-green-300"}`}
              >
                {done ? "✓" : idx + 1}
              </div>
              {idx !== steps.length - 1 && (
                <div
                  className={`absolute top-3.5 left-1/2 w-full h-1 ${idx < completedSteps - 1 ? "bg-green-600" : "bg-green-300"}`}
                />
              )}
              <span className="mt-2 text-green-900 text-xs sm:text-sm text-center">{step}</span>
            </div>
          );
        })}
      </div>

      {/* Herb Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full text-green-900 mb-6 space-y-1">
        <p className="text-lg font-semibold mb-2">Herb Details</p>
        <p><b>Herb ID:</b> <span className="font-mono text-xs break-all">{herb.id}</span></p>
        <p><b>Published by:</b> {herb.user?.name ?? "Unknown"}</p>
        <p><b>Farm/Wallet ID:</b> {herb.wallet}</p>
        <p><b>Quantity:</b> {herb.quantity}</p>
        <p><b>Season:</b> {herb.season}</p>
        <p><b>Current Stage:</b> <span className="text-green-700 font-semibold">{steps[completedSteps - 1]}</span></p>
      </div>

      {/* Transfer History */}
      {transfers.length > 0 && (
        <div className="max-w-xl w-full space-y-4">
          <h2 className="text-xl font-semibold text-green-800">Supply Chain Records</h2>
          {transfers.map((t, i) => (
            <div key={t.id} className="bg-white p-4 rounded-lg shadow-md text-sm text-green-900 space-y-1">
              <p className="font-semibold text-green-700">Entry #{i + 1} — {new Date(t.createdAt).toLocaleDateString("en-IN")}</p>
              <p><b>From (Herb ID):</b> <span className="font-mono text-xs">{t.herbAddress}</span></p>
              <p><b>Sent to:</b> {t.sendTo}</p>
              {t.extraInfo.map((info) => (
                <p key={info.id}><b>{info.title}:</b> {info.data}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {transfers.length === 0 && (
        <div className="max-w-xl w-full bg-white p-4 rounded-lg shadow-md text-sm text-gray-500 text-center">
          No additional supply chain data recorded yet.
        </div>
      )}
    </div>
  );
}
