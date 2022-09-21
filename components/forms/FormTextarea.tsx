import * as React from "react";

export type FormTextAreaProps = Omit<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  "onInput" | "value" | "name"
> &
  Required<
    Pick<
      React.InputHTMLAttributes<HTMLTextAreaElement>,
      "onInput" | "value" | "name"
    >
  > & { label: string };

export const FormTextArea: React.FC<FormTextAreaProps> = ({
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
        <textarea
          value={value}
          onInput={onInput}
          className="w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          id={name}
          name={name}
          pattern="[a-zA-Z]"
          {...props}
        />
      </div>
    </div>
  );
};
