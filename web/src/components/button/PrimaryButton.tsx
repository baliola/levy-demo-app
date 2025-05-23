/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MouseEventHandler, ReactElement } from "react";

interface PrimaryButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  loading?: boolean;
  unSubmit?: boolean;
}

const PrimaryButton = ({
  label,
  onClick,
  onSubmit,
  className,
  loading,
  unSubmit,
}: PrimaryButtonProps): ReactElement => {
  if (unSubmit) {
    return (
      <div
        onClick={(e: any) => {
          if (onClick) {
            onClick(e);
          }
        }}
        className={
          className +
          " rounded-md bg-gray-900 w-full px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grabg-gray-900 flex flex-row items-center justify-center space-x-2 disabled:bg-gray-800 disabled:cursor-not-allowed hover:cursor-pointer"
        }
      >
        <p className="text-center">{label}</p>
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading}
      className={
        className +
        " rounded-md bg-gray-900 w-full px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grabg-gray-900 flex flex-row items-center justify-center space-x-2 disabled:bg-gray-800 disabled:cursor-not-allowed"
      }
    >
      <p>{label}</p>
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
};

export default PrimaryButton;
