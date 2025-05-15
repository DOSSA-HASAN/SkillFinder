import React, { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import GoogleAuthButton from './GoogleAuthButton'
function Signup() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        number: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <main className='flex justify-between items-center flex-col flex-1'>
            <figure className='flex justify-center items-center'>
                <img src="/logo.jpeg" alt="" className='h-[50px]' />
                <h1 className='font-bold text-[50px]'>SkillFinder</h1>
            </figure>
            <p className='text-center mt-6 mb-6 text-gray-500'>Welcome back, login into your account to find skilled people near you</p>
            <form className='w-full flex flex-col justify-center items-center '>
                <input type="text" name="username" value={formData.username} onChange={(e) => handleInputChange(e)} placeholder='Enter username' className='mt-[20px] w-[80%] border-1 border-gray-300 rounded-md p-[10px] focus:outline-none' />
                <input type="email" name="email" value={formData.email} onChange={(e) => handleInputChange(e)} placeholder='Enter email' className='mt-[20px] w-[80%] border-1 border-gray-300 rounded-md p-[10px] focus:outline-none' />
                <input type="number" max={10} min={10} name="number" value={formData.number} onChange={(e) => handleInputChange(e)} placeholder='Enter phone number' className='mt-[20px] w-[80%] border-1 border-gray-300 rounded-md p-[10px] focus:outline-none' />
                <div className='mt-[20px] mb-[20px] flex justify-between items-center w-[80%] border-1 border-gray-300 rounded-md p-[10px] focus:outline-none'>
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={(e) => handleInputChange(e)} placeholder='Enter Password' className='w-full focus:outline-none' />
                    {
                        showPassword ? <Eye color='gray' onClick={() => setShowPassword(!showPassword)} /> : <EyeClosed color='gray' onClick={() => setShowPassword(!showPassword)} />
                    }
                </div>
                <button className='w-[80%] bg-[#4640DE] p-[15px] text-white font-bold hover:cursor-pointer'>Signup</button>
            </form>
            <GoogleAuthButton />
        </main>
    )
}

export default Signup
