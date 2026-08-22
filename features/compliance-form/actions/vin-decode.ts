'use server';

interface VinDecodeResponse {
  fuelType: string | null;
  fuelTypeSecondary: string | null;
  make: string;
  model: string;
  vin: string;
  year: string;
}

export async function vinDecode(vin: string): Promise<VinDecodeResponse> {
  const response = await fetch(`https://vin.carbcert.com/${vin}`);
  if (!response.ok) {
    throw new Error('Failed to decode VIN');
  }
  return (await response.json()) as VinDecodeResponse;
}
