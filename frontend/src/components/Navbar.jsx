import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { AlignLeft } from "lucide-react"
import { X } from "lucide-react"
import { userAuth } from "../store/userAuth.store"

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { authUser } = userAuth()

    return (
        <>
            <nav className='hidden lg:flex justify-between items-center p-[10px] shadow-md relative z-100'>
                <figure className='flex justify-between items-center '>
                    <Link to={'/'} className='flex justify-center items-center mr-[20px]'>
                        <img src="/logo.jpeg" alt="" />
                        <p className='font-bold text-[23px]'>SkillFinder</p>
                    </Link>
                    <Link to={'/'} className='text-gray-600 ml-[20px] font-semibold'>Home</Link>
                    <Link to={'/explore'} className='text-gray-600 ml-[20px] font-semibold' >Explore Skills</Link>
                </figure>
                {/* TODO: ONLY SHOW IF USER IS NOT LOGGED IN */}
                <main className={`flex w-[150px] items-center ${authUser ? "justify-end" : "justify-between"}`}>
                    {
                        authUser ?
                            <Link to={'/profile'}>
                                <img className='rounded-full border-1 border-gray-400 w-[40px] h-[40px]' src={authUser?.profilePic || "/no-avatar.png"} alt="" />
                            </Link>
                            :
                            <>
                                <Link to={'/login'} className='text-[#4640DE] font-semibold border-r-1 border-gray-200 p-[10px]'>Login</Link>
                                <Link to={'/signup'} className='bg-[#4640DE] p-[10px] font-semibold text-white'>Singup</Link>
                            </>
                    }
                </main>
            </nav>
            <nav className='lg:hidden flex flex-col justify-between items-center shadow-md rounded-b-md p-[10px] z-100 relative'>
                <main className='flex justify-between items-center w-full'>
                    <Link to={'/'} className='flex justify-center items-center mr-[20px]'>
                        <img src="/logo.jpeg" alt="" />
                        <p className='font-bold text-[23px]'>SkillFinder</p>
                    </Link>
                    <div className="border-1 border-gray-200 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                        {
                            isMenuOpen ?
                                <X onClick={() => setIsMenuOpen(!isMenuOpen)} />
                                :
                                <AlignLeft onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        }
                    </div>
                </main>
                <article className={`w-full flex flex-col justify-between items-center transition-all ease-in-out duration-300 ${isMenuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <Link to={'/'} className='text-gray-600 font-semibold mt-[5px] mb-[5px]'>Home</Link>
                    <Link to={'/explore'} className='text-gray-600 font-semibold mb-[5px]' >Explore Skills</Link>
                    {/* TODO: ONLY SHOW THESE IF USER IS NOT LOGGED */}
                    <Link to={'/login'} className='text-[#4640DE] font-semibold mb-[5px]'>Login</Link>
                    <Link to={'/signup'} className='bg-[#4640DE] p-[10px] font-semibold text-white mb-[5px]'>Singup</Link>
                </article>
            </nav>
        </>
    )
}

export default Navbar
