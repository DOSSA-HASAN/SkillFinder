import React, { useState } from 'react'
import { userAuth } from '../store/userAuth.store'
import { Eye, EyeClosed } from 'lucide-react'
import GoogleAuthButton from './GoogleAuthButton'

function Login() {

    const { login } = userAuth();

    const [formData, setFormData] = useState({
        credential: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData.credential, formData.password)
    }

    return (
        <main className='flex justify-between items-center flex-col flex-1'>
            <figure className='flex justify-center items-center'>
                <img src="/logo.jpeg" alt="" className='h-[50px]' />
                <h1 className='font-bold text-[50px]'>SkillFinder</h1>
            </figure>
            <p className='text-center mt-6 mb-6 text-gray-500'>Welcome back, login into your account to find skilled people near you</p>
            <form className='w-full flex flex-col justify-center items-center h-[200px]'>
                <input type="text" name="credential" value={formData.credential} onChange={(e) => handleInputChange(e)} placeholder='Enter email or number' className='w-[80%] border-1 border-gray-300 rounded-md p-[10px] focus:outline-none' />
                <div className='mt-[20px] mb-[20px] flex justify-between items-center w-[80%] border-1 border-gray-300 rounded-md p-[10px] focus:outline-none'>
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={(e) => handleInputChange(e)} placeholder='Enter Password' className='w-full focus:outline-none' />
                    {
                        showPassword ? <Eye color='gray' onClick={() => setShowPassword(!showPassword)} /> : <EyeClosed color='gray' onClick={() => setShowPassword(!showPassword)} />
                    }
                </div>
                <button onClick={handleSubmit} className='w-[80%] bg-[#4640DE] p-[15px] text-white font-bold hover:cursor-pointer'>Login</button>
            </form>
            <GoogleAuthButton />
        </main>
    )
}

export default Login
