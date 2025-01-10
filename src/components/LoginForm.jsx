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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

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
    } catch (err) {
      setError("login failed");
    }
  }

  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  return (
    <>
      <div>
        <button onClick={handleBack}>Back</button>
      </div>
      <h2>Login </h2>
      <div>
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
    </>
  );
}

export default LoginForm;
