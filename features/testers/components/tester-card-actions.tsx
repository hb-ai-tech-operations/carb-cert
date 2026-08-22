"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfDay } from "date-fns";
import {
  CalendarDays,
  CalendarIcon,
  Download,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import type { TesterProfile } from "@/features/testers/data/testers";

import { sendTesterAppointmentRequest } from "@/actions/send-tester-appointment-request";
import {
  FormFieldController,
  InputAddressSearch,
  InputEmail,
  InputSelect,
  InputTel,
  InputText,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  secondaryActionClass,
  testerCardIconStroke,
} from "@/features/testers/components/tester-card-primitives";
import { downloadVCard } from "@/features/testers/lib/download-vcard";
import { cn } from "@/lib/utils";

const bookingFormSchema = z.object({
  address: z.string().trim().min(3, "Please enter your address."),
  appointmentDateTime: z.date({
    error: "Please select a date and time.",
  }),
  email: z.string().trim().email("Please enter a valid email."),
  fullName: z.string().trim().min(2, "Please enter your full name."),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number."),
  testType: z.enum(["obd", "ovi"]).optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const HOURS = Array.from({ length: 12 }, (_, index) => index + 1).reverse();
const MINUTES = Array.from({ length: 12 }, (_, index) => index * 5);
const PERIODS = ["AM", "PM"] as const;

const testTypeOptions = [
  { label: "OBD", value: "obd" },
  { label: "OVI", value: "ovi" },
] as const;


const DateTimePicker = ({
  onChange,
  value,
}: {
  onChange: (date: Date) => void;
  value: Date | undefined;
}) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }
    if (value !== undefined) {
      date.setHours(value.getHours(), value.getMinutes());
    }
    onChange(date);
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    timeValue: string,
  ) => {
    const current = value ?? new Date();
    const updated = new Date(current);

    if (type === "hour") {
      const hour = parseInt(timeValue, 10);
      updated.setHours(updated.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      updated.setMinutes(parseInt(timeValue, 10));
    } else {
      const hours = updated.getHours();
      if (timeValue === "AM" && hours >= 12) {
        updated.setHours(hours - 12);
      } else if (timeValue === "PM" && hours < 12) {
        updated.setHours(hours + 12);
      }
    }

    onChange(updated);
  };

  return (
    <div className="sm:flex">
      <Calendar
        mode="single"
        selected={value}
        onSelect={handleDateSelect}
        disabled={(date) => date < startOfDay(new Date())}
      />

      <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex gap-1 p-2 sm:flex-col">
            {HOURS.map((hour) => (
              <Button
                key={hour}
                size="icon"
                variant={
                  value !== undefined &&
                    value.getHours() % 12 === hour % 12
                    ? "default"
                    : "ghost"
                }
                className="shrink-0 aspect-square sm:w-full"
                onClick={() => handleTimeChange("hour", hour.toString())}
              >
                {hour}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>

        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex gap-1 p-2 sm:flex-col">
            {MINUTES.map((minute) => (
              <Button
                key={minute}
                size="icon"
                variant={
                  value?.getMinutes() === minute ? "default" : "ghost"
                }
                className="shrink-0 aspect-square sm:w-full"
                onClick={() =>
                  handleTimeChange("minute", minute.toString())
                }
              >
                {minute.toString().padStart(2, "0")}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>

        <ScrollArea>
          <div className="flex gap-1 p-2 sm:flex-col">
            {PERIODS.map((ampm) => (
              <Button
                key={ampm}
                size="icon"
                variant={
                  value !== undefined &&
                    ((ampm === "AM" && value.getHours() < 12) ||
                      (ampm === "PM" && value.getHours() >= 12))
                    ? "default"
                    : "ghost"
                }
                className="shrink-0 aspect-square sm:w-full"
                onClick={() => handleTimeChange("ampm", ampm)}
              >
                {ampm}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const BookingDialogContent = (props: {
  onClose: () => void;
  testerEmail: string;
  testerName: string;
}) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      appointmentDateTime: undefined,
      testType: undefined,
      address: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: BookingFormValues) => {
    const dt = values.appointmentDateTime;
    const result = await sendTesterAppointmentRequest({
      address: values.address,
      appointmentDate: format(dt, "MM/dd/yyyy"),
      appointmentTime: format(dt, "hh:mm aa"),
      customerEmail: values.email,
      customerName: values.fullName,
      phoneNumber: values.phoneNumber,
      testerEmail: props.testerEmail,
      testerName: props.testerName,
      testType: values.testType,
    });

    if (!result.ok) {
      toast.error("Failed to send appointment request", { description: result.error });
      return;
    }

    const desc = `${values.fullName} – ${format(dt, "MMM d, yyyy")} at ${format(dt, "h:mm a")}`;
    toast.success("Appointment request submitted", {
      description: values.testType ? `${desc} – ${values.testType.toUpperCase()}` : desc,
    });
    form.reset();
    props.onClose();
  };

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Book an appointment</DialogTitle>
        <DialogDescription>
          Fill in your details and preferred date/time for testing.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4"
          noValidate
        >
          <InputText
            control={form.control}
            name="fullName"
            label="Full name"
            placeholder="Enter your full name"
            required
            maxLength={100}
          />

          <div className="grid gap-4 sm:grid-cols-2 items-baseline">
            <InputEmail
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              required
              maxLength={100}
            />
            <InputTel
              control={form.control}
              name="phoneNumber"
              label="Phone number"
              placeholder="Enter your phone number"
              required
              maxLength={15}
            />
          </div>

          <FormFieldController
            control={form.control}
            name="appointmentDateTime"
            label="Date & time"
            required
          >
            {(field) => {
              const selected = field.value as Date | undefined;
              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={field.id}
                      variant="outline"
                      aria-invalid={!!field.error}
                      className={cn(
                        "w-full justify-start text-left font-normal input-carb-cert",
                        selected === undefined && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon data-icon="inline-start" className="opacity-50" />
                      {selected === undefined
                        ? "Pick a date & time"
                        : format(selected, "MM/dd/yyyy hh:mm aa")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateTimePicker
                      onChange={(date) =>
                        form.setValue("appointmentDateTime", date, {
                          shouldValidate: true,
                        })
                      }
                      value={selected}
                    />
                  </PopoverContent>
                </Popover>
              );
            }}
          </FormFieldController>

          <InputSelect
            control={form.control}
            name="testType"
            label="Test type (optional)"
            placeholder="Select OBD or OVI"
            options={testTypeOptions}
          />

          <InputAddressSearch
            control={form.control}
            setValue={form.setValue}
            name="address"
            label="Address"
            placeholder="Search for an address..."
            required
            maxLength={100}
            valueMode="full"
          />

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit appointment"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export const TesterCardActions = ({ tester }: { tester: TesterProfile; }) => {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  return (
    <>
      <nav
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
        aria-label="Quick actions"
      >
        <a href={`tel:${tester.phoneTel}`} className={secondaryActionClass}>
          <Phone
            className="size-5 text-zinc-400"
            strokeWidth={testerCardIconStroke}
            aria-hidden
          />
          Call
        </a>
        <a href={`mailto:${tester.email}`} className={secondaryActionClass}>
          <Mail
            className="size-5 text-zinc-400"
            strokeWidth={testerCardIconStroke}
            aria-hidden
          />
          Email
        </a>
        <button
          type="button"
          className={secondaryActionClass}
          onClick={() => downloadVCard(tester)}
        >
          <Download
            className="size-5 text-zinc-400"
            strokeWidth={testerCardIconStroke}
            aria-hidden
          />
          Save contact
        </button>
      </nav>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            <CalendarDays
              className="size-5"
              strokeWidth={testerCardIconStroke}
              aria-hidden
            />
            Book an appointment
          </button>
        </DialogTrigger>

        <BookingDialogContent
          onClose={() => setIsBookingDialogOpen(false)}
          testerEmail={tester.email}
          testerName={tester.name}
        />
      </Dialog>
    </>
  );
};
