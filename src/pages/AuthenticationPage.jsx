import { useState } from "react"
import { Link } from "react-router"
import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"


function AuthenticationPage(props) {

const [signup, setSignup] = useState(true)

  function togglePage() {
    setSignup(!signup)
  }


  return (

   <>
   <>
    {signup 
    ?
  <SignUpForm setUser={props.setUser} />
  :
  <LoginForm setUser={props.setUser} />
    }
  </>
      
        <h3>Already have an account?</h3>
        <button onClick={togglePage}>Log In</button>
      </>
    )}
   

    



export default AuthenticationPage