import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUsingEmailAndPassword,
} from "../../utils/firebase/firebase.util";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormFields); // init state vars
  const { email, password } = formField; // init values same as that of defaultFormFields

  const resetForm = () => {
    setFormField(defaultFormFields);
  };

  //! Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUsingEmailAndPassword(email, password);
      console.log(response);
      resetForm();
    } catch (error) {
      if (error.code === "auth/wrong-password") alert("Incorrect Password");
      else if (error.code === "auth/user-not-found")
        alert("User not found. Please Sign Up");
      else console.log(error);
    }
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  //! Change Handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign-in using email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign Up</Button>
          {/* by default buttons are of type submit */}
          <Button type='button' onClick={signInWithGoogle} buttonType='google'>
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
