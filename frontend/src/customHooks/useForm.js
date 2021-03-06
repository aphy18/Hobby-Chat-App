import { useState } from 'react';

export default function useForm(callback, initVal = {}) {
  const [values, setValues] = useState(initVal)

  const handleChange = e => {
    const { name, value } = e.target

    // console.log('name -->', name);
    // console.log('value -->', value);
    

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