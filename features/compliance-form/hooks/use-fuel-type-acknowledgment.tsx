'use client';

import { useCallback, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import type { VehicleSchema } from '@/features/compliance-form/schemas';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VEHICLE_FUEL_TYPE_OPTIONS } from '@/features/compliance-form/constants';

const getFuelMessage = (
  fuelType: VehicleSchema['fuelType'] | undefined
): string | undefined => {
  if (fuelType === undefined) {
    return undefined;
  }

  const selectedFuelOption = VEHICLE_FUEL_TYPE_OPTIONS.find(
    option => option.value === fuelType
  );

  if (
    selectedFuelOption === undefined ||
    !('message' in selectedFuelOption) ||
    typeof selectedFuelOption.message !== 'string'
  ) {
    return undefined;
  }

  return selectedFuelOption.message;
};

const isVehicleFuelType = (value: string): value is VehicleSchema['fuelType'] =>
  VEHICLE_FUEL_TYPE_OPTIONS.some(option => option.value === value);

interface FuelTypeMessageDialogProps {
  message: string | null;
  onAcknowledge: () => void;
  open: boolean;
}

const FuelTypeMessageDialog = ({
  message,
  onAcknowledge,
  open,
}: FuelTypeMessageDialogProps) => (
  <Dialog open={open} onOpenChange={() => { }}>
    <DialogContent
      onEscapeKeyDown={event => event.preventDefault()}
      onInteractOutside={event => event.preventDefault()}
      onPointerDownOutside={event => event.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">Fuel Type Notice</DialogTitle>
        <DialogDescription className="text-lg text-muted-foreground">{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="button" variant="default" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-medium" onClick={onAcknowledge}>
          I Understand
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export function useFuelTypeAcknowledgment(form: UseFormReturn<VehicleSchema>) {
  const [fuelMessageOpen, setFuelMessageOpen] = useState(false);
  const [selectedFuelMessage, setSelectedFuelMessage] = useState<string | null>(
    null
  );

  const handleFuelTypeChange = useCallback((value: string) => {
    form.clearErrors('fuelType');

    if (!isVehicleFuelType(value)) {
      setSelectedFuelMessage(null);
      return;
    }

    const fuelMessage = getFuelMessage(value);
    setSelectedFuelMessage(fuelMessage ?? null);

    if (typeof fuelMessage === 'string' && fuelMessage.length > 0) {
      setFuelMessageOpen(true);
    }
  }, [form]);

  const handleFuelMessageAcknowledge = useCallback(() => {
    setFuelMessageOpen(false);
    setSelectedFuelMessage(null);
    form.resetField('fuelType', { keepDirty: false, keepTouched: false });
  }, [form]);

  const resetFuelNotice = useCallback(() => {
    setFuelMessageOpen(false);
    setSelectedFuelMessage(null);
  }, []);

  const fuelTypeNoticeDialog = (
    <FuelTypeMessageDialog
      message={selectedFuelMessage}
      open={fuelMessageOpen}
      onAcknowledge={handleFuelMessageAcknowledge}
    />
  );

  return { fuelTypeNoticeDialog, handleFuelTypeChange, resetFuelNotice };
}
