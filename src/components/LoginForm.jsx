import { useState } from "react"



function LoginForm() {

    //  create a state to store the form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error,setError] = useState('');   // set the error message to an empty string

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name] : e.target.value});
        setError('');
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            console.log(formData);
        }catch(error){
            setError('An error occurred. Please try again');
        }

    }


  return (
    <>
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
            <button type="submit"  >Log In</button>
        </form>
        <p>{error}</p>

      </div>
    </>
  )
}

export default LoginForm