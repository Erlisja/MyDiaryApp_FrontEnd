import { useState } from "react";
import userServices from "../utilities/users-services";
import { useNavigate } from "react-router";
import { Eye, EyeSlash } from "react-bootstrap-icons"; // Import Bootstrap Icons

function LoginForm({ setUser }) {
  //  create a state to store the form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // set the error message to an empty string
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // create a function to handle the form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // update the form data state with the new value
    setError("");
  };

  // create a function to handle the form submission
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    const credentials = { ...formData };
    console.log(credentials);
    try {
      // call the login function from the userServices file
      const user = await userServices.login(credentials);
      console.log("the user is:", user);
      setUser(user); // set the user state to the user object
      navigate("/home");
    } catch (err) {
      setError("login failed");
    }
  }

  // create a function to handle the back button
  function handleBack() {
    navigate("/");
  }


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          <button className="auth-back-arrow" onClick={handleBack}>
            ⬅︎
          </button>
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
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button 
                type="button"
                id="togglePassword"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? <Eye/> : <EyeSlash />} {/* Icons */}
              </button>
            </div>

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
