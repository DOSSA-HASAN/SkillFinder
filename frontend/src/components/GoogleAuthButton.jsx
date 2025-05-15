import React from 'react'
import { Link } from 'react-router-dom';

function GoogleAuthButton() {

    const googleLogin = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
    };

    const location = window.location.pathname

    return (
        <section className='w-[80%] flex flex-col jusitfy-center items-center pt-5 pb-10'>
            <div className='w-full h-[50px] flex justify-center p-[10px] items-center bg-[#3C7EE9] hover:cursor-pointer'>
                <img src="/google.png" alt="" srcset="" className='h-full rounded-md bg-white p-[5px] mr-[20px]' />
                <button onClick={googleLogin} className='font-bold text-white'>{location === "/login" ? "Login with google" : "Signup with google"}</button>
            </div>
            <figure className='w-full flex justify-center items-center mt-6'>
                <div className='w-[35%] h-[1px] bg-gray-400'></div>
                <p className='pl-[10px] pr-[10px] text-gray-500'>or</p>
                <div className='w-[35%] h-[1px] bg-gray-400'></div>
            </figure>
            {location === "/login" ? <p className='font-semibold mt-[20px] text-center'>Don't have an account, click <Link to={'/signup'} className='text-blue-500'>here </Link>to create one</p> : <p className='font-bold mt-[20px] text-center'>Already have an account, click <Link to={'/login'} className='text-blue-500'>here </Link>to login</p>}
        </section>
    )
}

export default GoogleAuthButton
