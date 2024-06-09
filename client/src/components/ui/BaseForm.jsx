import React from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";

function BaseForm({ inputs, onSubmit, footer }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-white py-10 px-32  rounded shadow-md"
    >
      {inputs.map((input) => (
        <Input
          key={input.label}
          label={input.label}
          defaultValue={input.defaultValue}
          type={input.type}
          register={{ ...register(input.id) }}
        />
      ))}

      {footer}
    </form>
  );
}

export default BaseForm;
