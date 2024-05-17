import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'



const Register = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues:{
      email:"",
      password: "",
    }
  });

  const onSubmit = async data => {
    try{

    }catch (error){
      setError("email", {message:"Este email já está a ser usado"})
    }
    console.log('data', data)
  }

  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-3'>

          <input
            {...register("email", {
              required: "Email é obrigatório",
              validate: (value) =>{ 
                if(!value.includes('@')){
                  return "Email invalido";
                }
                return true;
              }
            })}
            type='text' placeholder='Email'
            className='border border-black pl-1' />
          {errors.email && <div className='text-red-500'>{errors.email.message}</div>}

          <input
            {...register("password", {
              required: "Password é obrigatória",
              minLength: {
                value:8,
                message:"Password tem de conter 8 letras"
              },
            })}
            type='password'
            placeholder='Password'
            className='border border-black pl-1' />
          {errors.password && <div className='text-red-500'>{errors.password.message}</div>}


          <button type='submit' className={`${isSubmitting ? 'bg-gray-600' : 'bg-blue-600 cursor-pointer'} text-white p-1 rounded-md`}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register