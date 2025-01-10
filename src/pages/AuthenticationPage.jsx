import { useState } from "react"
import { Link } from "react-router"
import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"


function AuthenticationPage(props) {

  const [isLogin, setIsLogin] = useState(true)

  function togglePage() {
    setIsLogin(!isLogin)
  }


  return (

    <>{isLogin ? (
      <>
        <LoginForm />
        <br />
        <h3>Don't have an account?</h3>
        <button onClick={togglePage}>Sign Up</button>
      </>
    ) : (
      <>
        <h2>Sign Up </h2>
        <SignUpForm />
        <br />
        <h3>Already have an account?</h3>
        <button onClick={togglePage}>Log In</button>
      </>
    )}
    </>
  )
    

}

export default AuthenticationPage