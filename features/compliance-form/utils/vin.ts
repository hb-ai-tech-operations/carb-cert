export const VIN_LENGTH = 17;

/**
 * 17 alphanumeric characters (A–Z, 0–9). Apply after {@link normalizeVin}.
 * I, O, and Q are allowed — some manufacturer VINs include them and our decode API accepts them.
 */
export const VIN_FORMAT_REGEX = /^[\dA-Z]{17}$/;

export const INVALID_VIN_FORMAT_MESSAGE = 'Invalid VIN format';

/**
 * Normalizes a VIN for comparison (trim + uppercase).
 */
export function normalizeVin(vin: string): string {
  return vin.trim().toUpperCase();
}

/** Returns true when `vin` is a valid 17-character alphanumeric VIN (case-insensitive). */
export function isValidVinFormat(vin: string): boolean {
  const normalized = normalizeVin(vin);
  return normalized.length === VIN_LENGTH && VIN_FORMAT_REGEX.test(normalized);
}

const DUPLICATE_VIN_MESSAGE = 'Vehicle with this VIN already exists.';

/**
 * Returns an error message if the given VIN is a duplicate in the list.
 * @param vehicles - List of vehicles with optional id and vin
 * @param vin - VIN to check
 * @param excludeId - When editing, the current vehicle's id to exclude from the check
 */
export function getDuplicateVinError(
  vehicles: Array<{ id?: string; vin?: string }>,
  vin: string,
  excludeId?: string
): string | null {
  const normalizedVin = normalizeVin(vin);
  const hasDuplicate = vehicles.some(vehicle => {
    const vehicleVin = vehicle.vin ? normalizeVin(vehicle.vin) : '';
    return vehicleVin === normalizedVin && vehicle.id !== excludeId;
  });
  return hasDuplicate ? DUPLICATE_VIN_MESSAGE : null;
}
