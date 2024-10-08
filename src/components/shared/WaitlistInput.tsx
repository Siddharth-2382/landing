import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestEarlyAccess } from "@/lib/cta";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePostHog } from "posthog-js/react";

const WaitlistInput = ({
  buttonText,
  role,
}: {
  buttonText: string;
  role: string;
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const posthog = usePostHog();

  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const storedEmail = localStorage.getItem("waitlistEmail");
    const joinedWaitlist = localStorage.getItem("joinedWaitlist");
    if (storedEmail && joinedWaitlist === "true" && role == userRole) {
      setEmail(storedEmail);
      setIsSuccess(true);
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    posthog.identify(email, { role });
    posthog.capture("request_early_access", {
      from: "waitlist_input",
    });
    const success = await requestEarlyAccess(email, role, setIsError);
    setIsLoading(false);
    if (success) {
      setIsSuccess(true);
      localStorage.setItem("waitlistEmail", email);
      localStorage.setItem("joinedWaitlist", "true");
    }
  };

  return (
    <div className="relative z-20 max-w-[390px]">
      <div className="w-full bg-background flex border rounded-xl p-2">
        <Input
          type="email"
          placeholder="example@gmail.com"
          className="border-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || isSuccess}
        />
        <Button
          onClick={handleSubmit}
          size="lg"
          className="p-3 text-base font-normal"
          disabled={isLoading || isSuccess}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSuccess ? "Joined!" : isLoading ? "Joining" : buttonText}
        </Button>
      </div>
      <p
        className={cn(
          "text-sm text-center mt-1",
          isError || isSuccess ? "block" : "invisible",
          isError ? "text-red-700" : "text-emerald-700"
        )}
      >
        {isSuccess
          ? "You've been added to the waitlist"
          : "Please enter a valid email address!"}
      </p>
    </div>
  );
};

export default WaitlistInput;
