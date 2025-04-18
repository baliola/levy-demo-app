"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  ReactElement,
} from "react";
import { useState } from "react";

interface PrimaryInputProps {
  label?: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  trailing?: ReactElement;
  isOptional?: boolean;
  error?: string;
  disabled?: boolean; // Added disabled property
}

export default function PrimaryInput({
  label,
  value,
  type,
  placeholder,
  onChange,
  className,
  trailing,
  isOptional,
  error,
  disabled, // Destructure the disabled property
}: PrimaryInputProps): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
          {isOptional && " (Opsional)"}
        </label>
      ) : null}
      <div className={label ? "mt-2 relative " : "relative"}>
        <input
          id={label ?? ""}
          name={label ?? ""}
          type={isVisible ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary1 sm:text-sm sm:leading-6 bg-gray-50 placeholder:text-xs disabled:bg-gray-100"
          disabled={disabled}
        />

        {trailing}

        {type === "password" ? (
          <div
            className="absolute top-2 right-2 hover:cursor-pointer"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            {isVisible ? (
              <EyeSlashIcon aria-hidden="true" className="h-5 w-5" />
            ) : (
              <EyeIcon aria-hidden="true" className="h-5 w-5" />
            )}
          </div>
        ) : null}
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
