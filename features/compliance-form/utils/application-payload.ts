import type { FormSchema } from '../schemas';

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function emptyToUndefined(value: string | undefined): string | undefined {
  return value === '' || value === undefined ? undefined : value;
}

export function toContactFields(data: FormSchema) {
  return {
    fullName: data.fullName,
    emailAddress: data.emailAddress,
    phone: data.phone,
    applicationType: asString(data.applicationType),
    entityType: asString(data.entityType),
    entityName: emptyToUndefined(data.entityName),
    doingBusinessAs: emptyToUndefined(data.doingBusinessAs),
    physicalAddress: data.physicalAddress,
    physicalCity: data.physicalCity,
    physicalState: asString(data.physicalState),
    physicalZipCode: data.physicalZipCode,
    physicalCountry: asString(data.physicalCountry),
  };
}

export function toBillingFields(data: FormSchema) {
  return {
    billingAddress: data.billingAddress,
    billingCity: data.billingCity,
    billingState: data.billingState,
    billingZipCode: data.billingZipCode,
    billingCountry: data.billingCountry,
  };
}

export function toVehicleFields(vehicles: FormSchema['vehicles']) {
  return vehicles.map(({ id: _id, ...vehicle }) => vehicle);
}
