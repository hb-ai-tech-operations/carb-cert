export interface OrderApplicationVehicle {
  address: string;
  city: string;
  country: string;
  fuelType: string;
  id: string;
  licensePlate: string;
  locationAddress: string;
  make: string;
  model: string;
  ownershipType: string;
  registeredCountry: string;
  registeredState: string;
  state: string;
  vehicleType: string;
  vin: string;
  year: string;
  zipCode: string;
}

export interface OrderApplicationPayment {
  amount: number;
  attemptedAt: number;
  cardBrand: string | null;
  cardLast4: string | null;
  currency: string;
  errorMessage: string | null;
  id: string;
  status: string;
  stripePaymentIntentId: string;
}

export interface OrderApplicationDetailData {
  applicationType: string;
  billingAddress: string | null;
  billingCity: string | null;
  billingCountry: string | null;
  billingState: string | null;
  billingZipCode: string | null;
  creationTime: number;
  currentStep: number | null;
  doingBusinessAs: string | null;
  emailAddress: string;
  entityName: string | null;
  entityType: string;
  fullName: string;
  id: string;
  payments: OrderApplicationPayment[];
  phone: string;
  physicalAddress: string;
  physicalCity: string;
  physicalCountry: string;
  physicalState: string;
  physicalZipCode: string;
  status: string;
  vehicles: OrderApplicationVehicle[];
}
