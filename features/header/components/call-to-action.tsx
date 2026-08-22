"use client";

import Image from "next/image";
import Link from "next/link";

import { PhoneCall, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CONTACT_PHONE, CONTACT_PHONE_WITHOUT_FORMAT } from '@/constants/app';
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib/utils";

export const CallToAction = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <PhoneLink icon className="text-xl" />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full flex items-center justify-center gap-2 text-lg font-medium tracking-tight font-anek-latin"
        >
          <Smartphone className="size-5" />
          Call Us
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">
            Call Us
          </DialogTitle>

          <DialogDescription className="text-md text-muted-foreground">
            Scan the QR code below to call us.
          </DialogDescription>
        </DialogHeader>

        <Image
          src="/qr-code-carb-cert-phone.svg"
          alt="QR Code to Call Us"
          width={300}
          height={300}
          title="QR Code to Call Us"
          priority
          className="mx-auto"
          style={{ width: '300px', height: '300px' }}
        />

        <hr className="border-t border-dashed border-muted-foreground/20" />

        <p className="flex items-center justify-center gap-2 text-md text-muted-foreground">
          or call us at
          <PhoneLink className="text-xl" />
        </p>
      </DialogContent>
    </Dialog>
  );
};

interface PhoneLinkProps {
  className?: string;
  icon?: boolean;
}

const PhoneLink = ({ className, icon }: PhoneLinkProps) => (
  <Link
    href={`tel:${CONTACT_PHONE_WITHOUT_FORMAT}`}
    className={cn(
      "font-semibold text-green-500 hover:text-green-600 font-anek-latin tracking-tight transition-colors",
      icon && "flex items-center gap-2",
      className
    )}
  >
    {icon ? <PhoneCall className="size-5" /> : null}
    {CONTACT_PHONE}
  </Link>
);