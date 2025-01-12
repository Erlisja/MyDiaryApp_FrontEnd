import { useState } from "react";
import userServices from "../utilities/users-services";
import { useNavigate } from "react-router";

function LoginForm({ setUser }) {
  //  create a state to store the form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // set the error message to an empty string
  const navigate = useNavigate();

  // create a function to handle the form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // create a function to handle the form submission
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    const credentials = { ...formData };
    console.log(credentials);
    try {
      // the promise returned by the login service method will resolve to the user object included in the payload of the JWT
      const user = await userServices.login(credentials);
      console.log(user);
      setUser(user);
      navigate("/home");
    } catch (err) {
      setError("login failed");
    }
  }

  // create a function to handle the back button
  function handleBack() {
    navigate("/");
  }

  return (
    <>
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back-arrow"  onClick={handleBack}>⬅︎</button>
      <h2>Login </h2>
    
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <br />
          <label>Password </label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <br />
          <br />
          <button type="submit">Log In</button>
        </form>
        <p>{error}</p>
      </div>
    </div>
    </>
  );
}

export default LoginForm;
