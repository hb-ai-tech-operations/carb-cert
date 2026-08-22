import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TESTER_CARD_BASE_PATH } from "@/features/testers";

export default function TesterNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Card not found</h1>
      <p className="max-w-md text-muted-foreground">
        This tester profile does not exist or the link may be outdated.
      </p>
      <Button asChild variant="default">
        <Link href={TESTER_CARD_BASE_PATH}>Back to tester directory</Link>
      </Button>
      <p className="text-xs text-muted-foreground">
        Profiles live at{" "}
        <span translate="no">
          {TESTER_CARD_BASE_PATH}/…
        </span>
      </p>
    </div>
  );
}
