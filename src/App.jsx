import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  input: "",
  select: "",
};

export default function App() {
  const { handleSubmit, reset, watch, control, register, setFocus } = useForm({ defaultValues });
  const onSubmit = data => console.log("submitted", data);
  const [inputPlaceholder, setInputPlaceholder] = useState("");

  const options = [
    {value: 10, label: "ten"},
    {value: 20, label: "twenty"},
  ]

  useEffect(()=>{
    handleSubmit(onSubmit)();

    const subscription = watch((data, { name, type }) => {
      // an input value has changed and it has a name - submit form
      handleSubmit(onSubmit)();
    });
    return () => subscription.unsubscribe();
  }, []);

  function onSubmitSave(data) {
    if (!data.input?.trim()) {
      setInputPlaceholder("Enter text and click Save")
      setFocus("input");
      return;
    }
    setInputPlaceholder("");
    console.log("saved", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("input")} placeholder={inputPlaceholder} />

      <MySelect name="select" control={control} options={options} placeholder="Select a filter..." />

      <button type="button" onClick={() => reset({ defaultValues })}>Reset</button>
      <input type="submit" value="Save" onClick={handleSubmit(onSubmitSave)} />
    </form>
  );
}

function MySelect({name, control, options, ...props}) {
  // const controllerProps = {};
  // if (props.rules) {
  //   controllerProps.rules = props.rules;
  //   props.rules = undefined;
  // }
  return <Controller
        render={
          ({ field, value }) => <Select {...field} options={options} {...props} />
        }
        control={control}
        name={name}
        rules={{ required: true }}
      />
}