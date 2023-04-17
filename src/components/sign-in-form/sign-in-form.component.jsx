import { useState } from "react";
import './sign-in-form.styles.scss'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };


  const handleSubmits = async (event) => {
    event.preventDefault();



    try {
      await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {

      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrent password!")
          break;
        case "auth/user-not-found":
          alert("No user assiociated with this email!")
          break;
        default:
          console.log(error);
          break;
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmits}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <div className="buttons-container">
          <Button label="Sign In" type="submit" />
          <Button buttonType='google' label="Google Sign In" type="button" onClick={signInWithGoogle} />
        </div>
      </form>
    </div>
  )
}

export default SignInForm;