import React from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = React.useState(initialValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues({});
  }

  return { values, handleChange, resetForm, setValues };
}



