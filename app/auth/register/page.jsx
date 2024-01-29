import {useForm} from 'react-hook-form';


function RegisterPage() {

    const {register, handleSubmit, errors} = useForm(); 

    return (
      <div>
        <h1>Register</h1>
        <form action="">
            <input type="text" placeholder="Username" {...(register("username", { required: true}))} />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Register</button>
        </form>
      </div>
    );
  }
  
  export default RegisterPage;