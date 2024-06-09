import React from "react";

function Input({ label, register, type, defaultValue }) {
  return (
    <label className="block mb-10">
      <span className="font-semibold">{label}</span>
      <input
        {...register}
        className="border-b border-primary-500 p-2 w-full"
        type={type}
        defaultValue={defaultValue}
      />
    </label>
  );
}

export default Input;
