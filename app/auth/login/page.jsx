"use client";
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function LoginPage() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  
  const onSubmit = handleSubmit(async (data) => {
    //console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });
    
    if (res.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">

      <form onSubmit={onSubmit} className='w-1/4'>
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        { error && (<span className="bg-red-500 text-sm text-white p-3 rounded">{error} </span>)}
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

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;