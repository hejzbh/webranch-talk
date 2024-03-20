import React from "react";
// Next
import dynamic from "next/dynamic";
// Lib
import { cn } from "@/lib/utils";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));

// Props
interface DeclineOrSubmitProps {
  onSubmit: () => void;
  onDecline: () => void;
  submitTitle?: string;
  className?: string;
}

const DeclineOrSubmit = ({
  onSubmit = () => {},
  onDecline = () => {},
  submitTitle = "Submit",
  className = "",
}: DeclineOrSubmitProps) => {
  return (
    <div className={cn("float-right flex items-center space-x-3", className)}>
      {/** Decline */}
      <Button
        onClick={onDecline}
        title="Decline"
        className="bg-danger border-danger hover:text-danger"
      />
      {/** Submit */}
      <Button onClick={onSubmit} title={submitTitle} />
    </div>
  );
};

export default DeclineOrSubmit;
