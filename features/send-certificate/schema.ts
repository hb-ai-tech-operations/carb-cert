import { z } from 'zod';

/** RFC-friendly upper bound for email length. */
export const SEND_CERTIFICATE_EMAIL_MAX_LEN = 254;
export const SEND_CERTIFICATE_NAME_MAX_LEN = 120;
export const SEND_CERTIFICATE_VIN_MAX_LEN = 17;
const SEND_CERTIFICATE_SIZE_MB = 10;
const SEND_CERTIFICATE_SIZE_BYTES = 1024;
export const SEND_CERTIFICATE_MAX_FILE_BYTES =
  SEND_CERTIFICATE_SIZE_MB *
  SEND_CERTIFICATE_SIZE_BYTES *
  SEND_CERTIFICATE_SIZE_BYTES;

const certificateFileSchema = z
  .custom<File>(value => value instanceof File, 'Certificate file is required')
  .refine(file => file.size > 0, 'Certificate file is required')
  .refine(
    file => file.size <= SEND_CERTIFICATE_MAX_FILE_BYTES,
    'Certificate must be 10MB or smaller'
  );

export const sendCertificateFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(SEND_CERTIFICATE_EMAIL_MAX_LEN),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(SEND_CERTIFICATE_NAME_MAX_LEN),
  vin: z
    .string()
    .trim()
    .min(1, 'VIN is required')
    .max(SEND_CERTIFICATE_VIN_MAX_LEN),
  certificate: certificateFileSchema,
});

export type SendCertificateFormValues = z.infer<
  typeof sendCertificateFormSchema
>;
