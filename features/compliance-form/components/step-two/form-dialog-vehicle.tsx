'use client';

import { VehicleDialogFormBody } from './vehicle-dialog-form-body';

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
import { Form } from '@/components/ui/form';
import { type Country } from '@/features/compliance-form/constants';
import {
  useVehicleForm,
  useVehicleLocationAddress,
} from '@/features/compliance-form/hooks';
import { useStateFieldConfig } from '@/features/compliance-form/hooks/use-state-field-config';

const FORM_ID = 'vehicle-form';

interface FormDialogVehicleProps {
  editingVehicle?: VehicleSchema | null;
  onOpenChange: (open: boolean) => void;
  onSave: (vehicle: VehicleSchema) => void;
  open: boolean;
  physicalAddress?: string;
  physicalCity?: string;
  physicalCountry?: Country | undefined;
  physicalState?: string;
  physicalZipCode?: string;
  validateVin?: (vin: string, id?: string) => string | null;
}

const FormDialogVehicle = ({
  editingVehicle,
  onOpenChange,
  onSave,
  open,
  physicalAddress,
  physicalCity,
  physicalState,
  physicalZipCode,
  physicalCountry,
  validateVin,
}: FormDialogVehicleProps) => {
  const {
    form,
    fuelTypeNoticeDialog,
    handleFuelTypeChange,
    handleClose,
    handleSubmit,
    handleVinChange,
    isEditing,
    pending,
  } = useVehicleForm({
    editingVehicle,
    onClose: () => onOpenChange(false),
    onSave,
    open,
    validateVin,
  });

  const isPending = Boolean(pending);

  const {
    handleCountryChange: handleRegisteredCountryChange,
    label: registeredStateLabel,
    options: registeredStateOptions,
    selectPlaceholder: registeredStateSelectPlaceholder,
  } = useStateFieldConfig(form, 'registeredCountry', 'registeredState');

  const { handleLocationAddressChange, showNewAddressFields } =
    useVehicleLocationAddress(form, {
      physicalAddress,
      physicalCity,
      physicalCountry,
      physicalState,
      physicalZipCode,
    });

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && handleClose()}>
      <DialogContent className="w-full sm:min-w-6xl sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isEditing ? 'Edit Vehicle' : 'Add Vehicle'}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {isEditing
              ? 'Update the vehicle information below.'
              : 'Enter the vehicle information below. All fields marked with * are required.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={FORM_ID} onSubmit={handleSubmit}>
            <VehicleDialogFormBody
              form={form}
              isPending={isPending}
              onFuelTypeChange={handleFuelTypeChange}
              onLocationAddressChange={handleLocationAddressChange}
              onRegisteredCountryChange={handleRegisteredCountryChange}
              onVinChange={handleVinChange}
              registeredStateLabel={registeredStateLabel}
              registeredStateOptions={registeredStateOptions}
              registeredStateSelectPlaceholder={registeredStateSelectPlaceholder}
              showNewAddressFields={showNewAddressFields}
            />
          </form>
        </Form>

        {fuelTypeNoticeDialog}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID}>
            {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

FormDialogVehicle.displayName = 'FormDialogVehicle';

export { FormDialogVehicle };
