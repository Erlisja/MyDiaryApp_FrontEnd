import { signUpUser } from "../utilities/users-services";
import { useState } from "react";
import { useNavigate } from "react-router";
import PopUpWindow from "./PopUpWindow";

function SignUpForm(props) {
  //  create a state to store the form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // set the error message to an empty string
  
  const [isPopUpOpen, setIsPopUpOpen] = useState(false); // set the isPopUpOpen state to false to hide the pop up window


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // this line of code is used to update the state of the form data when the user types in the input field
    setError(""); // this line of code is used to clear the error message when the user types in the input field
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents the default reload of the page when the form is submitted
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const submitData = { ...formData };
      delete formData.confirmPassword; // deletes the confirmPassword key from the form data, so that it is not sent to the server
      console.log(submitData);
      const user = await signUpUser(submitData); // this line of code is used to call the signUpUser function from the users-api file
      props.setUser(user); // this line of code is used to set the user state to the user object returned by the signUpUser function
      // Show pop up window
      setIsPopUpOpen(true); // this line of code is used to set the isPopUpOpen state to true to show the pop up window
    } catch (error) {
      setError("An error occurred.- Please try again"); // this line of code is used to set the error message when an error occurs
    }
  };

  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  return (
    <>
      <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back-arrow"  onClick={handleBack}>⬅︎</button>
      <h2>Sign Up </h2>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            <br />
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <br />
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength={4}
              required
            />
            <br />
            <label for="password">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              minLength={4}
              required
            />
            <br />
            <br />
            <button type="submit">Sign Up</button>
            <br />
          </form>
           {/* Render Popup */}
      {isPopUpOpen && (
        <PopUpWindow
          message="Sign up successful! 
           You can now log in with your credentials." 
        /> // this line of code is used to render the PopUpWindow component when the isPopUpOpen state is true
      )}
          <p>{error}</p>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
