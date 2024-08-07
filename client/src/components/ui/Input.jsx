import React, { useState } from "react";

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
  optional,
  onChange,
  value,
  disabled
}) {
  const [isPassInputVisible, setIsPassInputVisible] = useState(false)

  const togglePassInputVisibility = () => {
    setIsPassInputVisible(!isPassInputVisible)
  }

  const renderInputField = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            {...register}
            className={`px-2 py-1 w-full rounded border border-primary-100 resize-none ${important && "bg-yellow-100"
              }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        );
      case "select":
        return (
          <select
            {...register}
            className={`px-2 py-1 w-full rounded border border-primary-100 ${important && "bg-yellow-100"
              }`}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="">Seleccionar</option>
            {options?.map((option, index) => (
              <option
                className={option.disabled ? "bg-gray-300" : ""}
                key={index}
                value={option.disabled ? "" : option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      case "password":
        return (
          <input
            {...register}
            className={`px-2 py-1 w-full rounded border border-primary-100 ${important && "bg-yellow-100"
              }`}
            type={isPassInputVisible ? "text" : "password"
            }
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            maxLength={max}
            max={max}
            defaultValue={defaultValue}
          />
        );
      default:
        return (
          <input
            {...register}
            className={`px-2 py-1 w-full rounded border border-primary-100 ${important && "bg-yellow-100"
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
    <label className={`block relative mb-2 ${className}`}>
      <span className="inline-block font-semibold mb-0.5">{label}</span>{" "}
      <span className="text-gray-600">{optional && "(opcional)"}</span>
      {renderInputField()}
      {type === "password" && <button type="button" onClick={togglePassInputVisibility} className="absolute right-2 top-8 text-slate-600">{isPassInputVisible ? "Ocultar" : "Mostrar"}</button>}
    </label>
  );
}

export default Input;
