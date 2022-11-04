import * as React from "react";

export type FormInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onInput" | "value" | "name"
> &
  Required<
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      "onInput" | "value" | "name"
    >
  > & { label: string };

export const FormInput: React.FC<FormInputProps> = ({
  label,
  onInput,
  value,
  name,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          value={value}
          type="text"
          onInput={onInput}
          className="block border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          id={name}
          name={name}
          pattern="[a-zA-Z]"
          {...props}
        />
      </div>
    </div>
  );
};
