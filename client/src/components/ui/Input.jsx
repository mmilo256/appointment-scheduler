import React from "react";

function Input({
  label,
  register,
  type,
  defaultValue,
  placeholder,
  className,
  important,
  options,
  max,
  onChange,
  value,
}) {
  const renderInputField = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            {...register}
            className={`px-2 py-1 w-full rounded border border-primary-100 resize-none ${
              important && "bg-yellow-100"
            }`}
            defaultValue={defaultValue}
            placeholder={placeholder}
          />
        );
      case "select":
        return (
          <select
            {...register}
            className={`px-2 py-1 w-full rounded border border-primary-100 ${
              important && "bg-yellow-100"
            }`}
            defaultValue={defaultValue}
          >
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            {...register}
            className={`px-2 py-1 w-full rounded border border-primary-100 ${
              important && "bg-yellow-100"
            }`}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            maxLength={max}
            max={max}
            defaultValue={defaultValue}
          />
        );
    }
  };

  return (
    <label className={`block mb-2 ${className}`}>
      <p className="font-semibold mb-0.5">{label}</p>
      {renderInputField()}
    </label>
  );
}

export default Input;
