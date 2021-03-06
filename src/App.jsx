import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  title: "",
  filter: "",
};

export default function App() {
  const { handleSubmit, reset, watch, control, register, setFocus, formState } = useForm({ defaultValues });
  const onSubmit = data => console.log("submitted", data);
  const [inputPlaceholder, setInputPlaceholder] = useState("");

  const options = [
    {value: 10, label: "ten"},
    {value: 20, label: "twenty"},
  ]

  useEffect(()=>{
    // focus first requred field initially
    handleSubmit(onSubmit)();

    const subscription = watch((data, { name, type }) => {
      // an input value has changed and it has a name - submit form
      if (formState.isValid) {
        // no validation errors - submit
        handleSubmit(onSubmit)();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  function onSubmitSave(data) {
    // title is not requred for submit, but for Save
    if (!data.title?.trim()) {
      // title is missing - add placeholder text and set focus
      setInputPlaceholder("Enter text and click Save")
      setFocus("title");
      return;
    }
    setInputPlaceholder("");
    console.log("saved", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder={inputPlaceholder} />

      <MySelect name="filter" control={control} options={options} placeholder="Select a filter..." />

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