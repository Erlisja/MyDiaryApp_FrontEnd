import { useState } from "react";
import { Link } from "react-router";






function SignUpForm(props) {

    //  create a state to store the form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error,setError] = useState('');   // set the error message to an empty string

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name] : e.target.value});  // this line of code is used to update the state of the form data when the user types in the input field
        setError(''); // this line of code is used to clear the error message when the user types in the input field
    }


    const handleSubmit = (e) =>{
        e.preventDefault(); // prevents the default reload of the page when the form is submitted
        if(formData.password !== formData.confirmPassword){
            setError('Passwords do not match! '); // this line of code is used to set the error message when the passwords do not match
            window.setTimeout(() => {
                setError('');

            }
            , 5000);
            return;
        }
        console.log(formData); // this line of code is used to log the form data to the console
        try {
            const submitData = {...FormData};
            delete submitData.confirmPassword; // deletes the confirmPassword key from the form data, so that it is not sent to the server
            console.log(submitData);
            
         }catch (error){
            setError('An error occurred. Please try again'); // this line of code is used to set the error message when an error occurs
            window.setTimeout(() => {
                setError('');

            }
            , 5000);
         }



    }



  return (
    <div>
      <div>
        <form autoComplete="off" onSubmit= {handleSubmit}>
            <label for='username'>Username</label>
            <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            />
            <br />
            <label for='email'>Email</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
             />
            <br />
             <label for='password'>Password</label>
             <input
             type='password'
             name="password"
             value={formData.password}
             onChange={handleChange}
             placeholder="Enter your password"
             minLength={4}
             required
              />
                <br />
               <label for='password'>Confirm Password</label>
             <input
             type='password'
             name="confirmPassword"
             value={formData.confirmPassword}
             onChange={handleChange}
             placeholder="Confirm your password"
            minLength={4}
             required
              />
                <br />
                <br />
            <button type="submit" >Sign Up</button>
            <br />
        </form>
        <p>{error}</p>

      </div>
    </div>
  );
}

export default SignUpForm;
