import React from "react";

interface RadioInputProps {
  label: string;
  value: string;
  img: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  value,
  checked,
  img,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        onChange={() => {
          onChange(value);
        }}
        checked={checked}
        value={value}
        name={label}
        type="radio"
        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
      />
      <label
        htmlFor={label}
        className="ml-3 block text-sm/6 font-medium text-gray-900"
      >
        <div className="flex flex-row items-center space-x-4">
          <img src={img} alt={label} className="h-10 w-10 object-scale-down" />
          <p>{label}</p>
        </div>
      </label>
    </div>
  );
};
export default RadioInput;
