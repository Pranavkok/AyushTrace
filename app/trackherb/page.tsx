import fs from 'fs';
import path from 'path';

type Herb = {
  name: string;
  photo: string;
  location: string;
  contractAddress: string;
  herbAddress: string;
  batchNumber: string;
  wallet: string;
  amount: string;
  quantity: string;
  season: string;
  fertilizers: string;
  duration: string;
  farmer?: string;
  labTest?: string;
  trader?: string;
  manufacturer?: string;
};

export default function TrackHerbPage({ searchParams }: { searchParams: { address: string } }) {
  const { address } = searchParams;

  const filePath = path.join(process.cwd(), 'data', 'herbs.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const herbs: Herb[] = JSON.parse(jsonData);

  const herb = herbs.find((h) => h.herbAddress.toLowerCase() === address?.toLowerCase());

  if (!herb) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Herb Not Found!</h1>
          <p className="text-green-900 mb-6">No tracking information found for this herb address.</p>
        </div>
      </div>
    );
  }

  // Determine current step
  const steps = ['Farmer', 'Lab Test', 'Trader', 'Manufacturer'];
  const stepStatus = [
    herb.farmer ? 'done' : 'pending',
    herb.labTest ? 'done' : 'pending',
    herb.trader ? 'done' : 'pending',
    herb.manufacturer ? 'done' : 'pending',
  ];

  let currentStep = stepStatus.lastIndexOf('done');
  if (currentStep === -1) currentStep = 0;

  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-800 mb-8">{herb.name} Tracking</h1>

      <div className="flex justify-between items-center w-full max-w-xl mb-6">
        {steps.map((step, idx) => {
          const status = idx <= currentStep ? 'bg-green-600' : 'bg-green-300';
          return (
            <div key={idx} className="flex flex-col items-center relative w-1/4">
              <div
                className={`w-8 h-8 rounded-full ${status} flex items-center justify-center text-white font-bold z-10`}
              >
                {idx + 1}
              </div>
              {idx !== steps.length - 1 && (
                <div className={`absolute top-3.5 left-1/2 w-full h-1 ${idx < currentStep ? 'bg-green-600' : 'bg-green-300'}`}></div>
              )}
              <span className="mt-2 text-green-900 text-sm text-center">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full text-green-900">
        <p><b>Batch Number:</b> {herb.batchNumber}</p>
        <p><b>Herb Address:</b> {herb.herbAddress}</p>
        <p><b>Location:</b> {herb.location}</p>
        <p><b>Current Stage:</b> {steps[currentStep]}</p>
      </div>
    </div>
  );
}
