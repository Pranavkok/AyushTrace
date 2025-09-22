import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

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
};

export default function HerbDataPage({ searchParams }: { searchParams: { address: string } }) {
  const { address } = searchParams;

  const filePath = path.join(process.cwd(), 'data', 'herbs.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const herbs: Herb[] = JSON.parse(jsonData);

  // find herb by contract address (case insensitive)
  // console.log(address);
  // console.log(herbs[0].herbAddress);
  const herb: Herb | undefined = herbs.find((h) => h.herbAddress.toLowerCase() === address?.toLowerCase());

  if (!address || !herb) {
    return (
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
        
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Oops!</h1>
          <p className="text-green-900 mb-6">
            {address
              ? "No herb found for this contract address."
              : "No contract address provided."}
          </p>
          <Link
            href="/farmer"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Go Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = herb.photo.startsWith('/') || herb.photo.startsWith('http')
    ? herb.photo
    : `/images/${herb.photo}`;

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="mb-6">
        <Link 
          href="/farmer"
          className="group flex items-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back</span>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">{herb.name}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image
              src={imageSrc}
              alt={herb.name}
              width={250}
              height={250}
              className="rounded-lg shadow-sm"
            />
          </div>
          <div className="space-y-3 text-green-900">
            <p><b>Contract Address:</b> {herb.wallet}</p>
            <p><b>Amount:</b> {herb.amount}</p>
            <p><b>Quantity:</b> {herb.quantity}</p>
            <p><b>Location:</b> {herb.location}</p>
            <p><b>Season:</b> {herb.season}</p>
            <p><b>Fertilizers Used:</b> {herb.fertilizers}</p>
            <p><b>Duration to Grow:</b> {herb.duration}</p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href={{ pathname: '/trackherb', query: { address: herb.herbAddress } }}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Track Herb
          </Link>
        </div>
      </div>
    </div>
  );
}
