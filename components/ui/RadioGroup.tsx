import React from "react";
// Next
import dynamic from "next/dynamic";
// NPM
import { UseFormRegister } from "react-hook-form";
// Lib
import { cn } from "@/lib/utils";
import { channelIconsMap } from "@/constants/icons";
// Components
const Label = dynamic(() => import("@/components/ui/Label"));

// Props
interface RadioGroupProps {
  className?: string;
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  disabled?: boolean;
  choices: any[];
  error?: string;
}

const RadioGroup = ({
  className,
  name,
  label,
  register,
  disabled,
  error,
  choices,
}: RadioGroupProps) => {
  return (
    <div className={cn("", className)}>
      {/** Label? */}
      {label && (
        <div>
          <Label text={label} />
          {error && (
            <span className="text-rose-500 text-sm block mt-1">{error}</span>
          )}
        </div>
      )}

      {/** Radio inputs */}
      <ul className="space-y-3  mt-2">
        {choices?.map((choice, idx) => {
          const Icon = (channelIconsMap as any)[choice];

          return (
            <li key={idx} className="flex items-center space-x-3">
              <input
                type="radio"
                value={choice}
                disabled={disabled}
                className="text-zinc-200 w-5 h-5"
                {...register(name)}
              />
              <label htmlFor={name} className="flex items-center !text-md">
                <Icon size={18} className="mr-1" />
                {choice}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RadioGroup;
