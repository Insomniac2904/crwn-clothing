import "./sign-up.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import {
  createAuthUsingEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormFields); // init state vars
  const { displayName, email, password, confirmPassword } = formField; // init values same as that of defaultFormFields
  const resetForm = () => {
    setFormField(defaultFormFields);
  };

  //! Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }
    try {
      const { user } = await createAuthUsingEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("User already exists!");
      else console.log(error);
    }
  };

  //! Change Handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign-up using email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
