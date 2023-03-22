import React from "react";

export function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues)
  const handleChange = (evt) => {
    const {value, name} = evt.target;
    setValues({...values, [name]: value })
  }
  return {values, handleChange, setValues};
}
//не до конфа разобралась, поэтому не стала пока использовать
