'use client';

import { useCallback, useState } from 'react';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';

import { Pencil, Plus, Trash2 } from 'lucide-react';

import { FormDialogVehicle } from './form-dialog-vehicle';

import type { FormSchema, VehicleSchema } from '@/features/compliance-form/schemas';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { type Country } from '@/features/compliance-form/constants';
import { getDuplicateVinError } from '@/features/compliance-form/utils/vin';

interface FormStepTwoProps {
  form: UseFormReturn<FormSchema>;
}

// eslint-disable-next-line max-lines-per-function
const FormStepTwo = ({ form }: FormStepTwoProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'vehicles',
  });
  const vehiclesError = form.formState.errors.vehicles;
  const physicalAddress = form.watch('physicalAddress');
  const physicalCity = form.watch('physicalCity');
  const physicalState = form.watch('physicalState') as string;
  const physicalZipCode = form.watch('physicalZipCode');
  const physicalCountry = form.watch('physicalCountry') as Country;

  const handleAddVehicle = () => {
    setEditingIndex(null);
    setDialogOpen(true);
  };
  const handleEditVehicle = (index: number) => {
    setEditingIndex(index);
    setDialogOpen(true);
  };
  const handleSaveVehicle = (vehicle: VehicleSchema) => {
    if (editingIndex === null) {
      append(vehicle);
    } else {
      update(editingIndex, vehicle);
    }
    setEditingIndex(null);
  };
  const handleDeleteVehicle = (index: number) => {
    remove(index);
  };
  const editingVehicle = editingIndex === null ? null : fields[editingIndex];
  const validateVin = useCallback(
    (vin: string, id?: string) => getDuplicateVinError(fields, vin, id),
    [fields]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Vehicles</h3>
          <p className="text-sm text-muted-foreground">
            Add at least one vehicle to continue. You can add multiple vehicles.
          </p>
        </div>
        <Button type="button" onClick={handleAddVehicle} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {vehiclesError && 'message' in vehiclesError ? <p className="text-sm text-destructive">{vehiclesError.message}</p> : null}

      {fields.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">No vehicles added yet</p>
            <Button type="button" onClick={handleAddVehicle}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Vehicle
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((vehicle, index) => (
            <Card key={vehicle.id} className='border-dashed border-blue-400 bg-blue-400/10 text-blue-600 shadow-none'>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </CardTitle>
                    <CardDescription className="font-mono">
                      VIN: {vehicle.vin}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditVehicle(index)}
                          className='text-emerald-600 hover:text-emerald-600/90 border-emerald-500/20 border bg-emerald-600/10 hover:bg-emerald-600/20'
                          title="Edit vehicle"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit vehicle</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        arrowClassName='fill-emerald-600 bg-emerald-600 text-background'
                        className='bg-emerald-600 text-background'
                      >Edit vehicle</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className='text-destructive hover:text-destructive/90 border-destructive/20 border bg-destructive/10 hover:bg-destructive/20'
                          onClick={() => handleDeleteVehicle(index)}
                          title="Delete vehicle"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete vehicle</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent arrowClassName='fill-destructive bg-destructive text-destructive-foreground' className='bg-destructive text-destructive-foreground'>Delete vehicle</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">License Plate:</span>{' '}
                    {vehicle.licensePlate}
                  </div>
                  <div>
                    <span className="font-medium">Fuel Type:</span>{' '}
                    {vehicle.fuelType}
                  </div>
                  <div>
                    <span className="font-medium">Ownership:</span>{' '}
                    {vehicle.ownershipType}
                  </div>
                  <div>
                    <span className="font-medium">State:</span>{' '}
                    {vehicle.registeredState}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <FormDialogVehicle
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveVehicle}
        editingVehicle={editingVehicle}
        validateVin={validateVin}
        physicalAddress={physicalAddress}
        physicalCity={physicalCity}
        physicalState={physicalState}
        physicalZipCode={physicalZipCode}
        physicalCountry={physicalCountry}
      />
    </div>
  );
};

FormStepTwo.displayName = 'FormStepTwo';

export { FormStepTwo };
