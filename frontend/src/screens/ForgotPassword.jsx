import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'


const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/login')
        }
    }, [navigate, userInfo]);

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async data => {
        try {
            const res = await login({ email: data.email, password: data.password }).unwrap();
            dispatch(setCredentials({ ...res }))
            navigate('/resgister')
        } catch (error) {
            console.log(error?.data?.message)
            setError("root", { message: "Email errado" })
        }
    }

    // ---------------------------------Variavel ShowPassword--------------


    return (
        <div className='flex flex-row h-screen bg-gradient-to-tr to-purple-500 from-purple-900 '>
            <div className='m-auto flex flex-row h-[470px] shadow-lg'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-3 px-10 w-[380px] bg-white rounded-l-md justify-between items-center'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='text-center pt-6'>Recuperar Password</div>

                        <div>
                            <input
                                {...register("email", {
                                    required: "Email é obrigatório",
                                    validate: (value) => {
                                        if (!value.includes('@')) {
                                            return "Email inválido";
                                        }
                                        return true;
                                    }
                                })}
                                type='text' placeholder='Email'
                                className='border border-gray-300 rounded w-full h-8 pl-1' />
                            {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                        </div>


                    </div>

                    {isLoading && <div>Loading...</div>}

                    <div className='w-full'>
                        {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
                        <button type='submit' className={`${isSubmitting ? 'bg-gray-600' : 'bg-black cursor-pointer'} text-white p-1 rounded-md mt-4 w-full mb-1`}>Repor Password</button>
                        <div className='mb-4 text-center'><Link className="text-blue-600 " to="/">Voltar Atrás</Link></div>
                    </div>
                </form>
                <div className='bg-black w-96 rounded-r-md bg-[url("/images/geometric1.jpg")] bg-cover'>
                    {/* <div className='text-white p-3 mt-28 text-center text-5xl'> Bem Vindo </div> */}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword