"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

function RegisterPage() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const router = useRouter();
  
  const onSubmit = handleSubmit(async(data) => {
    //console.log(data);
    if (data.password !== data.confirmPassword) {
      return alert('Password and Confirm Password must be the same');
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: data.username,
          email: data.email,
          password: data.password
        }
      ),
    });

    if (res.ok) {
      router.push('/auth/login');
    }
    //console.log(errors);
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">

      <form onSubmit={onSubmit} className='w-1/4'>
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">Username:</label>
        <input type="text" placeholder="your username"
          {...(register("username", { required: {
            value: true,
            message: "Username is required"
          } }))}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
          { errors.username && (<span className="text-red-500 text-xs">{errors.username.message} </span>)}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Email:</label>
        <input type="email" placeholder="user@email.com"
          {...(register("email", { required: {
            value: true,
            message: "Email is required"
          } }))}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
          { errors.email && (<span className="text-red-500 text-xs">{errors.email.message} </span>)}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Password:</label>
        <input type="password" placeholder="************************"
          {...(register("password", { required: {
            value: true,
            message: "Password is required"
          } }))}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
          { errors.password && (<span className="text-red-500 text-xs">{errors.password.message} </span>)}

        <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">Confirm Passeord: </label>
        <input type="password" placeholder="************************"
          {...(register("confirmPassword", { required: {
            value: true,
            message: "Confirm Passeord is required"
          } }))}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
          { errors.confirmPassword && (<span className="text-red-500 text-xs">{errors.confirmPassword.message} </span>)}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;