import React from "react";
// Next
import dynamic from "next/dynamic";
// LIB
import { cn } from "@/lib/utils";
import { UseFormRegister } from "react-hook-form";
// Components
const Label = dynamic(() => import("@/components/ui/Label"));

// Props
interface InputProps {
  className?: string;
  type?: "text" | "password" | "email";
  name: string;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<any>;
  disabled?: boolean;
  error?: string;
}

const Input = ({
  className = "",
  type = "text",
  name,
  placeholder,
  disabled,
  label,
  register,
  error,
}: InputProps) => {
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
      {/** Input */}
      <input
        disabled={disabled}
        {...register(name)}
        className="w-full mt-1 bg-inputBG p-2 rounded-lg text-zinc-200"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
