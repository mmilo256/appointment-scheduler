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
    <form onSubmit={handleSubmit(onSubmitHandler)} className=" py-10 px-64">
      <div className="grid grid-cols-2 gap-x-10 mb-10">
        {inputs.map((input) => (
          <Input
            className={input.styles}
            key={input.label}
            label={input.label}
            defaultValue={input.defaultValue}
            type={input.type}
            register={{ ...register(input.id) }}
          />
        ))}
      </div>

      {footer}
    </form>
  );
}

export default BaseForm;
