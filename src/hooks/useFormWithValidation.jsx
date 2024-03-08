import { useContext, useState, useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function useFormWithValidation() {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (evt) => {
    const input = evt.target;
    const { name, type, checked } = input;
    let { value } = input;
    let error = input.validationMessage;
    if (type === 'checkbox') {
      value = checked;
    }
    const isFormValid = input.closest('form').checkValidity();
    setIsValid(isFormValid);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const resetForm = useCallback(
    (
      newValues = { name: currentUser.name, email: currentUser.email },
      newErrors = {},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  };
}

export default useFormWithValidation;
