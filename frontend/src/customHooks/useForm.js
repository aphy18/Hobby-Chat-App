import { useState } from 'react';

export default function useForm(callback, initValues={}) {
  const [values, setValues] = useState(initValues)

  const handleChange = e => {
    const { name, value } = e.target

    console.log('name -->', name);
    console.log('value -->', value);
    console.log('values obj -->', values);

    setValues({
      ...values,
      [name]:value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    callback()
  }


  return { values, setValues, handleChange, handleSubmit }
}