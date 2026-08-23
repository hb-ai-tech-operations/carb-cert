export {
  toBillingFields,
  toContactFields,
  toVehicleFields,
} from './application-payload';
export {
  clearPersistedState,
  loadPersistedState,
  type PersistedState,
  savePersistedState,
} from './persistence';
export {
  getStepStatus,
  isStepComplete,
  type StepStatus,
} from './step-validation';
export {
  clampStep,
  getNextStep,
  getPreviousStep,
  isFirstStep,
  isLastStep,
  stepIndexByKey,
  stepKeyByIndex,
  steps,
} from './stepper';
export {
  getDuplicateVinError,
  INVALID_VIN_FORMAT_MESSAGE,
  isValidVinFormat,
  normalizeVin,
  VIN_FORMAT_REGEX,
  VIN_LENGTH,
} from './vin';
