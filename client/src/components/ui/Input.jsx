import React from "react";

function Input({ label, register, type, defaultValue, className }) {
  return (
    <label className={`block mb-5 ${className}`}>
      <p className="font-semibold mb-2">{label}</p>
      <input
        {...register}
        className="p-2 w-full rounded border border-primary-100"
        type={type}
        defaultValue={defaultValue}
      />
    </label>
  );
}

export default Input;
