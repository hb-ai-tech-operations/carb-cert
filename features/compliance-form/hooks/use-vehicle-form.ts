'use client';

import { type ReactNode, useCallback, useEffect, useTransition } from 'react';
import { type Resolver, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

import { vinDecode } from '../actions/vin-decode';
import { VEHICLE_FUEL_TYPES, type VehicleFuelType } from '../constants/enums';
import {
  INELIGIBLE_VEHICLE_FUEL_TYPE_FOR_CARB_MESSAGE,
  isVehicleFuelIneligibleForCarbReporting as isFuelIneligibleForCarbFromOptions,
} from '../constants/form-options';
import { type VehicleSchema, vehicleSchema } from '../schemas';
import { normalizeVin, VIN_LENGTH } from '../utils/vin';
import { useFuelTypeAcknowledgment } from './use-fuel-type-acknowledgment';

const checkFuelIneligibleForCarbReporting =
  isFuelIneligibleForCarbFromOptions as (fuel: VehicleFuelType) => boolean;
const FUEL_TYPE_BY_NORMALIZED_INPUT: Record<string, VehicleFuelType> = {
  diesel: 'diesel',
  gasoline: 'gasoline',
  electric: 'electric',
  hybrid: 'alternative_fuel_hybrid',
  alternativefuelhybrid: 'alternative_fuel_hybrid',
  convertedtoelectric: 'converted_to_electric',
  convertedtogasoline: 'converted_to_gasoline',
  dieselhybrid: 'diesel_hybrid',
  ethanol: 'ethanol',
  hydrogen: 'hydrogen',
  methanol: 'methanol',
  naturalgas: 'natural_gas',
  cng: 'natural_gas',
  lng: 'natural_gas',
  propane: 'propane',
  lpg: 'propane',
};

const normalizeFuelType = (fuelType: string): VehicleFuelType | undefined => {
  const normalizedKey = fuelType.toLowerCase().replace(/[^\da-z]/g, '');
  return FUEL_TYPE_BY_NORMALIZED_INPUT[normalizedKey];
};

const narrowVehicleFuelType = (value: unknown): VehicleFuelType => {
  if (typeof value !== 'string') {
    throw new TypeError('Invalid fuel type');
  }

  if (!(VEHICLE_FUEL_TYPES as readonly string[]).includes(value)) {
    throw new TypeError('Invalid fuel type');
  }

  return value as VehicleFuelType;
};

const createDefaultVehicle = (): Partial<VehicleSchema> => ({
  id: uuidv4(),
  vin: '',
  year: '',
  make: '',
  model: '',
  fuelType: undefined,
  licensePlate: '',
  registeredCountry: undefined,
  registeredState: '',
  ownershipType: undefined,
  vehicleType: undefined,
  locationAddress: undefined,
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: undefined,
});

interface UseVehicleFormProps {
  editingVehicle?: VehicleSchema | null;
  onClose: () => void;
  onSave: (vehicle: VehicleSchema) => void;
  open: boolean;
  validateVin?: (vin: string, id?: string) => string | null;
}

interface UseVehicleFormReturn {
  form: ReturnType<typeof useForm<VehicleSchema>>;
  fuelTypeNoticeDialog: ReactNode;
  handleClose: () => void;
  handleFuelTypeChange: (value: string) => void;
  handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  handleVinChange: (vin: string) => Promise<void>;
  isEditing: boolean;
  pending: boolean;
}

export function useVehicleForm({
  editingVehicle,
  onSave,
  onClose,
  validateVin,
  open,
}: UseVehicleFormProps): UseVehicleFormReturn {
  const isEditing = !!editingVehicle;
  const [pending, startTransitionAction] = useTransition();
  const form = useForm<VehicleSchema>({
    resolver: zodResolver(vehicleSchema) as Resolver<VehicleSchema>,
    defaultValues: createDefaultVehicle(),
  });

  const { fuelTypeNoticeDialog, handleFuelTypeChange, resetFuelNotice } =
    useFuelTypeAcknowledgment(form);

  // Reset form when dialog opens
  useEffect(() => {
    if (!open) {
      return;
    }

    if (editingVehicle) {
      form.reset(editingVehicle);
    } else {
      form.reset(createDefaultVehicle());
    }
  }, [open, editingVehicle, form]);

  const handleClose = useCallback(() => {
    resetFuelNotice();
    form.reset(createDefaultVehicle());
    onClose();
  }, [form, onClose, resetFuelNotice]);

  const handleSubmit = form.handleSubmit((data: unknown) => {
    const vehicle = vehicleSchema.parse(data);

    const validationMessage = validateVin?.(vehicle.vin, vehicle.id);
    if (typeof validationMessage === 'string' && validationMessage.length > 0) {
      form.setError('vin', { message: validationMessage });
      return;
    }

    const fuelType = narrowVehicleFuelType(vehicle.fuelType as unknown);

    const isAddingVehicle =
      editingVehicle === undefined || editingVehicle === null;
    const fuelIsIneligibleForCarbReporting = Boolean(
      checkFuelIneligibleForCarbReporting(fuelType)
    );

    if (isAddingVehicle && fuelIsIneligibleForCarbReporting) {
      form.setError('fuelType', {
        type: 'manual',
        message: String(INELIGIBLE_VEHICLE_FUEL_TYPE_FOR_CARB_MESSAGE),
      });
      return;
    }

    resetFuelNotice();
    onSave(vehicle);
    form.reset(createDefaultVehicle());
    onClose();
  });

  const handleVinChange = useCallback(
    async (vin: string) => {
      const validationMessage = validateVin?.(vin, form.getValues('id'));
      if (validationMessage) {
        form.setError('vin', { message: validationMessage });
        return;
      }

      if (!validationMessage) {
        form.clearErrors('vin');
      }

      if (form.formState.errors.vin?.type === 'manual') {
        form.clearErrors('vin');
      }

      const normalizedVin = normalizeVin(vin);
      if (normalizedVin.length !== VIN_LENGTH) {
        return;
      }

      startTransitionAction(async () => {
        try {
          const response = await vinDecode(normalizedVin);

          // Batch updates for better performance
          form.setValue('make', response.make, { shouldValidate: true });
          form.setValue('model', response.model, { shouldValidate: true });
          form.setValue('year', response.year, { shouldValidate: true });

          if (response.fuelType) {
            const normalizedFuelType = normalizeFuelType(response.fuelType);
            if (normalizedFuelType !== undefined) {
              form.setValue('fuelType', normalizedFuelType, {
                shouldValidate: true,
              });
              handleFuelTypeChange(normalizedFuelType);
            }
          }
        } catch {
          form.setError('vin', { message: 'Failed to decode VIN' });
        }
      });
    },
    [form, handleFuelTypeChange, validateVin]
  );

  return {
    form,
    fuelTypeNoticeDialog,
    handleClose,
    handleFuelTypeChange,
    handleSubmit,
    handleVinChange,
    isEditing,
    pending,
  };
}
