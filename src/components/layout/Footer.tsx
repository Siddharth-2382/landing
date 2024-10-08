// import { Button } from "@/components/ui/button";
// import { Link, Phone } from "lucide-react";
// import XTwitterIcon from "@/components/shared/XTwitterIcon";

import { scheduleCall } from "@/lib/cta";
import { usePostHog } from "posthog-js/react";

const Footer = () => {
  const posthog = usePostHog();
  return (
    <div className="mt-24 flex flex-col md:flex-row justify-between pb-5 md:pb-10 xl:pb-20 md:mx-52">
      <div>
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="Exponential" className="size-10" />
          <p className="text-2xl font-medium text-balance">Exponential</p>
        </div>
        <p className="text-lg text-muted-foreground text-balance mt-4">
          Algorithmic Trading Marketplace
        </p>
        {/* <div className="flex gap-4 mt-8">
          <Button variant="secondary" className="rounded-full size-12">
            <Link className="text-primary size-4" />
          </Button>
          <Button variant="secondary" className="rounded-full size-12">
            <XTwitterIcon className="text-primary size-4" />
          </Button>
          <Button variant="secondary" className="rounded-full size-12">
            <Phone className="text-primary size-4" />
          </Button>
        </div> */}
      </div>
      <div className="flex flex-col gap-4 mt-16 md:mt-0">
        <p className="text-2xl">Contact Us</p>
        <div className="flex flex-col gap-3 text-muted-foreground">
          <p>
            <a
              onClick={() => {
                posthog.capture("send_email", {
                  from: "footer",
                });
              }}
              href="mailto:contact@exponential.markets"
            >
              Email
            </a>
          </p>
          <p>
            <a
              onClick={() => {
                posthog.capture("schedule_call", {
                  from: "footer",
                });
                scheduleCall();
              }}
              className="cursor-pointer"
            >
              Schedule a Call
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
