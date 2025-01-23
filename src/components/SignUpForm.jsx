import { signUpUser } from "../utilities/users-services";
import { useState } from "react";
import { useNavigate } from "react-router";
import PopUpWindow from "./PopUpWindow";
import { Eye, EyeSlash } from "react-bootstrap-icons";

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const [confirmPasswordChecks, setConfirmPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password) => ({
    length: password.length >= 6,
    uppercase: /(?=.*[A-Z])/.test(password),
    number: /(?=.*\d)/.test(password),
    specialChar: /(?=.*[!@#$%^&*])/.test(password),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");

    if (name === "password") {
      setPasswordChecks(validatePassword(value));
    } else if (name === "confirmPassword") {
      setConfirmPasswordChecks(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const submitData = { ...formData };
      delete submitData.confirmPassword;
      const user = await signUpUser(submitData); // Call the signUpUser function from the users-services file
      props.setUser(user); // Set the user state to the user object
      setIsPopUpOpen(true); // Open the pop-up window
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          <button className="auth-back-arrow" onClick={handleBack}>
            ⬅︎
          </button>
          <h2>Sign Up</h2>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                minLength={6}
                required
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            {formData.password && (
              <ul className="password-checklist">
                <li className={passwordChecks.length ? "valid" : "invalid"}>
                  At least 6 characters
                </li>
                <li className={passwordChecks.uppercase ? "valid" : "invalid"}>
                  At least one uppercase letter
                </li>
                <li className={passwordChecks.number ? "valid" : "invalid"}>
                  At least one number
                </li>
                <li
                  className={passwordChecks.specialChar ? "valid" : "invalid"}
                >
                  At least one special character (!@#$%^&*)
                </li>
              </ul>
            )}
            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                minLength={6}
                required
              />
              <button
                type="button"
                aria-label="Toggle confirm password visibility"
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle-btn"
              >
                {showConfirmPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            {formData.confirmPassword && (
              <ul className="password-checklist">
                <li
                  className={confirmPasswordChecks.length ? "valid" : "invalid"}
                >
                  At least 6 characters
                </li>
                <li
                  className={
                    confirmPasswordChecks.uppercase ? "valid" : "invalid"
                  }
                >
                  At least one uppercase letter
                </li>
                <li
                  className={confirmPasswordChecks.number ? "valid" : "invalid"}
                >
                  At least one number
                </li>
                <li
                  className={
                    confirmPasswordChecks.specialChar ? "valid" : "invalid"
                  }
                >
                  At least one special character (!@#$%^&*)
                </li>
              </ul>
            )}
            <br />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          {isPopUpOpen && (
            <PopUpWindow message="Sign up successful! You can now log in with your credentials." />
          )}
          <p>{error}</p>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
